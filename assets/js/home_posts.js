{
    // console.log('Hello');
    //method to submit the form data for new past using ajax
    let createPost= function(){
                let newPostForm= $('#new-post-form');
                newPostForm.submit(function(e){
                    e.preventDefault();
                    $.ajax({
                        type:'post',
                        url:'/posts/create',
                        data:newPostForm.serialize(),
                        success: function(data){
                            console.log(data);
                            let newPost=newPostDom(data.data.post);
                            // console.log('success2');
                            $("#posts-list-container>ul").prepend(newPost);
                            deletePost($(' .delete-post-button',newPost)); 
                            // console.log('success3');

                        },error:function(error){
                            console.log(error.responeText);
                        }
                    });
                    
                });
    }
    //Method to create a post in DOM
    let newPostDom= function(post){
        return $(`<li id="post-${ post._id}">
        <p>
                <small> ${ post.user.name } : <br></small>
                ${ post.content }
        </p>
        <div class="post-comments">
               
                        <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="type here to add comment">
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Add Comment">
    
                        </form>
                        
                        
                        <small>
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

                },error:function(error){
                    console.log(error.responseText);
                }
            });
        })
    }
    
    createPost();

    //method to create the comment using ajax
    let createComment= function(){
        let newComment= $(`post-comments-${ post._id }`);
        newComment.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newComment.serialize(),
                success: function(data){
                    console.log(data);
                    // let newPost=newPostDom(data.data.post);
                    // console.log('success2');
                    // $("#posts-list-container>ul").prepend(newPost);
                    // deletePost($(' .delete-post-button',newPost)); 
                    // console.log('success3');

                },error:function(error){
                    console.log(error.responeText);
                }
            });
            
        });
}
 createComment();    
}