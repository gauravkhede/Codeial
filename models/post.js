const mongoose= require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //include the array  of ids of all comments in this post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
},{
        timestamps:true,
    }
);

const Post =mongoose.model('Post',postSchema);
postSchema.pre(Post.find({}),function(next){
    this.populate({
        path:'comments',
        populate:[{
            path:'user',
            select:'name',
        },]
    })
    next();

}
)

module.exports = Post;