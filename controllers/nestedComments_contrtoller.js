const Comment=require('../models/comment');
const NestedComment=require('../models/nestedComment');



module.exports.create=function(req,res){
    let comment= Comment.findById(req.body.comment);
}