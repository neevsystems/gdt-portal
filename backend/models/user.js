'use strict';
//const bcrypt 			= require('bcrypt');
//const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {
        title         : DataTypes.STRING,
        firstName     : DataTypes.STRING,
        middleName    : DataTypes.STRING,
        lastName      : DataTypes.STRING,
        userName      : DataTypes.STRING,
        passphrase    : DataTypes.STRING,
        password      : DataTypes.STRING,
        userStatus    : {type:DataTypes.BOOLEAN,defaultValue: true},
        email         : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "Email id invalid."} }},
        businessPhone : {type: DataTypes.STRING, allowNull: true, unique: true },
        mobilePhone      : {type: DataTypes.STRING, allowNull: true, unique: true },
        homeMobile    : {type: DataTypes.STRING, allowNull: true, unique: true},
        emailNotifications: {type:DataTypes.BOOLEAN,defaultValue: false},
        ticketRequester:{type:DataTypes.BOOLEAN,defaultValue: false},
        notifierOnly :{type:DataTypes.BOOLEAN,defaultValue: false},       
        roles    : DataTypes.STRING,
        company:DataTypes.STRING,
        envronment:DataTypes.STRING,
        userType: DataTypes.STRING,
        loginUserCompanyId: DataTypes.INTEGER
    });

     /* Model.associate = function(models){
        this.Companies = this.belongsToMany(models.Company, {through: 'UserCompany'});
    }; */
 
   /* Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });
*/
    Model.prototype.comparePassword = async function (pw) {
       /* let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');
*/
        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };
    Model.prototype.fetchAll=function(){
      return Model.findAll();
    }

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};