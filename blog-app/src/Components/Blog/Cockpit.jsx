import { useState } from "react";
import Posts from "./Posts";
import Auth from "../Auth/Auth";
import PostForm from "./PostForm";

function Cockpit() {
  const [tab, setTab] = useState(1);

  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-link">
          <button className="btn btn-link nav-item" onClick={() => setTab(1)}>
            All Posts
          </button>
        </li>
        <li className="nav-link">
          <button className="btn btn-link nav-item" onClick={() => setTab(2)}>
            Login
          </button>
        </li>
        <li className="nav-link">
          <button className="btn btn-link nav-item" onClick={() => setTab(3)}>
            Create Post
          </button>
        </li>
      </ul>
      {tab === 1 && <Posts />}
      {tab === 2 && <Auth />}
      {tab === 3 && <PostForm />}
    </>
  );
}

export default Cockpit;
