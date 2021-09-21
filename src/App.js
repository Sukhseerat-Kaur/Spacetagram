import "./App.css";
import Right from "./components/Right";
import { Route } from "react-router-dom";
import LikedPosts from "./components/LikedPosts";

function App() {
  if (localStorage.getItem("likedPosts") === null) {
    localStorage.setItem("likedPosts", JSON.stringify([]));
  }
  return (
    <div className="app">
      <Route path="/" exact component={Right} />
      <Route path="/liked" component={LikedPosts} />
    </div>
  );
}

export default App;
