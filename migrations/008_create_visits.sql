CREATE TABLE IF NOT EXISTS visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,
  country VARCHAR(100) NULL,
  city VARCHAR(100) NULL,
  region VARCHAR(100) NULL,
  page_path VARCHAR(500) NULL,
  user_agent VARCHAR(500) NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_visits_created (createdAt),
  INDEX idx_visits_country (country),
  INDEX idx_visits_ip (ip)
);
