const User          = require('../models').User;
const authService   = require('./../services/AuthService');
const ldapService =require('../services/LdapService');

const createUser =  async function(req, res){
    const userInfo = req.body;
    userInfo.isEmployee = false;
    
    if(ldapService.add(userInfo)){
        [err, user] = await to(User.create(userInfo));
            if(err) { console.log(err);
                return ReE(res,'Unable to Create user');
            }
        return ReS(res, {message:'Successfully created new user.',user:user.toJSON()}, 201);
    }
    else{
        return ReE(res,'Unable to Create user');
    }   

}
module.exports.createUser = createUser;
const updateUser =  async function(req, res){

    const userInfo = req.body;
    userInfo.isEmployee = false;
     if(userInfo.id){
        [err, user] = await to(User.findById(userInfo.id));
        if(err || !user) return ReE(res,'Unable to find user');

        [err, user] = await to(user.update(userInfo));
        if(err) return ReE(res,'Unable to Update user');
        return ReS(res, {message:'Successfully updated new user.', user:user.toJSON()}, 201);
    }else{
        ReE(res,'can not update user without ID');
    }

}
module.exports.updateUser = updateUser;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;

const getall = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let users,err;
    [err, users] = await to(User.findAll());
    if(err)
        return ReE(res, err, 422);
    else
        return ReS(res, {users:users}, 200);
}
module.exports.getall = getall;

const getSingleUser = async function(req, res){
    res.setHeader('Content-Type', 'application/json');    
    let user,err;
    [err, user] = await to(User.findOne({where:{id:req.params.id}}));
    if(err)
        return ReE(res, err, 422);
    else
        return ReS(res, {user:user}, 200);
}
module.exports.getuser = getSingleUser;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;

    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);
    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;

// ldap functionality
const addldapUser= async function (user){
    
   await ldapService.add();
}
// ldap