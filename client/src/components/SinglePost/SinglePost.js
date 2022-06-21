import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST, ADD_COMMENT } from '../../utils/mutations';
import { ADD_COMMENT_LIKE, ADD_COMMENT_DISLIKE, DELETE_COMMENT } from '../../utils/mutations'
import likeSound from '../../assets/sounds/like-sound.wav';
import dislikeSound from '../../assets/sounds/dislike-sound.wav';
import Header from '../Header/header'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'

import './singlePost.css';

function SinglePost() {
    // censor filter
    // Bad word Filter
    var Filter = require('bad-words'),
        filter = new Filter();
    filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')
    // sound functions
    const likeSoundNoise = new Audio(likeSound);
    likeSoundNoise.loop = false;
    likeSoundNoise.volume = 0.3;
    const dislikeSoundNoise = new Audio(dislikeSound);
    dislikeSoundNoise.loop = false;
    dislikeSoundNoise.volume = 0.3;


    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    const userComments = data?.post?.comments || [];

    // Mutations
    const [addCommentLike] = useMutation(ADD_COMMENT_LIKE)
    const [addCommentDislike] = useMutation(ADD_COMMENT_DISLIKE)
    const [addDislike] = useMutation(DISLIKE_POST);
    const [addLike] = useMutation(LIKE_POST);
    const [addComment] = useMutation(ADD_COMMENT);
    const [deletePost] = useMutation(DELETE_POST)
    const [deleteComment] = useMutation(DELETE_COMMENT)

    const [formStateComment, setFormStateComment] = useState({
        commentBody: '',
        postId: postId,
    });

    const handleChangeComment = (event) => {
        let { name, value } = event.target;
        // Booleans to keep name and value state
        let cleanName;
        let cleanText;
        // Censor postText
        if (value && !value.match(/^[*]{1,}/)) {
            value = filter.clean(value)
            if (value.match(/([*]{3,})/g)) {
                cleanText = false;
            } else {
                cleanText = true
            }
        }
        // Censor postTitle
        if (name && !name.match(/^[*]{1,}/)) {
            name = filter.clean(name)
            if (name.match(/([*]{3,})/g)) {
                cleanName = false
            } else {
                cleanName = true
            }
        }
        // Get html elements and check their values to render html elements
        const postBtn = document.getElementById('postBtnComment')
        // const warningDiv = document.getElementById('warningDivComment');
        if (cleanName && cleanText) {
            // warningDiv.innerHTML = '';
            postBtn.disabled = false;
        } else {
            // warningDiv.innerHTML = 'Keep it friendly';
            postBtn.disabled = true;
        }
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
    // Dislike  click function
    function dislikeClick() {
        addDislike({ variables: { postId: userPost._id } });
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
                    <div className="nameDateDiv">
                        <p id="username-post">{userPost.username}</p>
                        <p id="single-post-date">{userPost.createdAt}</p>
                    </div>
                        <p id="single-post-userTitle-post">{userPost.postTitle}</p>
                        <p id="postText"> {userPost.postText}</p>
                        <div id="single-page-likes-dislikes">
                            {userPost.likesLength}<button className='voteBtnClickable' onClick={likeClick}><AiOutlineLike /></button>
                            {userPost.dislikesLength}<button className='voteBtnClickable' onClick={dislikeClick}><AiOutlineDislike /></button>
                        </div>
                        <form id='comment-form' onSubmit={handleFormSubmitComment}>
                            <input method="post" className='post-tile' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Leave a comment...' />
                                <button className='post-button' id='postBtnComment'>Post</button>
                                <div id='waringDivComment'></div>
                        </form>
                    </section>
                    <section className='commentSection'>
                        {userComments && userComments.map((comment, index) => (
                                <section className='comments-container' key={index} id={index}>
                                    <p className='commentUsername'>{comment.username} commented on {comment.createdAt}</p>
                                    <p className='commentDate'></p>
                                    <p className='commentBody'>{comment.commentBody}</p>

                                  <div className="commentLikesContainer">
                                    {comment.likesLength
                                    }<button  className='voteBtn' onClick={() => {
                                        addCommentLike({ variables: { commentId: comment._id } })
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }}}>
                                        <AiOutlineLike />
                                    </button>
                                    {comment.dislikesLength}
                                    <button className='voteBtn' onClick={() => {
                                        addCommentDislike({ variables: { commentId: comment._id } });
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }}}>
                                        <AiOutlineDislike />
                                    </button>
                                    </div>
                                </section>
                            ))}
                    </section>
                            
            </main>
        </>
    )
}

export default SinglePost;

