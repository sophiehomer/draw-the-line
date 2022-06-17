import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_POST, } from '../../utils/mutations';
import { QUERY_ME, QUERY_ME_BASIC } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';
import Header from '../Header/header.js';

// Style Import
import Accordion from 'react-bootstrap/Accordion';
import './createPost.css';

// Sound Imports
import postSound from '../../assets/sounds/postSound.wav';
import deleteSound from '../../assets/sounds/delete-sound.wav';

// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();
    filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')




function CreatePost() {

    // Sound function for post
    const postSoundNoise = new Audio(postSound);
    postSoundNoise.loop = false;
    postSoundNoise.volume = 0.5;

    // Sound function for Delete
    const deleteSoundNoise = new Audio(deleteSound);
    deleteSoundNoise.loop = false;
    deleteSoundNoise.volume = 0.5;

    // Get basic info
    const { data: basic } = useQuery(QUERY_ME_BASIC);
    const username = basic?.me.username || '';
    // Get user's information
    const { data } = useQuery(QUERY_ME);
    const userPosts = data?.me.posts || [];

    const [deletePost] = useMutation(DELETE_POST)
    // set up state variables for comment section
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username
      });
      
      const [addPost] = useMutation(ADD_POST);
    // Save users posts in a state variable
    const handleChange = (event) => {
        let { name, value } = event.target;
        // Booleans to keep name and value state
        let cleanName;
        let cleanText;
        // Censor postText
        if (value && !value.match(/^[*]{1,}/)){
            value = filter.clean(value)
            if (value.match(/([*]{3,})/g)) {
                cleanText = false;
            } else {
                cleanText = true
            }
        }
        // Censor postTitle
        if (name && !name.match(/^[*]{1,}/)){
            name = filter.clean(name)
            if (name.match(/([*]{3,})/g)) {
                cleanName = false
            } else {
                cleanName = true
            }
        }
        // Get html elements and check their values to render html elements
        const postBtn = document.getElementById('post-btn')
        const warningDiv = document.getElementById('bad-words-warning');
        if (cleanName && cleanText) {
            warningDiv.innerHTML = '';
             postBtn.disabled = false;
        } else {
            warningDiv.innerHTML = 'Keep it friendly';
            postBtn.disabled = true;
        }
        setFormState({
        ...formState,
        [name]: value,
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await addPost({
            variables: { ...formState },
        });
        // setUsersPosts(userPosts)
        // window.location.reload(false);
        window.location.replace("http://localhost:3000/");

    };
    const loggedIn = Auth.loggedIn();

    return (
        <> 
        {loggedIn ?
            <>  
           <Header />
           <h2 className='welcomeText'>Create a Post</h2>
           <main className="createPostPage">
                <form id='post-form' onSubmit={handleFormSubmit}>
                    <section className="writePostSection">
                        <input className="post-title" type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Title' />

                        <div className="writePostDiv">
                        <input className="writePost" type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Share your thoughts...' />
                            <button className="postButton" id="post-btn">Post</button>
                        </div>
                        <div id="bad-words-warning"></div>
                    </section>
                </form>
                </main>
                </> 
                :
                <>
                <p>You need to login to see this page</p>
                </>
            }
            
        </>
     )
    
}
export default CreatePost;