import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Card from "./Card";
import "../styles/likedPosts.css";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const LikedPosts = () => {
  const [likedPosts, setLikedPosts] = useLocalStorage("likedPosts", []);

  const toggleLiked = (post) => {
    const newLiked = likedPosts.filter((val) => val.title !== post.title);
    setLikedPosts(newLiked);
  };
  return (
    <div className="liked-posts">
      <div className="head">
        <Link exact to="/" className="home">
          <HomeIcon
            fontSize="large"
            style={{ color: "white" }}
            className="home-icon"
          />
        </Link>
        <span>All the posts you liked are here</span>
      </div>
      <div className="posts">
        {likedPosts.length === 0 ? (
          <h2>No Liked Posts</h2>
        ) : (
          likedPosts.map((post, index) => (
            <Card
              key={index}
              postData={post}
              toggleLiked={() => toggleLiked(post)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LikedPosts;
