import "./App.css";
import Right from "./components/Right";

function App() {
  if (localStorage.getItem("likedPosts") === null) {
    localStorage.setItem("likedPosts", JSON.stringify([]));
  }
  return (
    <div className="app">
      {/* <Left /> */}
      <Right />
    </div>
  );
}

export default App;
