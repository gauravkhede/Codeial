const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/user-signup',usersController.signUp);
router.get('/user-signin',usersController.signIn);
router.post('/create',usersController.create);
router.use('/posts',require('./posts'));



module.exports=router;