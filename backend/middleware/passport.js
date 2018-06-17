const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const SamlStrategy  = require('passport-saml').Strategy;
const fs            = require('fs');
const path          = require('path');
const User          = require('../models').User;
const authService   = require('./../services/AuthService');
module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });

    passport.use(new SamlStrategy(
        {
          path: '/login/callback',
          entryPoint: CONFIG.entryPoint,
          issuer: CONFIG.issuer,
          cert: fs.readFileSync(path.join(__dirname, '../../certificates/SAML.cert'), 'utf-8')
        },
        async function(profile, done) {
            let err, user;
            [err, user] = await to(authService.authSSOUser(profile.nameID));
    
            if(err) return done(err, false);
            if(user) {
                return done(null, user);
            }else{
                return done(null, false);
            }
        }
      ));

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){

        let err, user;
        [err, user] = await to(User.findById(jwt_payload.user_id));

        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}