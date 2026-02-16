require('dotenv').config({ path: 'properties.env' });
const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, '../migrations');
const migrations = [
  '001_create_admin_users.sql',
  '002_create_site_profile.sql',
  '003_create_social_links.sql',
  '004_create_jobs.sql',
  '005_create_job_applications.sql',
  '006_create_partners.sql',
  '007_create_portfolio_projects.sql',
  '008_create_visits.sql',
  '009_create_credentials_vault.sql',
];

const LOCK_NAME = 'seecog_migration_lock';
const LOCK_TIMEOUT_SEC = 30;

const DESTRUCTIVE_PATTERNS = [
  /\bDROP\s+TABLE\b/i,
  /\bTRUNCATE\b/i,
  /\bDROP\s+DATABASE\b/i,
];

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] [Migrate] ${msg}`);
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function checkProductionSafety(sql) {
  for (const pat of DESTRUCTIVE_PATTERNS) {
    if (pat.test(sql)) {
      throw new Error(
        `Production safety: migration contains forbidden operation. ` +
        `Blocked pattern: ${pat.source}. Use additive migrations only (CREATE TABLE IF NOT EXISTS, ALTER ADD COLUMN).`
      );
    }
  }
}

async function acquireLock() {
  const [rows] = await sequelize.query(
    "SELECT GET_LOCK(?, ?) as locked",
    { replacements: [LOCK_NAME, LOCK_TIMEOUT_SEC] }
  );
  const locked = rows && rows[0] && rows[0].locked === 1;
  if (!locked) {
    throw new Error('Could not acquire migration lock. Another migration may be running.');
  }
}

function releaseLock() {
  return sequelize.query("SELECT RELEASE_LOCK(?)", {
    replacements: [LOCK_NAME],
  }).catch(() => {});
}

/**
 * Run all pending migrations. Safe to call on every app startup.
 * Uses advisory lock to prevent parallel execution.
 * In production, blocks destructive operations.
 */
async function runMigrations() {
  await sequelize.authenticate();
  log('Database connected.');

  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  const tableList = Array.isArray(tables)
    ? tables.map((t) => (typeof t === 'string' ? t : t.table_name || t.name || '')).filter(Boolean)
    : [];

  if (!tableList.includes('migrations')) {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        run_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    log('Created migrations table.');
  }

  await acquireLock();
  try {
    let ran = 0;
    for (const m of migrations) {
      const fullPath = path.join(migrationsDir, m);
      if (!fs.existsSync(fullPath)) continue;

      const [rows] = await sequelize.query(
        'SELECT 1 as done FROM migrations WHERE name = ?',
        { replacements: [m] }
      );

      if (rows && rows.length > 0) continue;

      const sql = fs.readFileSync(fullPath, 'utf8');
      if (isProduction()) {
        checkProductionSafety(sql);
      }

      await sequelize.query(sql);
      await sequelize.query('INSERT INTO migrations (name) VALUES (?)', {
        replacements: [m],
      });
      log(`Ran: ${m}`);
      ran++;
    }
    if (ran === 0) {
      log('No pending migrations.');
    } else {
      log(`Completed ${ran} migration(s).`);
    }
  } finally {
    await releaseLock();
  }
}

async function getMigrationStatus() {
  await sequelize.authenticate();
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  const tableList = Array.isArray(tables)
    ? tables.map((t) => (typeof t === 'string' ? t : t.table_name || t.name || '')).filter(Boolean)
    : [];

  if (!tableList.includes('migrations')) {
    return { applied: [], pending: migrations };
  }

  const [appliedRows] = await sequelize.query(
    'SELECT name, run_at FROM migrations ORDER BY id'
  );
  const applied = (appliedRows || []).map((r) => r.name);
  const pending = migrations.filter((m) => !applied.includes(m));
  return { applied, pending };
}

// Run as CLI
if (require.main === module) {
  runMigrations()
    .then(() => {
      log('Done.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Migrate] Error:', err.message);
      process.exit(1);
    });
}

module.exports = { runMigrations, getMigrationStatus };
