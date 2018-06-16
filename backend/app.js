require('./config');     //instantiate configuration variables
require('./global_functions');  //instantiate global functions

console.log("Environment:", CONFIG.app)

const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const path          = require('path');
const routes        = require('./routes');
const app           = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

app.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/ServerError', failureFlash: true }),
  function(req, res) {
    //console.log('HERE2',req.body);
  
    res.redirect('/home/ssosucess/#TEST12');
  }
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/app', failureFlash: true }),
  function(req, res) {
    res.redirect('/app');
  }
);

app.use('/api', routes);
app.use('/home/', express.static(path.join(__dirname, '../webapp/build/')));
app.use('/ServerError', express.static(path.join(__dirname, './pages/ServerError.html')));


app.use('/', function(req, res){
	res.redirect('/home');
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
  console.log(err.message);
  res.redirect('/home/ServerError');
});

module.exports = app;