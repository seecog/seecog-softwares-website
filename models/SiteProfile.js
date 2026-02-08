module.exports = (sequelize, DataTypes) => {
  const SiteProfile = sequelize.define(
    'SiteProfile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(190),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
    },
    {
      tableName: 'site_profile',
      timestamps: true,
    }
  );
  return SiteProfile;
};
