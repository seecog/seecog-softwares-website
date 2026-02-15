const express = require('express');
const router = express.Router();
const requireAdmin = require('../middleware/requireAdmin');
const adminAuth = require('../controllers/adminAuthController');
const adminProfile = require('../controllers/adminProfileController');
const adminJobs = require('../controllers/adminJobsController');
const adminApplications = require('../controllers/adminApplicationsController');
const adminPartners = require('../controllers/adminPartnersController');
const adminPortfolio = require('../controllers/adminPortfolioController');

router.get('/login', adminAuth.getLogin);
router.post('/login', adminAuth.postLogin);
router.post('/logout', adminAuth.postLogout);

router.use(requireAdmin);

router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', { layout: 'admin', flash: res.locals.flash });
});

router.get('/profile/basic', adminProfile.getBasicInfo);
router.post('/profile/basic', adminProfile.postBasicInfo);
router.get('/profile/social', adminProfile.getSocialMedia);
router.post('/profile/social', adminProfile.postSocialMedia);

router.get('/jobs', adminJobs.list);
router.get('/jobs/new', adminJobs.getNew);
router.post('/jobs', adminJobs.postCreate);
router.get('/jobs/:id/edit', adminJobs.getEdit);
router.post('/jobs/:id', adminJobs.postUpdate);
router.post('/jobs/:id/delete', adminJobs.postDelete);
router.post('/jobs/:id/toggle', adminJobs.postToggle);

router.get('/applications', adminApplications.list);
router.get('/jobs/:id/applications', adminApplications.listByJob);
router.get('/applications/:id/resume', adminApplications.downloadResume);

router.get('/partners', adminPartners.list);
router.post('/partners/upload', adminPartners.postUpload);
router.post('/partners/:id/delete', adminPartners.postDelete);

router.get('/portfolio', adminPortfolio.list);
router.get('/portfolio/new', adminPortfolio.getNew);
router.post('/portfolio', adminPortfolio.postCreate);
router.get('/portfolio/:id/edit', adminPortfolio.getEdit);
router.post('/portfolio/:id', adminPortfolio.postUpdate);
router.post('/portfolio/:id/delete', adminPortfolio.postDelete);

module.exports = router;
