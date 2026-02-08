const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { Job, JobApplication } = require('../models');

const uploadsDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + (file.originalname || 'resume').replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx'].includes(ext)) return cb(null, true);
    cb(new Error('Only PDF, DOC, DOCX allowed.'));
  },
}).single('resume');

async function getCareers(req, res) {
  let jobs = [];
  try {
    jobs = await Job.findAll({
      where: { status: 'PUBLISHED' },
      order: [['posted_at', 'DESC']],
    });
  } catch (err) {
    console.error('Careers fetch error:', err);
  }
  const queryError = req.query.error ? decodeURIComponent(req.query.error) : null;
  const querySuccess = req.query.success ? decodeURIComponent(req.query.success) : null;
  res.render('careers', {
    layout: 'contact_main',
    queryError,
    querySuccess,
    data: {
      title: 'Careers',
      subTitle: 'Build your career with us',
      jobs: jobs.map((j) => ({
        id: j.id,
        title: j.title,
        department: j.department,
        location: j.location,
        job_type: j.job_type,
        description: (j.description || '').substring(0, 200) + (j.description && j.description.length > 200 ? '...' : ''),
        slug: j.slug,
      })),
    },
  });
}

function jsonResponse(res, success, message) {
  const wantsJson = res.req.get && (res.req.get('Accept') || '').includes('application/json');
  if (wantsJson) {
    return res.json(success ? { success: true } : { success: false, error: message });
  }
  return res.redirect('/careers?' + (success ? 'success=' : 'error=') + encodeURIComponent(message));
}

function postApply(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return jsonResponse(res, false, err.message || 'Upload failed');
    }
    const { full_name, email, linkedin_url, portfolio_url, job_id } = req.body || {};
    if (!full_name || !email || !linkedin_url || !req.file) {
      return jsonResponse(res, false, 'Full name, email, LinkedIn URL, and resume are required.');
    }
    const jid = parseInt(job_id, 10);
    if (!jid || isNaN(jid)) {
      return jsonResponse(res, false, 'Please select a job.');
    }
    try {
      const job = await Job.findByPk(jid);
      if (!job || job.status !== 'PUBLISHED') {
        return jsonResponse(res, false, 'Invalid job.');
      }
      const careersDir = path.join(__dirname, '../public/careers');
      if (!fs.existsSync(careersDir)) fs.mkdirSync(careersDir, { recursive: true });
      const sanitize = (s) => (s || '').replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').substring(0, 80);
      const ext = (req.file.originalname || '').split('.').pop().toLowerCase() || 'pdf';
      const baseName = sanitize(full_name) + '-' + sanitize(job.title) + '-' + Date.now();
      const newFilename = baseName + '.' + ext;
      const newPath = path.join(careersDir, newFilename);
      fs.renameSync(req.file.path, newPath);
      const resumePath = 'careers/' + newFilename;
      await JobApplication.create({
        job_id: jid,
        full_name: (full_name || '').trim(),
        email: (email || '').trim(),
        linkedin_url: (linkedin_url || '').trim(),
        portfolio_url: (portfolio_url || '').trim() || null,
        resume_path: resumePath,
        resume_original_name: req.file.originalname,
        resume_mime: req.file.mimetype,
        resume_size: req.file.size,
        applied_at: new Date(),
      });
      return jsonResponse(res, true, 'Application submitted successfully!');
    } catch (e) {
      console.error('Apply error:', e);
      return jsonResponse(res, false, 'Failed to submit. Please try again.');
    }
  });
}

module.exports = { getCareers, postApply };
