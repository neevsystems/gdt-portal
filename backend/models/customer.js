const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Customer', {
        customerName    : DataTypes.STRING
        
    });
    return Model;
}