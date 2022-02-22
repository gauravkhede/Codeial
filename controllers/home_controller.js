module.exports.home=function(req,res){
    // res.end('<h1> Express is up for codeial </h1>');
    console.log(req.cookies);
    res.cookie('user_id',25);
    // res.cookie('something','blah');
    res.render('home',{
        title:'Home'
    });
}
//module.ecports.home=function(); to export this controller outside this file