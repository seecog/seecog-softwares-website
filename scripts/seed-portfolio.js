/**
 * Optional: Seed portfolio from routes/dataset/data.json into database.
 * Run: node scripts/seed-portfolio.js
 */
const fs = require('fs');
const path = require('path');
const { PortfolioProject } = require('../models');

const dataPath = path.join(__dirname, '../routes/dataset/data.json');

async function run() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(raw);
    const projects = data.portfolio_page?.projects || [];
    if (!projects.length) {
      console.log('No portfolio projects in data.json');
      process.exit(0);
    }

    const count = await PortfolioProject.count();
    if (count > 0) {
      console.log('Portfolio already has projects. Skipping seed.');
      process.exit(0);
    }

    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      let img = p.img || p.image;
      if (img && img.startsWith('./')) img = '/' + img.slice(2);

      await PortfolioProject.create({
        title: p.title || 'Untitled',
        image_url: img || null,
        description: p.desc || null,
        modules: Array.isArray(p.modules) ? p.modules : [],
        technology_stack: p.technology_used
          ? p.technology_used.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        display_order: i,
      });
    }
    console.log(`Seeded ${projects.length} portfolio projects.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

run();
