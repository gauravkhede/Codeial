module.exports.profile=function(req,res){
    // res.end('<h1>USER PROFILE </h1>');
    res.render('users',{
        title:'users view'
    });
}
//module.exports.profile=function(); to export this controller outside this file