/* ===============================
   PER-PAGE SEO METADATA
   Read by views/partials/seo.hbs via res.locals.seo
================================ */

const SITE_URL = 'https://seecogsoftwares.com';
const SITE_NAME = 'Seecog Softwares';
const DEFAULT_IMAGE = SITE_URL + '/assets/img/logo.jpg';

const PAGES = {
  '/': {
    title: 'Seecog Softwares | AI-Native Product Engineering & SaaS Development',
    description: 'Seecog Softwares builds SaaS platforms, web and mobile products, and AI agents for businesses — and runs its own products like Teamaangan, OpsPick, KitchenEye and Quire Workspace.',
  },
  '/services': {
    title: 'Services | Product Engineering, AI Agents & Dedicated Teams — Seecog Softwares',
    description: 'Product engineering, AI agents and workflow automation, AI inside your product, connected and controlled AI, mobile and on-device AI, and dedicated engineering teams.',
  },
  '/industries': {
    title: 'Industries We Serve | Seecog Softwares',
    description: 'Software and AI for SaaS companies, digital commerce and distribution, workforce and enterprise operations, and learning and knowledge businesses.',
  },
  '/our-products': {
    title: 'Our Products | Teamaangan, OpsPick, Pakka Kaam, KitchenEye, Quire, Indovyapar',
    description: 'Products built and run by Seecog Softwares: team chat, sprint and timesheet tracking, a team knowledge base, construction and restaurant operations apps, and a multi-vendor marketplace.',
  },
  '/portfolio': {
    title: 'Portfolio & Case Studies | Seecog Softwares',
    description: 'Web, mobile and SaaS products Seecog Softwares has designed, built and shipped for clients — marketplaces, ordering apps, consumer apps and business platforms.',
  },
  '/technologies': {
    title: 'Technology Stack | Seecog Softwares',
    description: 'The frontend, backend, mobile, cloud, data and AI technologies Seecog Softwares uses to build scalable, secure products.',
  },
  '/culture': {
    title: 'Our Culture | Seecog Softwares',
    description: 'How the Seecog Softwares team works: ownership, teamwork, quality, curiosity and trust.',
  },
  '/careers': {
    title: 'Careers | Join Seecog Softwares, Bengaluru',
    description: 'Build web, mobile, cloud and AI products with Seecog Softwares. See open roles, our hiring process and how to apply.',
  },
  '/partners': {
    title: 'Partners & Clients | Seecog Softwares',
    description: 'The clients and technology partners Seecog Softwares works with to deliver reliable, scalable software.',
  },
  '/contact': {
    title: 'Contact Us | Start a Project with Seecog Softwares',
    description: 'Tell us what you are building. Reach Seecog Softwares in Koramangala, Bengaluru by email, phone or WhatsApp — we reply within 24 hours.',
  },
  '/my-digital-card': {
    title: 'Digital Business Card | Seecog Softwares',
    description: 'Save Seecog Softwares contact details, scan, or connect instantly by email, phone or WhatsApp.',
  },
};

const ORGANIZATION_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Seecog Softwares Pvt Ltd',
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  email: 'info@seecogsoftwares.com',
  telephone: '+91-7625067691',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Site No. 26, Prestige Cube Building, Laskar, Hosur Rd, Adugodi, Koramangala',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560030',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/seecog-softwares-pvt-ltd/',
    'https://twitter.com/seecogsoftwares',
    'https://www.facebook.com/profile.php?id=61585373592616',
  ],
});

function seoMiddleware(req, res, next) {
  const page = PAGES[req.path];
  res.locals.seo = {
    title: page ? page.title : SITE_NAME,
    description: page ? page.description : PAGES['/'].description,
    url: SITE_URL + (req.path === '/' ? '/' : req.path),
    image: DEFAULT_IMAGE,
    siteName: SITE_NAME,
    schema: req.path === '/' ? ORGANIZATION_SCHEMA : null,
  };
  next();
}

module.exports = seoMiddleware;
