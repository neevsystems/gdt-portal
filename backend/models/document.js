'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Document', {
        fileName    : DataTypes.STRING,
        fileFor     : DataTypes.STRING,
        fileFrom    : {type: DataTypes.STRING, allowNull: true},
        fileDesc    : {type: DataTypes.STRING, allowNull: true},
        filePath    : {type: DataTypes.STRING, allowNull: true},
        isArchived  : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    });    
    return Model;
}