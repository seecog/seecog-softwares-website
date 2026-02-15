/**
 * Seed the credentials vault with initial password and reset email.
 * Run once after migration: npm run seed-credentials
 *
 * Default password: pankaj9955158678##$$
 * Reset email: pankaj.7613@gmail.com
 *
 * Override with env: CREDENTIALS_SEED_PASSWORD, CREDENTIALS_RESET_EMAIL
 */
require('dotenv').config({ path: 'properties.env' });
const bcrypt = require('bcrypt');
const { sequelize, CredentialsVault } = require('../models');

const DEFAULT_PASSWORD = 'pankaj9955158678##$$';
const DEFAULT_RESET_EMAIL = 'pankaj.7613@gmail.com';

async function run() {
  try {
    await sequelize.authenticate();
    const password = process.env.CREDENTIALS_SEED_PASSWORD || DEFAULT_PASSWORD;
    const resetEmail = process.env.CREDENTIALS_RESET_EMAIL || DEFAULT_RESET_EMAIL;

    let vault = await CredentialsVault.findOne();
    if (vault) {
      console.log('Credentials vault already exists. Use "Forgot password" to reset.');
      process.exit(0);
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await CredentialsVault.create({
      password_hash: hash,
      content_encrypted: null,
      reset_email: resetEmail,
    });
    console.log('Credentials vault created successfully.');
    console.log('Reset email:', resetEmail);
    process.exit(0);
  } catch (err) {
    console.error('Seed credentials error:', err);
    process.exit(1);
  }
}

run();
