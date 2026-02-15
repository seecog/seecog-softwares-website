module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define(
    'Visit',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ip: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      page_path: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: 'visits',
      timestamps: true,
      updatedAt: false,
    }
  );
  return Visit;
};
