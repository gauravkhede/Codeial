module.exports.home=function(req,res){
    // res.end('<h1> Express is up for codeial </h1>');
    res.render('home',{
        title:'Home'
    });
}
//module.ecports.home=function(); to export this controller outside this file