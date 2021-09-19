import React, { useState } from "react";
import "../styles/card.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Card = ({ postData }) => {
  const [readMore, toggleReadMore] = useState(false);
  const [liked, toggleLike] = useState(postData.liked);
  console.log(liked);
  console.log(postData.liked);

  const removeFromLikedPosts = () => {
    const originalArray = JSON.parse(localStorage.getItem("likedPosts"));
    const newArray = originalArray.filter(
      (obj) => obj.title !== postData.title
    );
    localStorage.setItem("likedPosts", JSON.stringify(newArray));
  };

  const addToLikedPosts = () => {
    const originalArray = JSON.parse(localStorage.getItem("likedPosts"));
    originalArray.push(postData);
    localStorage.setItem("likedPosts", JSON.stringify(originalArray));
  };

  return (
    <div className="card">
      <div className="header">
        <div className="title">{postData.title}</div>
        <div className="date">{postData.date}</div>
      </div>
      <div className="card-img">
        {/* <img
          src={
            postData.media_type === "image"
              ? postData.url
              : postData.thumbnail_url
          }
          alt=""
        /> */}
        {postData.media_type === "image" ? (
          <img src={postData.url} className="media" />
        ) : (
          <iframe src={postData.url} frameBorder="0" className="media"></iframe>
        )}
      </div>
      <div className="description">
        <div className={readMore ? "explanation" : "explanation show-less"}>
          {postData.explanation}
        </div>
        <div className="read-more" onClick={() => toggleReadMore(!readMore)}>
          {readMore ? "Read Less▲" : "Read More▼"}
        </div>
      </div>
      {/* <div
        className={liked ? "like  liked" : "like"}
        onClick={() => toggleLike(!liked)}
      ></div> */}
      <div
        onClick={() => {
          postData.liked = !postData.liked;
          toggleLike(!liked);
          postData.liked ? addToLikedPosts() : removeFromLikedPosts();
        }}
        className={liked ? "like-button is-active" : "like-button not-active"}
      >
        {console.log(postData)}
        <FavoriteBorderIcon className="not-liked bouncy" />
        <FavoriteIcon className="is-liked bouncy" />
        <span className="like-overlay"></span>
      </div>
      <div className="send"></div>
    </div>
  );
};

export default Card;
