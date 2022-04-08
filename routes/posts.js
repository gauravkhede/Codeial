const express=require('express');
const router= express.Router();
const postsController=require('../controllers/posts_controller');
const passport=require('passport');

// router.get('/',postsController.posts);
// router.post('/create',passport.checkAuthentication,postsController.create);
router.post('/create',passport.checkAuthentication,postsController.create);
    // res.render('home',{
    //     title:'ToDo_app',
    //     todo_list:todoList,

    // });

router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

module.exports=router;