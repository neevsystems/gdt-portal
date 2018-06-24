require('./config');     //instantiate configuration variables
require('./global_functions');  //instantiate global functions

console.log("Environment:", CONFIG.app)
const jwt           = require('jsonwebtoken');
const compression    = require('compression');
const helmet        = require('helmet');
const express 		= require('express');
const morgan 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const path          = require('path');
const routes        = require('./routes');
const app           = express();

var winston = require('./winston');
if(CONFIG.app==='dev'){
    app.use(morgan('dev'));

}else{
    app.use(morgan('combined', { stream: winston.stream }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet())
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());

//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err);
});
if(CONFIG.app==='dev'){
    models.sequelize.sync();//creates table if they do not already exist
   // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}
// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post('/login/callback',function  (req, res, next) {

  passport.authenticate('saml', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          let expiration_time = parseInt(CONFIG.jwt_expiration);
          const token =  jwt.sign({user_id:1}, CONFIG.jwt_encryption, {expiresIn: expiration_time});

          return res.redirect(`/ssohandler/${token}/${user.email}`);
      });
  })
  (req, res);

}
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/app', failureFlash: true }),
  function(req, res) {
    res.redirect('/app');
  }
);

app.use('/api', routes);
app.use('/documents', express.static(__dirname + '/documents'));
app.use('/documents/archived', express.static(__dirname + '/documents/archived'));
app.use('/app', express.static(path.join(__dirname, '../webapp/build/')));

app.use('/ServerError', express.static(path.join(__dirname, './pages/ServerError.html')));
app.use('/home/*', function(req, res){
	res.sendFile(path.join(__dirname, '../webapp/build/','index.html'))
});
app.use('/ssohandler/*', function(req, res){
	res.sendFile(path.join(__dirname, '../webapp/build/','index.html'))
});

app.use('/', function(req, res){
	res.redirect('/app');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.redirect('/home/servererror');
});

module.exports = app;