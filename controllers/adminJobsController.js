const slugify = require('slugify');
const { Job } = require('../models');
const { Op } = require('sequelize');

function makeSlug(title) {
  return slugify(title, { lower: true, strict: true }).substring(0, 200) || 'job';
}

async function uniqueSlug(base, excludeId = null) {
  let slug = base;
  let n = 1;
  while (true) {
    const where = excludeId ? { slug, id: { [Op.ne]: excludeId } } : { slug };
    const exists = await Job.findOne({ where });
    if (!exists) return slug;
    slug = base + '-' + (n++);
  }
}

async function list(req, res) {
  const jobs = await Job.findAll({ order: [['createdAt', 'DESC']] });
  const jobsWithFlags = jobs.map((j) => ({ ...j.toJSON(), isPublished: j.status === 'PUBLISHED' }));
  res.render('admin/jobs-list', {
    layout: 'admin',
    jobs: jobsWithFlags,
    activeJobs: true,
    flash: res.locals.flash,
  });
}

async function getNew(req, res) {
  res.render('admin/jobs-form', {
    layout: 'admin',
    job: null,
    activeJobs: true,
    flash: res.locals.flash,
  });
}

async function postCreate(req, res) {
  const { title, department, location, job_type, description, status } = req.body || {};
  if (!title || !title.trim()) {
    req.flashMessage('error', 'Title is required.');
    return res.redirect('/admin/jobs/new');
  }
  try {
    const base = makeSlug(title.trim());
    const slug = await uniqueSlug(base);
    const job = await Job.create({
      title: title.trim(),
      slug,
      department: (department || '').trim() || null,
      location: (location || '').trim() || null,
      job_type: job_type || 'FULL_TIME',
      description: (description || '').trim() || null,
      status: status || 'DRAFT',
      created_by: req.session.adminUserId,
    });
    if (job.status === 'PUBLISHED' && !job.posted_at) {
      await job.update({ posted_at: new Date() });
    }
    req.flashMessage('success', 'Job created.');
    res.redirect('/admin/jobs');
  } catch (err) {
    console.error(err);
    req.flashMessage('error', 'Failed to create job.');
    res.redirect('/admin/jobs/new');
  }
}

async function getEdit(req, res) {
  const job = await Job.findByPk(req.params.id);
  if (!job) {
    req.flashMessage('error', 'Job not found.');
    return res.redirect('/admin/jobs');
  }
  res.render('admin/jobs-form', {
    layout: 'admin',
    job: job.toJSON(),
    activeJobs: true,
    flash: res.locals.flash,
  });
}

async function postUpdate(req, res) {
  const job = await Job.findByPk(req.params.id);
  if (!job) {
    req.flashMessage('error', 'Job not found.');
    return res.redirect('/admin/jobs');
  }
  const { title, department, location, job_type, description, status } = req.body || {};
  if (!title || !title.trim()) {
    req.flashMessage('error', 'Title is required.');
    return res.redirect('/admin/jobs/' + job.id + '/edit');
  }
  try {
    const base = makeSlug(title.trim());
    const slug = await uniqueSlug(base, job.id);
    const updates = {
      title: title.trim(),
      slug,
      department: (department || '').trim() || null,
      location: (location || '').trim() || null,
      job_type: job_type || 'FULL_TIME',
      description: (description || '').trim() || null,
      status: status || 'DRAFT',
    };
    if (updates.status === 'PUBLISHED' && !job.posted_at) {
      updates.posted_at = new Date();
    } else if (updates.status !== 'PUBLISHED') {
      updates.posted_at = null;
    }
    await job.update(updates);
    req.flashMessage('success', 'Job updated.');
    res.redirect('/admin/jobs');
  } catch (err) {
    console.error(err);
    req.flashMessage('error', 'Failed to update job.');
    res.redirect('/admin/jobs/' + job.id + '/edit');
  }
}

async function postDelete(req, res) {
  const job = await Job.findByPk(req.params.id);
  if (!job) {
    req.flashMessage('error', 'Job not found.');
    return res.redirect('/admin/jobs');
  }
  await job.destroy();
  req.flashMessage('success', 'Job deleted.');
  res.redirect('/admin/jobs');
}

async function postToggle(req, res) {
  const job = await Job.findByPk(req.params.id);
  if (!job) {
    req.flashMessage('error', 'Job not found.');
    return res.redirect('/admin/jobs');
  }
  const newStatus = job.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  const updates = { status: newStatus };
  if (newStatus === 'PUBLISHED' && !job.posted_at) {
    updates.posted_at = new Date();
  } else if (newStatus === 'DRAFT') {
    updates.posted_at = null;
  }
  await job.update(updates);
  req.flashMessage('success', 'Job ' + (newStatus === 'PUBLISHED' ? 'published' : 'unpublished') + '.');
  res.redirect('/admin/jobs');
}

module.exports = { list, getNew, postCreate, getEdit, postUpdate, postDelete, postToggle };
