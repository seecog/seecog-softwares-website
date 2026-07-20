require('dotenv').config({ path: 'properties.env' });
const os = require('os');

/**
 * One DB_HOST in properties.env (VPS public IP) for Mac + VPS.
 * When this process is running ON that same VPS, use 127.0.0.1 instead
 * so live never depends on public MySQL / firewall for itself.
 */
function resolveDbHost() {
  const configured = (process.env.DB_HOST || '127.0.0.1').trim();
  if (!configured || configured === '127.0.0.1' || configured === 'localhost') {
    return configured || '127.0.0.1';
  }
  try {
    const nets = os.networkInterfaces();
    for (const infos of Object.values(nets)) {
      for (const info of infos || []) {
        if (info && info.address === configured) {
          return '127.0.0.1';
        }
      }
    }
  } catch (_) {
    /* ignore */
  }
  return configured;
}

function resolveDbPass() {
  let pass = process.env.DB_PASS || '';
  // strip accidental wrapping quotes
  if (
    (pass.startsWith('"') && pass.endsWith('"')) ||
    (pass.startsWith("'") && pass.endsWith("'"))
  ) {
    pass = pass.slice(1, -1);
  }
  return pass;
}

const shared = {
  username: process.env.DB_USER || 'root',
  password: resolveDbPass(),
  database: process.env.DB_NAME || 'seecogsoftwares_website',
  host: resolveDbHost(),
  port: Number(process.env.DB_PORT || 3306),
  dialect: 'mysql',
};

module.exports = {
  development: { ...shared },
  production: { ...shared },
};
