const { Visit, sequelize } = require('../models');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

async function analytics(req, res) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [recentVisits, byCountryRows, byCityRows, total] = await Promise.all([
      Visit.findAll({
        where: { createdAt: { [Op.gte]: thirtyDaysAgo } },
        order: [['createdAt', 'DESC']],
        limit: 50,
      }),
      sequelize.query(
        'SELECT country, COUNT(*) as count FROM visits WHERE createdAt >= ? AND country IS NOT NULL GROUP BY country ORDER BY count DESC',
        { replacements: [thirtyDaysAgo], type: QueryTypes.SELECT }
      ),
      sequelize.query(
        'SELECT city, country, COUNT(*) as count FROM visits WHERE createdAt >= ? AND city IS NOT NULL GROUP BY city, country ORDER BY count DESC LIMIT 30',
        { replacements: [thirtyDaysAgo], type: QueryTypes.SELECT }
      ),
      Visit.count({ where: { createdAt: { [Op.gte]: thirtyDaysAgo } } }),
    ]);

    res.render('admin/analytics/index', {
      layout: 'admin',
      recentVisits: recentVisits.map((v) => v.get({ plain: true })),
      byCountry: byCountryRows.map((r) => ({ country: r.country, count: parseInt(r.count, 10) })),
      byCity: byCityRows.map((r) => ({ city: r.city, country: r.country, count: parseInt(r.count, 10) })),
      totalVisits: total,
      flash: res.locals.flash,
      activeAnalytics: true,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    req.flashMessage('error', 'Failed to load analytics.');
    res.redirect('/admin/dashboard');
  }
}

module.exports = { analytics };
