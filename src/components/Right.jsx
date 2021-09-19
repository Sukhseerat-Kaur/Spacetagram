import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import "react-multi-date-picker/styles/colors/purple.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";
import { ReactComponent as Logo } from "./logo.svg";

const Right = () => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 14);
  defaultDate = defaultDate.toISOString().slice(0, 10);

  const [start, setStart] = useState(new DateObject().subtract(14, "days"));
  const [end, setEnd] = useState(new DateObject());

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=KzfuoUrxMV1JRATqlA16k2n6dMzXMtqobNMfwc4h&start_date=${defaultDate}&thumbs=True`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleClick = () => {
    setLoading(true);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=KzfuoUrxMV1JRATqlA16k2n6dMzXMtqobNMfwc4h&start_date=${start.format()}&end_date=${end.format()}&thumbs=True`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  };

  if (posts.length === 0) return <Loader />;

  posts.map((postObj) => {
    const arr = JSON.parse(localStorage.getItem("likedPosts"));
    let found = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title === postObj.title) {
        postObj["liked"] = true;
        found = true;
        break;
      }
    }
    if (!found) postObj["liked"] = false;
  });

  return (
    <div className="right">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                value={start}
                onChange={setStart}
                format="YYYY-MM-DD"
                maxDate={new DateObject()}
                animations={[
                  opacity(),
                  transition({ from: 35, duration: 600 }),
                ]}
                render={<CustomInput />}
                className="purple datepicker"
              />
              <DatePicker
                placeholder="End Date"
                value={end}
                onChange={setEnd}
                format="YYYY-MM-DD"
                maxDate={new DateObject()}
                animations={[
                  opacity(),
                  transition({ from: 35, duration: 600 }),
                ]}
                render={<CustomInput />}
                className="purple datepicker"
              />
              <button onClick={handleClick}>Go</button>
            </div>
            <div className="posts">
              {posts.map((obj) => (
                <Card postData={obj} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function CustomInput({ openCalendar, value, handleValueChange }) {
  return (
    <input onFocus={openCalendar} value={value} onChange={handleValueChange} />
  );
}

export default Right;
