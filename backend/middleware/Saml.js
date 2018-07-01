const SamlStrategy  = require('passport-saml').Strategy;
const fs            = require('fs');
const path          = require('path');
const authService   = require('./../services/AuthService');

module.exports = new SamlStrategy(
    {
      callbackUrl: `${CONFIG.envURL}/login/callback`,
      entryPoint: CONFIG.saml_entryPoint,
      issuer: CONFIG.envURL,
      forceAuthn: true,
      logoutUrl:CONFIG.saml_logout_url,
      logoutCallbackUrl: `${CONFIG.envURL}/logout/callback`,
      cert: fs.readFileSync(path.join(__dirname, '../../certificates/SAML.cert'), 'utf-8')
    },
    async function(profile, done) {
        console.log('(((ID',profile.nameID);
        let err, user;
        [err, user] = await to(authService.authSSOUser(profile.nameID));

        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }
  )