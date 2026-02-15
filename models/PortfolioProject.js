module.exports = (sequelize, DataTypes) => {
  const PortfolioProject = sequelize.define(
    'PortfolioProject',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      modules: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      technology_stack: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'portfolio_projects',
      timestamps: true,
    }
  );
  return PortfolioProject;
};
