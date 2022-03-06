module.exports.index=function(req,res){
    return res.json(200,{
        message:'list of version 2 posts',
        posts:[],
    });
}