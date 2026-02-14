var express = require('express');
var router = express.Router();
var recruitController = require('../controllers/recruitController');
var requireAdmin = require('../middleware/requireAdmin');

// Secure all routes in this router
router.use(requireAdmin);

// Resume Operations Overview
router.get('/resume', recruitController.getResumeOperations);

// Resume CRUD
router.get('/resumes', recruitController.getTemplates);
router.get('/resumes/new', recruitController.getNewTemplate);
router.post('/resumes/new', recruitController.postCreateTemplate);
router.get('/resumes/:id/edit', recruitController.getEditTemplate);
router.post('/resumes/:id/edit', recruitController.postUpdateTemplate);
router.post('/resumes/delete', recruitController.postDeleteTemplate);

// Send Resumes
router.get('/send', recruitController.getSendResumes);
router.post('/send', recruitController.postSendResumes);

module.exports = router;
