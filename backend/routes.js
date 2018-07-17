const express 			= require('express');
const router 			= express.Router();


const UserController 	= require('./controllers/UserController');
const HomeController 	= require('./controllers/HomeController');
const FileExchangeController=require('./controllers/FileExchange');
const CalenderController=require('./controllers/CalenderController');
const CustomerController=require('./controllers/CustomerController');
const DashboardController=require('./controllers/DashboardController');
const TestUsersController=require('./controllers/TestUserController')

const passport      	= require('passport');
const path              = require('path');


require('./middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/user',           UserController.createUser);
router.get(     '/allusers',        UserController.getall);
// passport.authenticate('jwt', {session:false})                                            // C
router.get(     '/users',            UserController.get);        // R

router.get(     '/user/:id',            UserController.getuser);
//router.put(     '/users',            UserController.update);     // U

router.put(     '/users',            UserController.updateUser);     // U
router.delete(  '/users',            UserController.remove);     // D
router.get('/getenvronments/:sysid',UserController.getEnvronments)
router.get('/getcompanies/:eid',UserController.getCompanies)
router.post('/fileupload',  FileExchangeController.uploadFiles);
router.get('/archivefile/:id',  FileExchangeController.archiveFile);
router.get('/alldocuments',  FileExchangeController.getall);

router.get('/alldocumentsbyuser/:ffor/:ffrom',  FileExchangeController.getallbyuser);
router.get('/downloadFile/:fid', FileExchangeController.downloadFile);
router.post(    '/users/login',     UserController.login);

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)

router.get(     '/allevents',         CalenderController.getSNOWChangeEvents);
router.get(     '/allcustomers',         CustomerController.getall);

router.get(     '/openTickets/:eid',         DashboardController.openTickets);
router.get(     '/resolvedTickets/:eid',     DashboardController.resolvedTickets);

router.get(     '/getuserAccessdetails/:eid', TestUsersController.getUserAccessDetails);



module.exports = router;
