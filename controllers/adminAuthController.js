const bcrypt = require('bcrypt');
const { AdminUser } = require('../models');

async function getLogin(req, res) {
  if (req.session && req.session.adminUserId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', {
    layout: 'admin-login',
    error: res.locals.flash?.error,
  });
}

async function postLogin(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    req.flashMessage('error', 'Email and password are required.');
    return res.redirect('/admin/login');
  }
  try {
    const user = await AdminUser.findOne({ where: { email: email.trim().toLowerCase(), is_active: 1 } });
    if (!user) {
      req.flashMessage('error', 'Invalid email or password.');
      return res.redirect('/admin/login');
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      req.flashMessage('error', 'Invalid email or password.');
      return res.redirect('/admin/login');
    }
    req.session.adminUserId = user.id;
    req.session.adminEmail = user.email;
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        req.flashMessage('error', 'An error occurred. Please try again.');
        return res.redirect('/admin/login');
      }
      return res.redirect('/admin/dashboard');
    });
  } catch (err) {
    console.error('Login error:', err);
    req.flashMessage('error', 'An error occurred. Please try again.');
    return res.redirect('/admin/login');
  }
}

function postLogout(req, res) {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
}

module.exports = { getLogin, postLogin, postLogout };
