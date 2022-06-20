import Auth from "../../utils/auth";
import { useParams, Link } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import { useQuery} from "@apollo/client";
import "./profile.css";
import Header from "../Header/header.js";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";

function Profile() {
  // get ID and query a user's info
  const { id: userId } = useParams();
  const { data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  });

  // Get username and friends
  const userInfo = data?.user || [];
  const userPosts = data?.user.posts || [];
  const userFriends = data?.user.friends || [];

  const loggedIn = Auth.loggedIn();
  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <h1 className="profileName">{userInfo.username}</h1>
          <main className="profilePage">
            <section className="postsSection">
              {userPosts.map((post, index) => (
                <section className="profile-discussion-post" key={index}>
                  <div className="accordionHeaderDiv">
                    <h2 id="username-post">{userInfo.username}</h2>
                    <p className="postDateCreated">{post.createdAt}</p>
                  </div>
                  <div>
                    <h4 id="userTitle-post">
                      <Link to={`/Single-post/${post._id}`}>
                        {post.postTitle}
                      </Link>
                    </h4>
                  </div>
                  <p id="postText">{post.postText}</p>
                  <div id="likes-dislikes">
                    {post.likesLength}
                    <p className="voteBtn">
                      <AiOutlineLike />
                    </p>
                    {post.dislikesLength}
                    <p className="voteBtn">
                      <AiOutlineDislike />
                    </p>
                  </div>
                </section>
              ))}
            </section>
            <section className="friendsSection">
              <section id="friendsSectionBorder">
                <div className="friendIcon" >
                  <h4 className="friendsText">Friends</h4><FaUserFriends/>
                </div>
  
                {userFriends.map((friend, index) => (
                  <div key={index}>
                    <Link to={`/profile/${friend._id}`}>{friend.username}</Link>
                  </div>
                ))}
              </section>
            </section>
          </main>
        </>
      ) : (
        <>
          <p>You must be to logged in to proceed</p>
        </>
      )}
    </>
  );
}
export default Profile;
