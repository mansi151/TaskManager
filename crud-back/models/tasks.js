module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM('pending', 'inProgress', 'completed'),
                defaultValue: 'pending',
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: 'tasks',
            timestamps: true
        }
    );

    return Task;
};
