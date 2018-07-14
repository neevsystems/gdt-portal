const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Customer', {
        customerName    : DataTypes.STRING,
        isCustomer :DataTypes.BOOLEAN,
        isComplaince:DataTypes.BOOLEAN
    });

    Model.associate = function(models){
        this.TestUsers = this.hasMany(models.TestUsers, {foreignKey: 'customerId', as: 'TestUsers'});
        
    }
    

    return Model;

   
}