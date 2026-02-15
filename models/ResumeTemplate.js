module.exports = (sequelize, DataTypes) => {
    const ResumeTemplate = sequelize.define('ResumeTemplate', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        technologies: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        }
    }, {
        tableName: 'resume_templates',
        timestamps: true
    });

    return ResumeTemplate;
};
