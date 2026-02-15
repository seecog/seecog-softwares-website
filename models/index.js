const { sequelize, Sequelize } = require('../config/sequelize');

const AdminUser = require('./AdminUser')(sequelize, Sequelize.DataTypes);
const SiteProfile = require('./SiteProfile')(sequelize, Sequelize.DataTypes);
const SocialLinks = require('./SocialLinks')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);
const JobApplication = require('./JobApplication')(sequelize, Sequelize.DataTypes);
const ResumeTemplate = require('./ResumeTemplate')(sequelize, Sequelize.DataTypes);
const Partner = require('./Partner')(sequelize, Sequelize.DataTypes);

// Associations
Job.belongsTo(AdminUser, { foreignKey: 'created_by' });
AdminUser.hasMany(Job, { foreignKey: 'created_by' });

JobApplication.belongsTo(Job, { foreignKey: 'job_id', onDelete: 'CASCADE' });
Job.hasMany(JobApplication, { foreignKey: 'job_id' });

module.exports = {
  sequelize,
  Sequelize,
  AdminUser,
  SiteProfile,
  SocialLinks,
  Job,
  JobApplication,
  ResumeTemplate,
  Partner,
};
