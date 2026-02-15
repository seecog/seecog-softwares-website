const geoip = require('geoip-lite');
const { Visit } = require('../models');

const SKIP_PATHS = ['/admin', '/recruit', '/assets', '/favicon', '/__', '/api'];

function shouldTrack(path) {
  if (!path) return false;
  return !SKIP_PATHS.some((p) => path.startsWith(p));
}

function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         '127.0.0.1';
}

function trackVisit(req, res, next) {
  if (!shouldTrack(req.path)) return next();

  const ip = getClientIp(req);
  const geo = geoip.lookup(ip);

  Visit.create({
    ip,
    country: geo?.country || null,
    city: geo?.city || null,
    region: geo?.region || null,
    page_path: req.path || '/',
    user_agent: (req.headers['user-agent'] || '').substring(0, 500),
  }).catch((err) => console.error('[trackVisit]', err.message));

  next();
}

module.exports = trackVisit;
