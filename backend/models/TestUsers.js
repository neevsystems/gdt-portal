const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('TestUsers', {
        userName    : DataTypes.STRING,
        customerId :DataTypes.INTEGER,
        role:DataTypes.STRING,
        email:DataTypes.STRING
    });
    return Model;
}