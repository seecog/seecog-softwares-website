function flash(req, res, next) {
  if (!req.session) return next();
  res.locals.flash = req.session.flash || {};
  req.session.flash = {};
  req.flashMessage = function (type, msg) {
    req.session.flash = req.session.flash || {};
    req.session.flash[type] = msg;
  };
  next();
}

module.exports = flash;
