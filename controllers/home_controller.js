const Post=require('../models/post');
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
Post.find({}).populate('user').exec(function(err,posts){
    console.log('inside populate');
    return res.render('home',{
        title:'codeial | Home',
        posts: posts,

    });
})


// res.render('home',{
//     title:'Home'
// });
}
//module.ecports.home=function(); to export this controller outside this file