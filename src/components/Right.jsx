import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import "react-multi-date-picker/styles/colors/purple.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";
import { ReactComponent as Logo } from "./logo.svg";
import { fetchPosts } from "../api/fetchPosts";
import { useLocalStorage } from "../hooks/useLocalStorage";

const getDefaultDate = () => {
  return {
    start: new DateObject()
      .subtract(14, "days")
      .toLocaleString()
      .replaceAll("/", "-"),
    end: new DateObject().toLocaleString().replaceAll("/", "-"),
  };
};
const Right = () => {
  const [inputDate, setInputDate] = useState(getDefaultDate());
  const [searchDate, setSearchDate] = useState(getDefaultDate());
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [localPosts, setLocalPosts] = useLocalStorage("likedPosts", []);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      let res = await fetchPosts(searchDate);
      if (localPosts.length) {
        res = res.map((post) => {
          const postData = localPosts.find(
            (lPost) => lPost.title === post.title
          );
          return postData ? postData : post;
        });
      }
      setPosts(res);
      setLoading(false);
    };

    getPosts();
  }, [searchDate]);

  const toggleLiked = (postData, index) => {
    const newPostsData = posts.map((val, idx) =>
      idx === index ? { ...val, liked: !val.liked } : val
    );

    const inLocal = localPosts.find((lpost) => postData.title === lpost.title);
    if (inLocal) {
      const newLocal = localPosts.filter((val) => val.title !== inLocal.title);
      setLocalPosts(newLocal);
    } else {
      setLocalPosts((s) => [...s, { ...postData, liked: !postData.liked }]);
    }
    setPosts(newPostsData);
  };

  if (posts.length === 0 || isLoading) return <Loader />;

  return (
    <div className="right">
      <div className="logo-and-name">
        <div className="logo">
          <Logo />
        </div>
        <span className="app-name">Spacetagram</span>
      </div>

      <div className="main">
        <div className="inputs">
          <DatePicker
            placeholder="Start Date"
            value={inputDate.start}
            onChange={(date) =>
              setInputDate((s) => ({ ...s, start: date.toLocaleString() }))
            }
            format="YYYY-MM-DD"
            maxDate={new DateObject()}
            animations={[opacity(), transition({ from: 35, duration: 600 })]}
            render={<CustomInput />}
            className="purple datepicker"
          />
          <DatePicker
            placeholder="End Date"
            value={inputDate.end}
            onChange={(date) =>
              setInputDate((s) => ({ ...s, end: date.toLocaleString() }))
            }
            format="YYYY-MM-DD"
            maxDate={new DateObject()}
            animations={[opacity(), transition({ from: 35, duration: 600 })]}
            render={<CustomInput />}
            className="purple datepicker"
          />
          <button onClick={() => setSearchDate(inputDate)}>Go</button>
        </div>
        <div className="posts">
          {posts.map((obj, index) => (
            <Card
              key={index}
              postData={obj}
              toggleLiked={toggleLiked}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function CustomInput({ openCalendar, value, handleValueChange }) {
  return (
    <input onFocus={openCalendar} value={value} onChange={handleValueChange} />
  );
}

export default Right;
