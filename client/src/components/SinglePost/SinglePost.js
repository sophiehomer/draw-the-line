import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { LIKE_POST, DELETE_POST, ADD_COMMENT } from '../../utils/mutations';
import { ADD_COMMENT_LIKE } from '../../utils/mutations'
import Header from '../Header/header'
import { FaHeart } from 'react-icons/fa'
import { Avatar } from "@chakra-ui/avatar"
import { BsDot } from 'react-icons/bs'

import './singlePost.css';

function SinglePost() {
    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    const userComments = data?.post?.comments || [];

    // Mutations
    const [addCommentLike] = useMutation(ADD_COMMENT_LIKE)
    const [addLike] = useMutation(LIKE_POST);
    const [addComment] = useMutation(ADD_COMMENT);
    const [deletePost] = useMutation(DELETE_POST)
    // const [deleteComment] = useMutation(DELETE_COMMENT)

    const [formStateComment, setFormStateComment] = useState({
        commentBody: '',
        postId: postId,
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
        await addComment({
            variables: { ...formStateComment },

        });
        window.location.reload();
    };

    // Like click function
    function likeClick() {
        addLike({ variables: { postId: userPost._id } })
        if (userPost.banMeter >= 0.6) {
            deletePost({ variables: { postId: userPost._id } })
            const deletedPost = document.getElementById('single-post-page');
            deletedPost.remove();
        }
    }

    return (
        <>
            <Header />
            <main id="single-post-page">
                <section className='single-page-discussion-post'>
                    <div className="avatarNameDateContainer">
                        <div className="avatarContainer"> 
                            <Avatar src="john-doe.png" name={userPost.username} />
                        </div>
                        <div className="nameDateContainer"> 
                            <h2 id="username-post">{userPost.username}</h2> 
                                <div className="dot"> 
                                    < BsDot />
                                </div>
                            <p className="postDateCreated">{userPost.createdAt}</p>
                        </div>
                    </div>
                    <div className="singlePagetitleAndPost">
                        <p id="single-post-userTitle-post">{userPost.postTitle}</p>
                        <p id="singlePagePostText"> {userPost.postText}</p>
                    </div>
                    <div id="likesAndCommments">
                        <form id='comment-form' onSubmit={handleFormSubmitComment}>
                            <input method="post" className='post-tile' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Leave a comment' />
                            <button className='post-button' id='postBtnComment'>Comment</button>
                            <div id='waringDivComment'></div>
                            {/* <button className='voteBtnClickable' onClick={likeClick}><FaHeart /></button>{userPost.likesLength} */}
                        </form>
                        {/* <div className='voteBtnClickableContainer'> */}
                        <button className='voteBtnClickable' onClick={likeClick}><FaHeart /></button>{userPost.likesLength}
                        {/* </div> */}

                    </div>
                </section>
                <section className='commentSection'>
                        {userComments && userComments.map((comment, index) => (
                         <section className='comments-container' key={index} id={index}>
                            <section className="avatarNameDateContainer">
                                <div className="avatarContainer"> 
                                    <Avatar src="john-doe.png" name={userPost.username} />
                                </div>
                                <div className="singleUsernameDate"> 
                                    <p className='commentUsername'>{comment.username} commented on {comment.createdAt}</p>
                                    <p className='commentDate'></p>
                                </div>                                    
                             </section>
                            <div className="postAndLikes"> 
                                <p id="commentText">{comment.commentBody}</p>
                                <button  className='commentVoteBtn' onClick={() => {
                                    addCommentLike({ variables: { commentId: comment._id } })
                                    }}>
                                    < FaHeart />
                                </button>
                                {comment.likesLength}
                            </div>    
                         </section>
                            ))}
                 </section>       
            </main>
        </>
    )
}

export default SinglePost;

