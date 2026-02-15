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

async function run() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    const tableList = Array.isArray(tables) ? tables.map(t => (typeof t === 'string' ? t : t.table_name || t.name || '')).filter(Boolean) : [];

    if (!tableList.includes('migrations')) {
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          run_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }

    for (const m of migrations) {
      const fullPath = path.join(migrationsDir, m);
      const exists = fs.existsSync(fullPath);
      if (!exists) {
        console.log('Skipping (file not found):', m);
        continue;
      }

      const [rows] = await sequelize.query(
        "SELECT 1 as done FROM migrations WHERE name = ?",
        { replacements: [m] }
      );

      if (rows && rows.length > 0) {
        console.log('Already run:', m);
        continue;
      }

      const sql = fs.readFileSync(fullPath, 'utf8');
      await sequelize.query(sql);
      await sequelize.query(
        "INSERT INTO migrations (name) VALUES (?)",
        { replacements: [m] }
      );
      console.log('Ran:', m);
    }

    console.log('Migrations complete.');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

run();
