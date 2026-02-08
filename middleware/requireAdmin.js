function requireAdmin(req, res, next) {
  if (req.session && req.session.adminUserId) {
    return next();
  }
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.redirect('/admin/login');
}

module.exports = requireAdmin;
