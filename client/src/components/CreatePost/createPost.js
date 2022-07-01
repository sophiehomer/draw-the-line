import Auth from '../../utils/auth';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';

// Style Import
import './createPost.css';

function CreatePost() {
    // Get basic info
    const { data: basic } = useQuery(QUERY_ME_BASIC);
    const username = basic?.me.username || '';

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

        if( window.location.toString().includes("heroku")) {
            console.log("hello")
            window.location.replace("https://drawtheline2022.herokuapp.com/");
           
        }   else {
            console.log("world")
            window.location.replace("http://localhost:3000/");
        }
     
    };
    const loggedIn = Auth.loggedIn();

    return (
        <> 
        {loggedIn ?
            <> 
                <form id='post-form' onSubmit={handleFormSubmit}>
                    <section className="writePostSection">
                        <input className="post-title" type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Subject' />

                        <div className="writePostDiv">
                        <input className="writePost" type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder="What's going on?"/>
                            <button className="postButton" id="post-btn">Post</button>
                        </div>
                    </section>
                </form>
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