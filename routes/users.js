const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/user-signup',usersController.signUp);
router.get('/user-signin',usersController.signIn);
router.post('/create',usersController.create);
router.use('/posts',require('./posts'));
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    { failureRedirect:'back' },
) ,usersController.createSession);
router.get('/sign-out',usersController.destroySession);

module.exports=router;