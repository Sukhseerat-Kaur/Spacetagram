import React from "react";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-container">
        {[...Array(20)].map((_, index) => (
          <span key={index} style={{ "--i": index + 1 }}></span>
        ))}
        <div>
          <i className="fas fa-rocket"></i>
        </div>
      </div>
    </div>
  );
};

export default Loader;
