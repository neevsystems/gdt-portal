const express 			= require('express');
const router 			= express.Router();


const UserController 	= require('./controllers/UserController');
const HomeController 	= require('./controllers/HomeController');
const FileExchangeController=require('./controllers/FileExchange');
const CalenderController=require('./controllers/CalenderController');

const passport      	= require('passport');
const path              = require('path');


require('./middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/users',           UserController.create);
router.get(     '/allusers',        UserController.getall);
// passport.authenticate('jwt', {session:false})                                            // C
router.get(     '/users',            UserController.get);        // R
router.put(     '/users',            UserController.update);     // U
router.delete(  '/users',            UserController.remove);     // D

router.post('/fileupload',  FileExchangeController.uploadFiles);
router.get('/alldocuments',  FileExchangeController.getall);
router.post(    '/users/login',     UserController.login);

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)

router.get(     '/allevents',         CalenderController.getall);

module.exports = router;
