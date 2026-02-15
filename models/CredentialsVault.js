module.exports = (sequelize, DataTypes) => {
  const CredentialsVault = sequelize.define(
    'CredentialsVault',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content_encrypted: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      reset_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reset_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'credentials_vault',
      timestamps: true,
    }
  );
  return CredentialsVault;
};
