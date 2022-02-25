const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/user-signup',usersController.signUp);
router.get('/user-signin',usersController.signIn);
router.post('/create',usersController.create);
router.use('/posts',require('./posts'));
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    { failureRedirect:'/users/user-signout' },
) ,usersController.createSession);
router.get('/sign-out',usersController.destroySession);

module.exports=router;