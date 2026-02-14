const { ResumeTemplate, sequelize } = require('../models');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Sync the model to create the table if it doesn't exist
        await ResumeTemplate.sync();

        const count = await ResumeTemplate.count();
        if (count > 0) {
            console.log('Templates already exist. Skipping seed.');
            process.exit(0);
        }

        const templates = [
            {
                title: 'Node.js Backend Standard',
                summary: 'Experienced Backend Developer proficient in Node.js and Nest.js. Proven track record in building scalable APIs.',
                content: `
          <h3>PROFESSIONAL SUMMARY</h3>
          <p>--------------------------------------------------</p>
          <p>Backend Developer with <strong>{{experience}}</strong> years of experience in designing and implementing scalable APIs using Node.js and Express. Proven expertise in database management and microservices architecture.</p>
          
          <h3>TECHNICAL SKILLS</h3>
          <p>--------------------------------------------------</p>
          <ul>
            <li><strong>Languages:</strong> JavaScript, TypeScript, SQL</li>
            <li><strong>Frameworks:</strong> Node.js, Express, Nest.js</li>
            <li><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</li>
            <li><strong>Tools:</strong> Docker, Kubernetes, AWS, Git</li>
          </ul>

          <h3>EXPERIENCE</h3>
          <p>--------------------------------------------------</p>
          <p><strong>Senior Backend Engineer | TechCorp Inc.</strong></p>
          <p>2020 - Present</p>
          <ul>
            <li>Architected and maintained microservices using Node.js and gRPC.</li>
            <li>Optimized database queries, reducing response time by 40%.</li>
            <li>Mentored junior developers and conducted code reviews.</li>
          </ul>
        `,
                technologies: ['Node.js', 'NestJS', 'Express']
            },
            {
                title: 'Node.js Microservices Base',
                summary: 'Specialized in Microservices architecture using Node.js and Docker containerization.',
                content: `
          <h3>PROFESSIONAL SUMMARY</h3>
          <p>Node.js Expert focusing on Microservices and high-availability systems.</p>
          <p>{{summary}}</p>
        `,
                technologies: ['Node.js', 'Docker', 'Kubernetes']
            },
            {
                title: 'Node.js Serverless Function',
                summary: 'Serverless enthusiast with deep knowledge of AWS Lambda and Node.js runtime environments.',
                content: `
          <h3>AWS LAMBDA SPECIALIST</h3>
          <p>Cloud-native developer with expertise in serverless architectures.</p>
        `,
                technologies: ['Node.js', 'AWS Lambda']
            },
            {
                title: 'Node.js API Boilerplate',
                summary: 'To leverage expertise in Express.js and Node.js to deliver high-performance RESTful APIs.',
                content: `
          <h3>RESTFUL API DEVELOPER</h3>
          <p>Expert in building secure and performant REST APIs.</p>
        `,
                technologies: ['Node.js', 'Express']
            }
        ];

        await ResumeTemplate.bulkCreate(templates);
        console.log('Successfully seeded 4 Node.js templates.');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
