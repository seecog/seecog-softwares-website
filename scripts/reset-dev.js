/**
 * Reset database for development only.
 * Drops all tables, re-runs migrations, then seeds.
 * NEVER use in production.
 */
require('dotenv').config({ path: 'properties.env' });

if (process.env.NODE_ENV === 'production') {
  console.error('reset:dev is not allowed in production.');
  process.exit(1);
}

const { sequelize } = require('../models');
const { runMigrations } = require('./migrate');

async function dropAllTables() {
  const [rows] = await sequelize.query(
    "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'"
  );
  const tables = (rows || []).map((r) => r.TABLE_NAME).filter(Boolean);
  if (tables.length === 0) return;

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const t of tables) {
    await sequelize.query(`DROP TABLE IF EXISTS \`${t}\``);
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}

async function run() {
  try {
    await sequelize.authenticate();
    console.log('[reset-dev] Dropping all tables...');
    await dropAllTables();
    console.log('[reset-dev] Running migrations...');
    await runMigrations();
    console.log('[reset-dev] Seeding...');
    const { runSeed } = require('./seed');
    await runSeed();
    console.log('[reset-dev] Done.');
    process.exit(0);
  } catch (err) {
    console.error('[reset-dev] Error:', err.message);
    process.exit(1);
  }
}

run();
