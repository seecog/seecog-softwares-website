# Database Migrations Guide

Production-safe migration system with locking, environment checks, and forward-only additive migrations.

---

## How It Works

- **Migrations** in `migrations/` as numbered SQL files (e.g. `001_create_admin_users.sql`)
- **Tracking table** `migrations` records which have run
- **Advisory lock** prevents parallel migration execution
- **Production safety**: Blocks `DROP TABLE`, `TRUNCATE`, `DROP DATABASE` in production
- **Startup**: Migrations run automatically before the server starts; if they fail, the server does not start

---

## Startup Flow

1. Load environment variables (`properties.env`)
2. Connect to database
3. Run pending migrations (with lock)
4. Optionally run seed (`SEED_ON_STARTUP=1`)
5. Start server

---

## Scripts Reference

| Script | Use case |
|--------|----------|
| `npm run migrate` | Run migrations (uses DB from env) |
| `npm run migrate:dev` | Run migrations in development |
| `npm run migrate:deploy` | Run migrations in production (safe, additive only) |
| `npm run migrate:prod` | Alias for migrate:deploy |
| `npm run migrate:status` | Show applied vs pending migrations |
| `npm run reset:dev` | **Dev only.** Drop all tables, re-migrate, seed |
| `npm run seed` | Seed admin, site profile, social links (idempotent) |
| `npm run seed-credentials` | Seed credentials vault |
| `npm run seed-portfolio` | Seed portfolio from JSON |

---

## Environment Safety

| Environment | Migrations | Destructive ops |
|-------------|------------|-----------------|
| Development | Run on startup; also via `npm run migrate` | Allowed (e.g. for reset:dev) |
| Production  | Run on startup; also via `npm run migrate:deploy` | **Blocked** (DROP TABLE, TRUNCATE, DROP DATABASE) |

**Production rule:** Use additive migrations only:
- `CREATE TABLE IF NOT EXISTS`
- `ALTER TABLE ... ADD COLUMN` (with idempotent pattern)
- `CREATE INDEX` (with existence check)

---

## Migration Rules (Data Safety)

1. **New tables**: Use `CREATE TABLE IF NOT EXISTS`
2. **Structure changes**: Use idempotent patterns (check before ADD COLUMN, etc.)
3. **Production**: Never use DROP TABLE, TRUNCATE, or DROP DATABASE

---

## Creating New Migrations

1. Add `migrations/XXX_descriptive_name.sql` with idempotent SQL
2. Add the filename to the `migrations` array in `scripts/migrate.js`

### Example: New table

```sql
CREATE TABLE IF NOT EXISTS my_new_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Example: Add column (idempotent)

```sql
SET @db = DATABASE();
SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'visits' AND COLUMN_NAME = 'state'
);
SET @sql = IF(@col_exists = 0,
  'ALTER TABLE visits ADD COLUMN state VARCHAR(100) NULL AFTER region',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
```

---

## Seed System

- **Idempotent**: Seeds only create data if it doesn't exist; they never overwrite existing records
- **Optional on startup**: Set `SEED_ON_STARTUP=1` in env to run seed after migrations on app start
- **Manual**: `npm run seed` for admin/profile/social; `npm run seed-credentials` for credentials vault

---

## CI/CD and Docker

### Production deployment

Migrations run automatically when the app starts. Ensure DB env vars are set before starting:

```bash
export NODE_ENV=production
export DB_HOST=...
export DB_NAME=...
export DB_USER=...
export DB_PASS=...
npm start
```

### Run migrations only (before starting app)

```bash
NODE_ENV=production npm run migrate:deploy
```

### Docker example

```dockerfile
# Ensure env vars are passed at runtime
CMD ["node", "./bin/www"]
```

```bash
docker run -e NODE_ENV=production -e DB_HOST=... -e DB_NAME=... -e DB_USER=... -e DB_PASS=... myapp
```

Migrations run on container start before the server listens.

### Check migration status

```bash
npm run migrate:status
```

---

## Production Deployment (Safe Flow)

1. **Backup** the database (if available)
2. **Deploy** new code
3. **Start app**: Migrations run automatically on startup
4. If migration fails, the process exits with non-zero code (no server start)
5. Fix any issues, redeploy

**Manual migration (optional):**

```bash
NODE_ENV=production npm run migrate:deploy
# Then start the app
npm start
```

---

## Current Migrations

| # | File | Description |
|---|------|-------------|
| 1 | 001_create_admin_users.sql | Admin users |
| 2 | 002_create_site_profile.sql | Site profile |
| 3 | 003_create_social_links.sql | Social links |
| 4 | 004_create_jobs.sql | Jobs |
| 5 | 005_create_job_applications.sql | Job applications |
| 6 | 006_create_partners.sql | Partners |
| 7 | 007_create_portfolio_projects.sql | Portfolio projects |
| 8 | 008_create_visits.sql | Visit tracking |
| 9 | 009_create_credentials_vault.sql | Credentials vault |
