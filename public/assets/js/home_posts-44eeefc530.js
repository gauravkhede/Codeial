{(function(){let o=$("#new-post-form");o.submit((function(n){n.preventDefault(),console.log("*******************"),$.ajax({type:"post",url:"/posts/create",data:o.serialize(),success:function(o){console.log(o);let n=t(o.data.post);console.log("success2"),$("#posts-list-container>ul").prepend(n),e($(" .delete-post-button",n)),console.log("success3"),new PostComments(o.data.post._id),new ToggleLike($(" .toggle-like-button",n)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responeText)}})}))})();let t=function(t){return $(`<li id="post-${t._id}">\n        <p>\n                \n                <small> ${t.user.name} : through AJAX<br></small>\n                ${t.content}\n        </p>\n        <div class="post-comments">\n               \n                        <form action="/comments/create" method="POST">\n                                <input type="text" name="content" placeholder="type here to add comment">\n                                <input type="hidden" name="post" value="${t._id}">\n                                <input type="submit" value="Add Comment">\n    \n                        </form>\n                        \n                        \n                        <small>\n                        \n                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">0 Like</a>\n                                <a class="delete-post-button" href="/posts/destroy/${t._id}">Delete</a>\n                        </small>\n                        \n    <div class="post-comments-list">\n    <ul id="post-comments-${t._id}">\n    \n        \n    </ul>        \n    </div>\n        </div>\n    </li>`)},e=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))};(function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),o=$(" .delete-post-button",t);e(o);let n=t.prop("id").split("-")[1];new PostComments(n)}))})()}