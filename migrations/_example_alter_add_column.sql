-- TEMPLATE: Add a column to an existing table (idempotent)
-- Copy this file, rename to 010_alter_xxx_add_yyy.sql, update table/column names,
-- then add the filename to scripts/migrate.js
--
-- Idempotent: safe to run multiple times (e.g. on prod after re-run)

SET @db = DATABASE();

SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db
    AND TABLE_NAME = 'YOUR_TABLE_NAME'   -- change this
    AND COLUMN_NAME = 'YOUR_COLUMN_NAME' -- change this
);

SET @sql = IF(@col_exists = 0,
  'ALTER TABLE YOUR_TABLE_NAME ADD COLUMN YOUR_COLUMN_NAME VARCHAR(100) NULL AFTER existing_column',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
