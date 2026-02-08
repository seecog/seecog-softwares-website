module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define(
    'JobApplication',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'jobs', key: 'id' },
        onDelete: 'CASCADE',
      },
      full_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(190),
        allowNull: false,
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      portfolio_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      resume_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      resume_original_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      resume_mime: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      resume_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'),
        allowNull: false,
        defaultValue: 'RECEIVED',
      },
      applied_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'job_applications',
      timestamps: true,
    }
  );
  return JobApplication;
};
