const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { CredentialsVault } = require('../models');
const { encrypt, decrypt } = require('../utils/credentialsCrypto');
const transporter = require('../config/emailConfig');

const RESET_TOKEN_EXPIRY_HOURS = 2;

async function getOrCreateVault() {
  let vault = await CredentialsVault.findOne();
  if (!vault) {
    return null;
  }
  return vault;
}

async function credentialsPage(req, res) {
  try {
    const vault = await getOrCreateVault();
    const unlocked = req.session.credentialsUnlocked === true;

    const flash = res.locals.flash || {};

    if (!vault) {
      return res.render('admin/credentials/setup', {
        layout: 'admin',
        flash,
        activeCredentials: true,
      });
    }

    if (!unlocked) {
      return res.render('admin/credentials/unlock', {
        layout: 'admin',
        flash,
        activeCredentials: true,
      });
    }

    let plainContent = '';
    try {
      plainContent = decrypt(vault.content_encrypted);
    } catch (decErr) {
      console.error('Credentials decrypt error:', decErr);
    }
    return res.render('admin/credentials/editor', {
      layout: 'admin',
      content: plainContent || '',
      flash,
      activeCredentials: true,
    });
  } catch (err) {
    console.error('Credentials error:', err);
    req.flashMessage('error', 'Failed to load credentials.');
    res.redirect('/admin/dashboard');
  }
}

async function postUnlock(req, res) {
  const { password } = req.body || {};
  if (!password) {
    req.flashMessage('error', 'Password is required.');
    return res.redirect('/admin/credentials');
  }
  try {
    const vault = await getOrCreateVault();
    if (!vault) {
      req.flashMessage('error', 'Credentials vault is not initialized.');
      return res.redirect('/admin/credentials');
    }
    const match = await bcrypt.compare(password, vault.password_hash);
    if (!match) {
      req.flashMessage('error', 'Invalid password.');
      return res.redirect('/admin/credentials');
    }
    req.session.credentialsUnlocked = true;
    return res.redirect('/admin/credentials');
  } catch (err) {
    console.error('Unlock error:', err);
    req.flashMessage('error', 'An error occurred.');
    res.redirect('/admin/credentials');
  }
}

async function postLock(req, res) {
  req.session.credentialsUnlocked = false;
  res.redirect('/admin/credentials');
}

async function postSave(req, res) {
  if (req.session.credentialsUnlocked !== true) {
    req.flashMessage('error', 'Please unlock the credentials first.');
    return res.redirect('/admin/credentials');
  }
  const { content } = req.body || {};
  try {
    const vault = await getOrCreateVault();
    if (!vault) {
      req.flashMessage('error', 'Credentials vault is not initialized.');
      return res.redirect('/admin/credentials');
    }
    const encrypted = encrypt(content || '');
    await vault.update({ content_encrypted: encrypted });
    req.flashMessage('success', 'Credentials saved successfully.');
    res.redirect('/admin/credentials');
  } catch (err) {
    console.error('Save credentials error:', err);
    req.flashMessage('error', 'Failed to save credentials.');
    res.redirect('/admin/credentials');
  }
}

async function postSetup(req, res) {
  const { password, reset_email } = req.body || {};
  if (!password || !reset_email) {
    req.flashMessage('error', 'Password and reset email are required.');
    return res.redirect('/admin/credentials');
  }
  try {
    const existing = await CredentialsVault.findOne();
    if (existing) {
      req.flashMessage('error', 'Credentials vault already exists. Use reset if you forgot the password.');
      return res.redirect('/admin/credentials');
    }
    const hash = await bcrypt.hash(password, 10);
    await CredentialsVault.create({
      password_hash: hash,
      content_encrypted: null,
      reset_email: reset_email.trim(),
    });
    req.session.credentialsUnlocked = true;
    req.flashMessage('success', 'Credentials vault created. You can now add your credentials.');
    res.redirect('/admin/credentials');
  } catch (err) {
    console.error('Setup error:', err);
    req.flashMessage('error', 'Failed to create credentials vault.');
    res.redirect('/admin/credentials');
  }
}

async function getRequestReset(req, res) {
  res.render('admin/credentials/request-reset', {
    layout: 'admin',
    flash: res.locals.flash,
    activeCredentials: true,
  });
}

async function postRequestReset(req, res) {
  try {
    const vault = await CredentialsVault.findOne();
    if (!vault) {
      req.flashMessage('error', 'Credentials vault is not initialized.');
      return res.redirect('/admin/credentials');
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + RESET_TOKEN_EXPIRY_HOURS);
    await vault.update({
      reset_token: token,
      reset_token_expires_at: expires,
    });

    const resetUrl = `${req.protocol}://${req.get('host')}/admin/credentials/reset?token=${token}`;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Seecog Admin" <${process.env.EMAIL_USER}>`,
        to: vault.reset_email,
        subject: 'Credentials Vault - Reset Password',
        html: `
          <p>You requested a password reset for your Credentials Vault.</p>
          <p><a href="${resetUrl}">Click here to reset your password</a></p>
          <p>This link expires in ${RESET_TOKEN_EXPIRY_HOURS} hours.</p>
          <p>If you did not request this, you can ignore this email.</p>
        `,
      });
      req.flashMessage('success', `Reset link sent to ${vault.reset_email}.`);
    } else {
      req.flashMessage('success', `Reset link (SMTP not configured - copy manually): ${resetUrl}`);
    }
  } catch (err) {
    console.error('Request reset error:', err);
    req.flashMessage('error', 'Failed to send reset email.');
  }
  res.redirect('/admin/credentials/reset/request');
}

async function getResetPassword(req, res) {
  const { token } = req.query;
  if (!token) {
    req.flashMessage('error', 'Invalid or missing reset token.');
    return res.redirect('/admin/credentials');
  }
  const vault = await CredentialsVault.findOne({
    where: { reset_token: token },
  });
  if (!vault || !vault.reset_token_expires_at || new Date() > vault.reset_token_expires_at) {
    req.flashMessage('error', 'Invalid or expired reset token.');
    return res.redirect('/admin/credentials');
  }
  res.render('admin/credentials/reset-password', {
    layout: 'admin',
    token,
    flash: res.locals.flash,
    activeCredentials: true,
  });
}

async function postResetPassword(req, res) {
  const { token, password } = req.body || {};
  if (!token || !password) {
    req.flashMessage('error', 'Token and new password are required.');
    return res.redirect('/admin/credentials');
  }
  try {
    const vault = await CredentialsVault.findOne({
      where: { reset_token: token },
    });
    if (!vault || !vault.reset_token_expires_at || new Date() > vault.reset_token_expires_at) {
      req.flashMessage('error', 'Invalid or expired reset token.');
      return res.redirect('/admin/credentials');
    }
    const hash = await bcrypt.hash(password, 10);
    await vault.update({
      password_hash: hash,
      reset_token: null,
      reset_token_expires_at: null,
    });
    req.session.credentialsUnlocked = false;
    req.flashMessage('success', 'Password reset successfully. Please sign in with your new password.');
    res.redirect('/admin/credentials');
  } catch (err) {
    console.error('Reset password error:', err);
    req.flashMessage('error', 'Failed to reset password.');
    res.redirect('/admin/credentials');
  }
}

module.exports = {
  credentialsPage,
  postUnlock,
  postLock,
  postSave,
  postSetup,
  getRequestReset,
  postRequestReset,
  getResetPassword,
  postResetPassword,
};
