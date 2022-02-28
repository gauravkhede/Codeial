const User=require('../models/users');
module.exports.profile=function(req,res){
    // res.end('<h1>USER PROFILE </h1>');
    User.findById(req.params.id,function(err,user){
        res.render('users',{
            title:'users view',
            profile_user:user,
        });
    });
    
}
//module.exports.profile=function(); to export this controller outside this file
//for signUp
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('users_sign_up',{
        title:'users | sign Up',
    });
}
//for signIn
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('users_sign_in',{
        title:'users | sign in',
    });
}
//get the signup data
module.exports.create=function(req,res){
    //TODO later
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({ email:req.body.email},function(err,user){
        if(err){ console.log('error in findng user in signing in'); return }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){ console.log('error in creating user while signing up'); return }
                return res.redirect('/users/user-signin');
            });
        }else{
            // console.log('email already present');
            return res.redirect('back');
        }
    });
}
//sign in and create session for user
module.exports.createSession=function(req,res){
    //TODO later
    console.log('create session called');
    return res.redirect('/');
}
//for signout
module.exports.destroySession= function(req,res){
    req.logout();
    return res.redirect('/');
}