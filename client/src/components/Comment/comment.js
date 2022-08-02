import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { LIKE_POST, DELETE_POST, ADD_COMMENT } from '../../utils/mutations';
import { ADD_COMMENT_LIKE } from '../../utils/mutations'
import { FaHeart } from 'react-icons/fa'
import './comment.css';


function Comment({post_id, isProfile}) {
    console.log(isProfile)
    let postId;
    const { id } = useParams()  
    console.log(useParams())
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId || post_id },
    });
    console.log(postId);
    const userPost = data?.post || [];
    console.log(userPost)
    const userComments = data?.post?.comments || [];
    console.log(userComments)

    // Mutations
    const [addCommentLike] = useMutation(ADD_COMMENT_LIKE);
    const [addLike] = useMutation(LIKE_POST);
    const [addComment] = useMutation(ADD_COMMENT);
    const [deletePost] = useMutation(DELETE_POST);
    // const [deleteComment] = useMutation(DELETE_COMMENT)

    const [formStateComment, setFormStateComment] = useState({
        commentBody: '',
        postId: postId || post_id,
    });

    const handleChangeComment = (event) => {
        let { name, value } = event.target;

        setFormStateComment({
            ...formStateComment,
            [name]: value,
        });
    };

    const handleFormSubmitComment = async (event) => {
        event.preventDefault();
        console.log(formStateComment);
        console.log(post_id)
        console.log(userComments)
        await addComment({
            variables: { ...formStateComment },

        });
        window.location.reload();
    };

    // Like click function
    function likeClick() {
        console.log('hello')
            addLike({ variables: { postId: userPost._id } })
            if (userPost.banMeter >= 0.6) {
                deletePost({ variables: { postId: userPost._id } })
                const deletedPost = document.getElementById('single-post-page');
                deletedPost.remove();
            }
       
       
    }

    return (
        <>
            <section className="comment__section" id="single-post-page">
                <section className='single-page-discussion-post'>
                    <div id="likesAndCommments">
                        <form id='comment-form' onSubmit={handleFormSubmitComment}>
                            <input method="post" className='post-tile' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Leave a comment' />
                            <button className='post-button' id='postBtnComment'>Comment</button>
                            <div id='waringDivComment'></div>
                        </form>
                        <button className='voteBtnClickable' onClick={likeClick}><FaHeart /></button>{userPost.likesLength}

                    </div>
                </section>
                <section className='commentSection'>
                        {userComments && userComments.map((comment, index) => (
                         <section className='comments-container' key={index} id={index}>
                                <div className="singleUsernameDate"> 
                                    <p className='commentUsername'>{comment.username} commented on {comment.createdAt}</p>
                                    <p className='commentDate'></p>
                                </div> 
                            <div className="postAndLikes"> 
                            <p id="commentText">{comment.commentBody}</p>   
                            <div className="likeButtonContainer">
                            <button  className='commentVoteBtn' onClick={() => {
                                    addCommentLike({ variables: { commentId: comment._id } })
                                    }}>
                                    < FaHeart />
                                </button>
                                {comment.likesLength}
                            </div>                                
                              
                            </div>    
                         </section>
                            ))}
                 </section>       
            </section>
        </>
    )
}

export default Comment;

