module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    'Job',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(220),
        allowNull: false,
        unique: true,
      },
      department: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      job_type: {
        type: DataTypes.ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'),
        allowNull: false,
        defaultValue: 'FULL_TIME',
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'CLOSED'),
        allowNull: false,
        defaultValue: 'DRAFT',
      },
      posted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'admin_users', key: 'id' },
      },
    },
    {
      tableName: 'jobs',
      timestamps: true,
    }
  );
  return Job;
};
