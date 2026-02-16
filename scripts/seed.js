require('dotenv').config({ path: 'properties.env' });
const bcrypt = require('bcrypt');
const { sequelize, AdminUser, SiteProfile, SocialLinks } = require('../models');

async function runSeed() {
  await sequelize.authenticate();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@seecogsoftwares.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  let admin = await AdminUser.findOne({ where: { email: adminEmail } });
  if (!admin) {
    const hash = await bcrypt.hash(adminPassword, 10);
    admin = await AdminUser.create({
      name: 'Admin',
      email: adminEmail,
      password_hash: hash,
      is_active: 1,
    });
    console.log('Created admin user:', adminEmail);
  } else {
    console.log('Admin user already exists:', adminEmail);
  }

  let profile = await SiteProfile.findOne();
  if (!profile) {
    profile = await SiteProfile.create({
      address: 'Site No. 26, Prestige Cube Building, Laskar Hosur Rd, Adugodi, Koramangala, Bengaluru, Karnataka 560030',
      email: 'info@seecogsoftwares.com',
      phone: '+91 7625067691',
    });
    console.log('Created site profile.');
  }

  let social = await SocialLinks.findOne();
  if (!social) {
    social = await SocialLinks.create({
      facebook_url: 'https://www.facebook.com/profile.php?id=61585373592616',
      linkedin_url: 'https://www.linkedin.com/company/seecog-softwares-pvt-ltd/',
      whatsapp_url: 'https://wa.me/917625067691',
      twitter_url: 'https://twitter.com/seecogsoftwares',
    });
    console.log('Created social links.');
  }

  console.log('Seed complete.');
}

if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}

module.exports = { runSeed };
