module.exports = (sequelize,DataTypes) => {
    const users = sequelize.define(
        'User',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
             },
             firstName:DataTypes.STRING,
             lastName:DataTypes.STRING,
             email:DataTypes.STRING,
             mobileNumber : DataTypes.STRING,
             password:DataTypes.STRING
        },
        {
            tableName:'users',
            timestamps:true
        }
    );
    return users;
}