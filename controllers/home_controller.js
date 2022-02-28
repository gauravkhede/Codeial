const Post=require('../models/post');
const User=require('../models/users');
module.exports.home=function(req,res){

    // res.end('<h1> Express is up for codeial </h1>');
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // res.cookie('something','blah');
// Post.find({},function(err,posts){
//    return res.render('home',{
//         title:'Home',
//         posts: posts,

//     });
//populate the user for each post.
Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user',
    }
})
.exec(function(err,posts){
    User.find({},function(err,users){
        return res.render('home',{
            title:'codeial | Home',
            posts: posts,
            all_users:users,
    
        });
    });
    // console.log('inside populate');
    
})


// res.render('home',{
//     title:'Home'
// });
}
//module.ecports.home=function(); to export this controller outside this file