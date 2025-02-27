
module.exports = {
   up: (queryInterface, Sequelize)=> {

    /**
     * Add altering commands here.
     *
     * Example:
    */
   return queryInterface.createTable('contact', { 
    id: {
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  } ,
  firstName:{
    type:Sequelize.STRING
  },
  lastName:{
    type:Sequelize.STRING
  },
  email:{
    type:Sequelize.STRING
  },
  mobileNumber:{
    type:Sequelize.STRING
  },
  isStar:{
    type:Sequelize.BOOLEAN,
    defaultValue:false,
  },
  createdAt :{
    type:Sequelize.DATE,
    allowNull:false,
    defaultValue:Sequelize.NOW
  },
  updatedAt:{
    type:Sequelize.DATE,
    allowNull:false,
    defaultValue:Sequelize.NOW
  } 
});
  },

   down: (queryInterface, Sequelize)=> {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
     return queryInterface.dropTable('contact');
  }
};
