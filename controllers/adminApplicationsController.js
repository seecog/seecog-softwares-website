const path = require('path');
const fs = require('fs');
const { JobApplication, Job } = require('../models');

const MIME_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

async function list(req, res) {
  const applications = await JobApplication.findAll({
    include: [{ model: Job, as: 'Job', attributes: ['id', 'title'] }],
    order: [['applied_at', 'DESC']],
  });
  res.render('admin/applications-list', {
    layout: 'admin',
    applications: applications.map((a) => a.get({ plain: true })),
    activeApplications: true,
    flash: res.locals.flash,
  });
}

async function listByJob(req, res) {
  const job = await Job.findByPk(req.params.id);
  if (!job) {
    req.flashMessage('error', 'Job not found.');
    return res.redirect('/admin/jobs');
  }
  const applications = await JobApplication.findAll({
    where: { job_id: job.id },
    order: [['applied_at', 'DESC']],
  });
  res.render('admin/applications-by-job', {
    layout: 'admin',
    job,
    applications: applications.map((a) => a.get({ plain: true })),
    flash: res.locals.flash,
  });
}

async function downloadResume(req, res) {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) {
    return res.status(404).send('Application not found');
  }
  const app = await JobApplication.findByPk(id);
  if (!app || !app.resume_path) {
    return res.status(404).send('Application or resume not found');
  }
  const baseDir = (app.resume_path || '').startsWith('careers/')
    ? path.join(__dirname, '../public')
    : path.join(__dirname, '..');
  const filePath = path.join(baseDir, app.resume_path);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Resume file not found on server');
  }
  const ext = (app.resume_path || '').split('.').pop().toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const fileName = app.resume_original_name || path.basename(app.resume_path) || 'resume.' + (ext || 'pdf');
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', 'inline; filename="' + fileName.replace(/"/g, '%22') + '"');
  res.sendFile(path.resolve(filePath), (err) => {
    if (err && !res.headersSent) res.status(500).send('Error serving file');
  });
}

module.exports = { list, listByJob, downloadResume };
