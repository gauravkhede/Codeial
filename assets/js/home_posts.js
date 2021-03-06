{
    // console.log('Hello');
    //method to submit the form data for new past using ajax
    // console.log(PostComments,'is PostComments');
    // console.log('1');
    let createPost= function(){
                let newPostForm= $('#new-post-form');
                
                newPostForm.submit(function(e)
                {
                    e.preventDefault();
                    console.log('*******************');
                    $.ajax({
                        type:'post',
                        
                        url:'/posts/create',
                        data:newPostForm.serialize(),
                        success: function(data){
                            console.log(data);
                            let newPost=newPostDom(data.data.post);
                            console.log('success2');
                            $("#posts-list-container>ul").prepend(newPost);
                            deletePost($(' .delete-post-button',newPost)); 
                            console.log('success3');
                            //call the create comment class
                            new PostComments(data.data.post._id);

                            // CHANGE :: enable the functionality of the toggle like button on the new post
                            new ToggleLike($(' .toggle-like-button', newPost));

                            new Noty({
                                theme: 'relax',
                                text: "Post published!",
                                type: 'success',
                                layout: 'topRight',
                                timeout: 1500
                                
                            }).show();

                        },error:function(error){
                            console.log(error.responeText);
                        }
                    });
                    
                });
    }
    createPost();

    //Method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${ post._id}">
        <p>
                
                <small> ${ post.user.name } : through AJAX<br></small>
                ${ post.content }
        </p>
        <div class="post-comments">
               
                        <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="type here to add comment">
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Add Comment">
    
                        </form>
                        
                        
                        <small>
                        
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">0 Like</a>
                                <a class="delete-post-button" href="/posts/destroy/${ post._id }">Delete</a>
                        </small>
                        
    <div class="post-comments-list">
    <ul id="post-comments-${ post._id }">
    
        
    </ul>        
    </div>
        </div>
    </li>`);
    }

    //Method to delete a post from DOM
    let deletePost= function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${ data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show(); 

                },error:function(error){
                    console.log(error.responseText);
                }
            });
        })
    }
    
    
//     //method to create the comment using ajax
//     let createComment= function(post){
//         let newComment= $(`post-comments-${post._id}`);
//         newComment.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/comments/create',
//                 data:newComment.serialize(),
//                 success: function(data){
//                     console.log(data);
//                     // let newPost=newPostDom(data.data.post);
//                     // console.log('success2');
//                     // $("#posts-list-container>ul").prepend(newPost);
//                     // deletePost($(' .delete-post-button',newPost)); 
//                     // console.log('success3');

//                 },error:function(error){
//                     console.log(error.responeText);
//                 }
//             });
            
//         });
// }
// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1];
        new PostComments(postId);
        
    });
}
convertPostsToAjax();
//  createComment();    
}