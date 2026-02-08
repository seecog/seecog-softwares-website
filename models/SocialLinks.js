module.exports = (sequelize, DataTypes) => {
  const SocialLinks = sequelize.define(
    'SocialLinks',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      facebook_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      whatsapp_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      twitter_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'social_links',
      timestamps: true,
    }
  );
  return SocialLinks;
};
