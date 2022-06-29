import Auth from "../../utils/auth";
import "./home.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME_BASIC, GET_USER_POSTS } from "../../utils/queries";
import Login from "../Login/login";
import Header from "../Header/header.js";
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import CreatePost from '../CreatePost/createPost'
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
import { BsDot } from 'react-icons/bs'


function Home() {
  const { data } = useQuery(QUERY_ME_BASIC);
  const { data: postQuery } = useQuery(GET_USER_POSTS);
  // user information
  const username = data?.me.username || "";
  // Post Info
  const postData = postQuery?.posts || [];

  // check if user is logged in
  const loggedIn = Auth.loggedIn();
  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <main id="loggedInView">
            <section class="welcomeandPostSection">
              <h1 className="welcomeText">Welcome, {username}!</h1>
              <div className="createPostDiv">
                <CreatePost />
              </div>
            </section>
           
          <section class="postsSectionHome">
              {postData.map((post, index) => (
                <div className="discussion-post" key={index}>
                  <div className="avatarNameDateContainer">
                    <div className="avatarContainer"> 
                    <Avatar src="john-doe.png" name={post.username} />
                    </div>
                    <div className="nameDateContainer"> 
                    <h2 id="username-post">{post.username}</h2> 
                    <div className="dot"> 
                    < BsDot />
                    </div>
                    <p className="postDateCreated">{post.createdAt}</p>
                    </div>
                  </div>
                  <div className="titleAndPost">
                    <h3 id="userTitle-post">
                      <Link to={`/Single-post/${post._id}`}>
                        {post.postTitle}
                      </Link>
                    </h3>

                    <div className="postAndLikes"> 
                    <p id="postText">{post.postText}</p>
                    <button className="voteBtn">
                      <FaHeart />
                    </button>
                    {post.likesLength}
                    </div>
                   
                  </div>
                
                  {/* <div id="likes-dislikes"> */}
                    {/* <button className="voteBtn">
                      <FaHeart />
                    </button>
                    {post.likesLength} */}
                  {/* </div> */}
                </div>
            ))}
          </section>
        </main>
        </>
      ) : (
        <>
          <div className="loginContainer">
            <Login />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
