'use strict';
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Document', {
        fileName    : DataTypes.STRING,
        fileFor     : DataTypes.STRING,
        fileFrom    : {type: DataTypes.STRING, allowNull: true},
        fileDesc    : {type: DataTypes.STRING, allowNull: true},
        filePath    : {type: DataTypes.STRING, allowNull: true},
    });

    return Model;
}