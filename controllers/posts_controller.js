const Post=require('../models/post');
const Comment=require('../models/comment');
//changes done for code Activity Solution
const Like=require('../models/like');
// module.exports.create=function(req,res){
//     Post.create({
//         content: req.body.content,
//         user:req.user._id,
//     },function(err,post){
//         if(err){ console.log('Error in creating a post'); return}
//         return res.redirect('back');
//     });
    
// }
//Using Async await
module.exports.create= async function(req,res){
    try{
        let post=await Post.create({
            content: req.body.content,
            user:req.user._id   
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'post created',
            });
        }
        //for flash message
        req.flash('success','Post Published!');
        return res.redirect('back');
        
    }catch(err){
        //for flash messages
        req.flash('error',err);
        console.log('Error',err);
        return res.redirect('back');
    }

}

//module.exports.posts=function(); to export this controller outside this file

// module.exports.destroy= function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         //.id means converting the object id into String and it is good for comparison
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post:req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

//using aynch await
module.exports.destroy= async function(req,res){
    try{
        let post= await Post.findById(req.params.id);
     //.id means converting the object id into String and it is good for comparison
     if(post.user == req.user.id){
         //changes done for code Activity Solution
         await Like.deleteMany({likeable: post,onModel:'Post'});
         await Like.deleteMany({_id: {$in:post.comments}});


        post.remove();
        await Comment.deleteMany({post:req.params.id});
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'Post Deleted!'
            });
        }

        //for flash message
        req.flash('success','Post and Associated comments deleted');
        return res.redirect('back');
    }else{
        //for flash messages
        req.flash('error','You cannot delete this post');
        return res.redirect('back');
    }
    }catch(err){
        //for flash messages
        req.flash('error',err);
        console.log('Error',err);
        return;
    }
    
}