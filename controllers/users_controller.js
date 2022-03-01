const User=require('../models/users');
//isko async await krne ki jarurat nahi hai 1 hi callback function hai.
module.exports.profile=function(req,res){
    // res.end('<h1>USER PROFILE </h1>');
    User.findById(req.params.id,function(err,user){
        res.render('users',{
            title:'users view',
            profile_user:user,
        });
    });
    
}
//to update user profile
module.exports.update=function(req,res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('UnAuthorized');
    }
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
    req.flash('success','LoggedIn successfully');
    //TODO later
    // console.log('create session called');
    return res.redirect('/');
}
//for signout
module.exports.destroySession= function(req,res){
    
    req.logout();
    req.flash('success','You have logged Out Successfully');
    return res.redirect('/');
}