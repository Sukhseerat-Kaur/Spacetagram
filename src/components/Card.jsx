import React, { useState } from "react";
import "../styles/card.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Card = ({ postData, toggleLiked, index }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card">
      <div className="content">
        <div className="header">
          <div className="title">{postData.title}</div>
          <div className="date">{postData.date}</div>
        </div>
        <div className="card-img">
          {postData.media_type === "image" ? (
            <img src={postData.url} alt={postData.title} className="media" />
          ) : (
            <iframe
              src={postData.url}
              frameBorder="0"
              className="media"
              title={postData.title}
            ></iframe>
          )}
        </div>
        <div className="description">
          <div className={readMore ? "explanation" : "explanation show-less"}>
            {postData.explanation}
          </div>
          <div className="read-more" onClick={() => setReadMore(!readMore)}>
            {readMore ? "Read Less▲" : "Read More▼"}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          toggleLiked(postData, index);
        }}
        className={
          postData.liked ? "like-button is-active" : "like-button not-active"
        }
      >
        <FavoriteBorderIcon className="not-liked bouncy" />
        <FavoriteIcon className="is-liked bouncy" />
        <span className="like-overlay"></span>
      </div>
      <div className="send"></div>
    </div>
  );
};

export default Card;
