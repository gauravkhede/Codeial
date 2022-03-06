const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){

    
        //populate the user for each post.
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
            });

    return res.json(200,{
        message:'list of posts',
        posts:posts
    });
}

//using aynch await
module.exports.destroy= async function(req,res){
    try{
        let post= await Post.findById(req.params.id);
     //.id means converting the object id into String and it is good for comparison
     if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        // if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post_id:req.params.id
        //         },
        //         message:'Post Deleted!'
        //     });
        // }

        //for flash message
        // req.flash('success','Post and Associated comments deleted');
        return res.status(200).json({
            message:'post and associated comments deleted successfully'
        });
    }else{
        // for flash messages
        // req.flash('error','You cannot delete this post');
        return res.status(401).json({
            message: 'you cannot delete this post',
        });
    }
    }catch(err){
        //for flash messages
        // req.flash('error',err);
        return res.status(500).json({
            message:'Internal Server Error',
        });
    }
    
}