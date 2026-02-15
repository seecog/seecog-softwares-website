const { ResumeTemplate } = require('../models');
const transporter = require('../config/emailConfig');

const techList = ["Node.js", "NestJS", "Express", "React", "Next.js", "ASP.Net", "Springboot"];

exports.getResumeOperations = (req, res) => {
  res.render('admin/resume/operations', {
    layout: 'recruit_pro',
    title: 'Resume Technology Database',
    subtitle: 'Manage and edit your technology-specific resume templates',
    activeResumes: true
  });
};

exports.getTemplates = async (req, res) => {
  console.log('[RECRUIT] getTemplates called');
  try {
    const templates = await ResumeTemplate.findAll({ order: [['updatedAt', 'DESC']] });
    res.render('admin/resume/templates', {
      layout: 'recruit_pro',
      title: 'Resume Technology Database',
      templates: templates.map(t => t.get ? t.get({ plain: true }) : t),
      activeResumes: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getNewTemplate = (req, res) => {
  res.render('admin/resume/editor', {
    layout: 'recruit_pro',
    title: 'Create Resume Template',
    template: { technologies: [] }, // Provide default for new
    techList,
    isNew: true
  });
};

exports.postCreateTemplate = async (req, res) => {
  try {
    const { title, summary, content, technologies } = req.body;
    const techArray = Array.isArray(technologies) ? technologies : [technologies];

    await ResumeTemplate.create({
      title,
      summary,
      content,
      technologies: techArray
    });
    res.redirect('/recruit/resumes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditTemplate = async (req, res) => {
  console.log(`[RECRUIT] getEditTemplate called for ID: ${req.params.id}`);
  try {
    const template = await ResumeTemplate.findByPk(req.params.id);
    if (!template) {
      console.log(`[RECRUIT] Template not found: ${req.params.id}`);
      return res.status(404).send('Template Not Found');
    }

    const sanitizedTemplate = JSON.parse(JSON.stringify(template));
    console.log(`[RECRUIT] Rendering editor for: ${sanitizedTemplate.title}`);

    res.render('admin/resume/editor', {
      layout: 'recruit_pro',
      title: 'Edit Resume Template',
      template: template.get({ plain: true }),
      techList,
      isNew: false
    });
  } catch (err) {
    console.error('getEditTemplate Error:', err);
    res.status(500).send(`Server Error: ${err.message}`);
  }
};

exports.postUpdateTemplate = async (req, res) => {
  try {
    const { title, summary, content, technologies } = req.body;
    const techArray = Array.isArray(technologies) ? technologies : [technologies];

    await ResumeTemplate.update({
      title,
      summary,
      content,
      technologies: techArray
    }, {
      where: { id: req.params.id }
    });
    res.redirect('/recruit/resumes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.postDeleteTemplate = async (req, res) => {
  try {
    await ResumeTemplate.destroy({ where: { id: req.body.id } });
    res.redirect('/recruit/resumes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getSendResumes = async (req, res) => {
  try {
    const templates = await ResumeTemplate.findAll();
    res.render('admin/resume/send', {
      layout: 'recruit_pro',
      title: 'Send Resumes',
      templates: templates.map(t => t.get ? t.get({ plain: true }) : t)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.postSendResumes = async (req, res) => {
  try {
    const {
      toEmail,
      resumeIds,
      clientName,
      senderName,
      senderDesignation,
      senderPhone,
      senderEmail
    } = req.body;

    if (!resumeIds || resumeIds.length === 0) {
      return res.redirect('/recruit/send');
    }

    const ids = Array.isArray(resumeIds) ? resumeIds : [resumeIds];
    const templates = await ResumeTemplate.findAll({
      where: { id: ids }
    });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Create the professional message body
      const emailBody = `
        <div style="font-family: Georgia, serif; font-size: 14px; color: #333; line-height: 1.6;">
          <p>Hi ${clientName || '[Client Name]'},</p>
          
          <p>I hope you are doing well.</p>
          
          <p>As discussed, please find attached the shortlisted candidate profiles for your review based on your current requirements.</p>
          
          <p><strong>Candidate Details Included:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Relevant technical skills and experience</li>
            <li>Project background and domain expertise</li>
            <li>Availability and notice period</li>
            <li>Engagement model alignment</li>
          </ul>
          
          <p>We have carefully screened these candidates to match your technical and business expectations. Kindly review the attached resumes and share your feedback or preferred profiles so we can coordinate the next steps, including interview scheduling.</p>
          
          <p>If needed, we can also provide additional profiles or refine the shortlist further based on your specific preferences.</p>
          
          <p>Looking forward to your feedback.</p>
          
          <br>
          
          <p>Best regards,</p>
          <p style="margin: 0; font-weight: bold;">${senderName || '[Your Full Name]'}</p>
          <p style="margin: 0;">${senderDesignation || '[Your Designation]'}</p>
          <p style="margin: 0;">${senderPhone || '[Phone Number]'}</p>
          <p style="margin: 0;"><a href="mailto:${senderEmail || 'info@seecogsoftwares.com'}" style="color: #007bff; text-decoration: none;">${senderEmail || '[Email Address]'}</a></p>
          <p style="margin: 10px 0 0 0; font-weight: bold;">Seecog Softwares Pvt. Ltd.</p>
          
          <p style="margin: 0;">🌐 Website: <a href="https://seecogsoftwares.com" style="color: #007bff; text-decoration: none;">https://seecogsoftwares.com</a></p>
          <p style="margin: 0;">📞 Phone: +91 76250 67691</p>
          <p style="margin: 0;">✉️ Email: <a href="mailto:info@seecogsoftwares.com" style="color: #007bff; text-decoration: none;">info@seecogsoftwares.com</a></p>
          <p style="margin: 0;">📍 Office: Prestige Cube, Site No. 26, Laskar Hosur Road, Adugodi, Koramangala, Bengaluru, Karnataka – 560030, India</p>
          
          <div style="margin: 20px 0; color: #555; font-size: 12px; text-align: center;">
            <p style="margin: 0;">──────────────────────────────</p>
            <p style="margin: 5px 0; font-weight: bold;">Technology Expertise</p>
            <p style="margin: 0;">☁️ Cloud | 📱 Mobility | 🤖 Automation | 📊 BI & Data Warehousing | 🧠 Machine Learning | 🚀 SaaS | ⚙️ DevOps | 🏥 Healthcare IT | ☁️ Azure | 🧩 Salesforce (SFDC) | 🎨 Frontend (UI) | 🔄 Digital Transformation | 💻 Software Engineering Services</p>
            <p style="margin: 0;">──────────────────────────────</p>
          </div>
          
          <p style="font-size: 11px; color: #888; font-style: italic;">This email and any attachments are confidential and intended solely for the recipient. If you received this email by mistake, please notify the sender and delete it immediately.</p>
        </div>
      `;

      // Import PDF generation libraries
      // Use the printer module directly for server-side generation
      const PdfPrinter = require('pdfmake/js/printer'); // This returns the module with .default
      const PrinterConstructor = PdfPrinter.default || PdfPrinter; // Handle both ESM and CommonJS
      const htmlToPdfmake = require('html-to-pdfmake');
      const jsdom = require('jsdom');
      const { JSDOM } = jsdom;

      // Define fonts (using standard Roboto included in pdfmake)
      const fonts = {
        Roboto: {
          normal: 'node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
      };

      const printer = new PrinterConstructor(fonts);

      // Create PDF attachments from resume templates
      const attachments = await Promise.all(templates.map(async (template) => {
        // Create JSDOM window for html-to-pdfmake
        const { window } = new JSDOM('');

        // Convert HTML content to pdfmake format 
        // We wrap the content in a div to ensure proper parsing
        const htmlContent = `
          <div>
            <h1 style="color: #2d60ff; margin-bottom: 20px;">${template.title}</h1>
            <div style="margin-bottom: 20px; color: #64748b;">${template.summary || ''}</div>
            <div style="margin-bottom: 20px;"><strong>Technologies:</strong> ${Array.isArray(template.technologies) ? template.technologies.join(', ') : template.technologies}</div>
            <hr style="margin-bottom: 20px; border-color: #e2e8f0;">
            ${template.content}
            <div style="margin-top: 40px; font-size: 10px; color: #94a3b8; text-align: center;">Generated by Seecog RecruitPro</div>
          </div>
        `;

        const content = htmlToPdfmake(htmlContent, { window: window });

        // Define document structure
        const docDefinition = {
          content: content,
          defaultStyle: {
            font: 'Roboto'
          }
        };

        // Create PDF buffer using printer
        // IMPORTANT: createPdfKitDocument is async in recent versions, so we await it
        const pdfDoc = await printer.createPdfKitDocument(docDefinition);

        const pdfBuffer = await new Promise((resolve, reject) => {
          const chunks = [];
          pdfDoc.on('data', (chunk) => chunks.push(chunk));
          pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
          pdfDoc.on('error', (err) => reject(err));
          pdfDoc.end();
        });

        return {
          filename: `${template.title.replace(/[^a-z0-9]/gi, '_')}_Resume.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        };
      }));

      await transporter.sendMail({
        from: `"Seecog Softwares" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `Shortlisted Candidate Profiles - ${templates.map(t => t.title).join(', ')}`,
        html: emailBody,
        attachments: attachments
      });
      console.log(`[EMAIL SENT] Successfully sent ${templates.length} resumes as PDF attachments to ${toEmail}`);
    } else {
      console.log(`[EMAIL BYPASS] SMTP not configured. Simulation only.`);
    }

    res.render('admin/resume/operations', {
      layout: 'recruit_pro',
      title: 'Resume Technology Templates',
      subtitle: 'Manage and edit your technology-specific resume templates',
      templates: templates.map(t => t.get({ plain: true })),
      success: `Successfully sent ${templates.length} resume(s) as PDF attachments to ${toEmail}`
    });
  } catch (err) {
    console.error('Email Send Error:', err);
    res.render('admin/resume/operations', {
      layout: 'recruit_pro',
      title: 'Resume Technology Templates',
      subtitle: 'Manage and edit your technology-specific resume templates',
      error: `Failed to send email: ${err.message}. Please check your credentials.`
    });
  }
};
