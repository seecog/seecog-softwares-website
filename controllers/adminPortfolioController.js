const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { PortfolioProject } = require('../models');

const uploadsDir = path.join(__dirname, '../public/uploads/portfolio');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = (file.originalname || '').split('.').pop().toLowerCase() || 'png';
    const safe = `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return cb(null, true);
    cb(new Error('Only PNG, JPG, JPEG, GIF, WEBP, SVG allowed.'));
  },
}).single('image');

function parseJsonArray(val) {
  if (!val || val === '') return [];
  if (Array.isArray(val)) return val.filter(Boolean).map((s) => String(s).trim());
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed.filter(Boolean).map((s) => String(s).trim()) : [];
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

async function list(req, res) {
  try {
    const projects = await PortfolioProject.findAll({
      order: [['display_order', 'ASC'], ['createdAt', 'ASC']],
    });
    res.render('admin/portfolio/list', {
      layout: 'admin',
      projects: projects.map((p) => {
        const plain = p.get({ plain: true });
        plain.modules = plain.modules || [];
        plain.technology_stack = plain.technology_stack || [];
        return plain;
      }),
      flash: res.locals.flash,
      activePortfolio: true,
    });
  } catch (err) {
    console.error('Portfolio list error:', err);
    req.flashMessage('error', 'Failed to load portfolio.');
    res.redirect('/admin/dashboard');
  }
}

async function getNew(req, res) {
  res.render('admin/portfolio/form', {
    layout: 'admin',
    project: { modules: [], technology_stack: [], display_order: 0 },
    activePortfolio: true,
    flash: res.locals.flash,
  });
}

function postCreate(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      req.flashMessage('error', err.message || 'Upload failed.');
      return res.redirect('/admin/portfolio/new');
    }
    const { title, description, display_order } = req.body || {};
    if (!title || !title.trim()) {
      req.flashMessage('error', 'Project name is required.');
      return res.redirect('/admin/portfolio/new');
    }
    let modules = req.body.modules;
    let technology_stack = req.body.technology_stack;
    if (typeof modules === 'string') modules = [modules];
    if (typeof technology_stack === 'string') technology_stack = [technology_stack];
    const modulesArr = parseJsonArray(Array.isArray(modules) ? modules : []);
    const techArr = parseJsonArray(Array.isArray(technology_stack) ? technology_stack : []);

    const imageUrl = req.file ? '/uploads/portfolio/' + req.file.filename : null;
    try {
      await PortfolioProject.create({
        title: title.trim(),
        image_url: imageUrl,
        description: (description || '').trim() || null,
        modules: modulesArr,
        technology_stack: techArr,
        display_order: parseInt(display_order, 10) || 0,
      });
      req.flashMessage('success', 'Portfolio project created.');
      res.redirect('/admin/portfolio');
    } catch (e) {
      console.error('Portfolio create error:', e);
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      req.flashMessage('error', 'Failed to create project.');
      res.redirect('/admin/portfolio/new');
    }
  });
}

async function getEdit(req, res) {
  const project = await PortfolioProject.findByPk(req.params.id);
  if (!project) {
    req.flashMessage('error', 'Project not found.');
    return res.redirect('/admin/portfolio');
  }
  const plain = project.get({ plain: true });
  plain.modules = plain.modules || [];
  plain.technology_stack = plain.technology_stack || [];
  res.render('admin/portfolio/form', {
    layout: 'admin',
    project: plain,
    activePortfolio: true,
    flash: res.locals.flash,
  });
}

function postUpdate(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      req.flashMessage('error', err.message || 'Upload failed.');
      return res.redirect('/admin/portfolio/' + req.params.id + '/edit');
    }
    const project = await PortfolioProject.findByPk(req.params.id);
    if (!project) {
      req.flashMessage('error', 'Project not found.');
      return res.redirect('/admin/portfolio');
    }
    const { title, description, display_order } = req.body || {};
    if (!title || !title.trim()) {
      req.flashMessage('error', 'Project name is required.');
      return res.redirect('/admin/portfolio/' + project.id + '/edit');
    }
    let modules = req.body.modules;
    let technology_stack = req.body.technology_stack;
    if (typeof modules === 'string') modules = [modules];
    if (typeof technology_stack === 'string') technology_stack = [technology_stack];
    const modulesArr = parseJsonArray(Array.isArray(modules) ? modules : []);
    const techArr = parseJsonArray(Array.isArray(technology_stack) ? technology_stack : []);

    let imageUrl = project.image_url;
    if (req.file) {
      const oldPath = path.join(__dirname, '../public', project.image_url || '');
      if (project.image_url && fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      imageUrl = '/uploads/portfolio/' + req.file.filename;
    }
    try {
      await project.update({
        title: title.trim(),
        image_url: imageUrl,
        description: (description || '').trim() || null,
        modules: modulesArr,
        technology_stack: techArr,
        display_order: parseInt(display_order, 10) || 0,
      });
      req.flashMessage('success', 'Portfolio project updated.');
      res.redirect('/admin/portfolio');
    } catch (e) {
      console.error('Portfolio update error:', e);
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      req.flashMessage('error', 'Failed to update project.');
      res.redirect('/admin/portfolio/' + project.id + '/edit');
    }
  });
}

async function postDelete(req, res) {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.redirect('/admin/portfolio');
  try {
    const project = await PortfolioProject.findByPk(id);
    if (!project) {
      req.flashMessage('error', 'Project not found.');
      return res.redirect('/admin/portfolio');
    }
    if (project.image_url) {
      const filePath = path.join(__dirname, '../public', project.image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await project.destroy();
    req.flashMessage('success', 'Portfolio project deleted.');
  } catch (e) {
    console.error('Portfolio delete error:', e);
    req.flashMessage('error', 'Failed to delete project.');
  }
  res.redirect('/admin/portfolio');
}

module.exports = {
  list,
  getNew,
  postCreate,
  getEdit,
  postUpdate,
  postDelete,
};
