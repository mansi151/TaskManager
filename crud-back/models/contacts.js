
module.exports = (sequelize,DataTypes) => {
    const contacts = sequelize.define(
        'Contact',
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
            isStar:DataTypes.BOOLEAN,
            imageUrl:DataTypes.JSON
        },{
            tableName:'contact',
            timestamps : true,
        }
    );
    return contacts;
}