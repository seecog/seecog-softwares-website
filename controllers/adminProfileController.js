const { SiteProfile, SocialLinks } = require('../models');

async function getBasicInfo(req, res) {
  let profile = await SiteProfile.findOne();
  if (!profile) {
    profile = await SiteProfile.create({ address: '', email: '', phone: '' });
  }
  res.render('admin/profile-basic', {
    layout: 'admin',
    profile,
    activeProfileBasic: true,
    flash: res.locals.flash,
  });
}

async function postBasicInfo(req, res) {
  const { address, email, phone } = req.body || {};
  try {
    let profile = await SiteProfile.findOne();
    if (!profile) {
      profile = await SiteProfile.create({ address: '', email: '', phone: '' });
    }
    await profile.update({
      address: (address || '').trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
    });
    req.flashMessage('success', 'Basic info updated.');
  } catch (err) {
    console.error(err);
    req.flashMessage('error', 'Failed to update.');
  }
  res.redirect('/admin/profile/basic');
}

async function getSocialMedia(req, res) {
  let social = await SocialLinks.findOne();
  if (!social) {
    social = await SocialLinks.create({ facebook_url: '', linkedin_url: '', whatsapp_url: '', twitter_url: '' });
  }
  res.render('admin/profile-social', {
    layout: 'admin',
    social,
    activeProfileSocial: true,
    flash: res.locals.flash,
  });
}

async function postSocialMedia(req, res) {
  const { facebook_url, linkedin_url, whatsapp_url, twitter_url } = req.body || {};
  try {
    let social = await SocialLinks.findOne();
    if (!social) {
      social = await SocialLinks.create({ facebook_url: '', linkedin_url: '', whatsapp_url: '', twitter_url: '' });
    }
    await social.update({
      facebook_url: (facebook_url || '').trim(),
      linkedin_url: (linkedin_url || '').trim(),
      whatsapp_url: (whatsapp_url || '').trim(),
      twitter_url: (twitter_url || '').trim(),
    });
    req.flashMessage('success', 'Social media links updated.');
  } catch (err) {
    console.error(err);
    req.flashMessage('error', 'Failed to update.');
  }
  res.redirect('/admin/profile/social');
}

module.exports = { getBasicInfo, postBasicInfo, getSocialMedia, postSocialMedia };
