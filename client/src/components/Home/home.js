import Auth from '../../utils/auth';
import './home.css'
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, GET_USER_POSTS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Login from '../Login/login';
import Header from '../Header/header.js';

// import { AiOutlineDown } from 'react-icons/ai';
import Accordion from 'react-bootstrap/Accordion';

function Home() {
    const { data } = useQuery(QUERY_ME_BASIC);
    const { data: postQuery } = useQuery(GET_USER_POSTS);
    // user information
    const username = data?.me.username || '';
    // Post Info
    const postData = postQuery?.posts || [];

    // check if user is logged in
    const loggedIn = Auth.loggedIn()
    return (
        <>
            {loggedIn ?
                <>
                    <Header />
                    <section id="loggedInView">
                    <h2 className="welcomeText">Welcome, {username}!</h2>                        
                        {postData.map((post, index) =>
                        (  
                            //  <Accordion key={index}>
                            // <Accordion.Item eventKey="0">
                            <section className="discussion-post" key={index}>
                            {/* <Accordion.Header> */}
                            <div className="accordionHeaderDiv"> 
                            <h4 id="userTitle-post"><Link to={`/Single-post/${post._id}`}>{post.postTitle}</Link></h4>
                            <h3 id="username-post">{post.username}</h3>
                            <p>{post.createdAt}</p>
                            </div>    
                                {/* </Accordion.Header>
                                <Accordion.Body> */}
                                <p id="postText">{post.postText}</p>
                                <div className="likesBanMeterDiv">
                                <div id="likes-dislikes">
                                    {post.likesLength}<a className='voteBtn'>  👍</a>
                                    {post.dislikesLength}<a className='voteBtn'>  👎</a>
                                </div>
                                <p id="ban-meter-p">Ban Meter
                                    <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter}</progress>
                                </p>
                                </div>
                                {/* </Accordion.Body> */}
                            </section>
                            // </Accordion.Item>
                            // </Accordion>
                        ))}
                        {/* <button id="logoutBTN" onClick={() => Auth.logout()}>Logout</button> */}
                    </section>
                </>
                :
                <>
                     <div className="loginContainer">
                        <Login />
                    </div>
                </>


            }
        </>
    )
}

export default Home;