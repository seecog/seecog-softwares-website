const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Partner } = require('../models');

const uploadsDir = path.join(__dirname, '../public/uploads/partners');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = (file.originalname || '').split('.').pop().toLowerCase() || 'png';
    const safe = `partner-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return cb(null, true);
    cb(new Error('Only PNG, JPG, JPEG, GIF, WEBP, SVG allowed.'));
  },
}).single('image');

async function list(req, res) {
  try {
    const partners = await Partner.findAll({
      order: [['display_order', 'ASC'], ['createdAt', 'ASC']],
    });
    res.render('admin/partners/list', {
      layout: 'admin',
      partners: partners.map((p) => p.get({ plain: true })),
      flash: res.locals.flash,
      activePartners: true,
    });
  } catch (err) {
    console.error('Partners list error:', err);
    req.flashMessage('error', 'Failed to load partners.');
    res.redirect('/admin/dashboard');
  }
}

function postUpload(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      req.flashMessage('error', err.message || 'Upload failed.');
      return res.redirect('/admin/partners');
    }
    if (!req.file) {
      req.flashMessage('error', 'Please select an image.');
      return res.redirect('/admin/partners');
    }
    const name = (req.body.name || '').trim();
    const displayOrder = parseInt(req.body.display_order, 10) || 0;
    const imageUrl = '/uploads/partners/' + req.file.filename;
    try {
      await Partner.create({
        image_url: imageUrl,
        name: name || null,
        display_order: displayOrder,
      });
      req.flashMessage('success', 'Partner image uploaded successfully.');
    } catch (e) {
      console.error('Partner create error:', e);
      fs.unlink(req.file.path, () => {});
      req.flashMessage('error', 'Failed to save partner.');
    }
    res.redirect('/admin/partners');
  });
}

async function postDelete(req, res) {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.redirect('/admin/partners');
  try {
    const partner = await Partner.findByPk(id);
    if (!partner) {
      req.flashMessage('error', 'Partner not found.');
      return res.redirect('/admin/partners');
    }
    const filePath = path.join(__dirname, '../public', partner.image_url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await partner.destroy();
    req.flashMessage('success', 'Partner deleted successfully.');
  } catch (e) {
    console.error('Partner delete error:', e);
    req.flashMessage('error', 'Failed to delete partner.');
  }
  res.redirect('/admin/partners');
}

module.exports = {
  list,
  postUpload,
  postDelete,
};
