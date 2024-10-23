import { useState, useContext } from "react";
import Posts from "./Posts";
import Auth from "../Auth/Auth";
import PostForm from "./PostForm";
import AuthContext from "../../Context/AuthContext";

function Cockpit() {
  const [tab, setTab] = useState(1);
  const context = useContext(AuthContext);

  const logoutClickHandler = () => {
    context.setIsLoggedIn(false);
    localStorage.removeItem("token");
    setTab(1);
  };

  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-link">
          <button className="btn btn-link nav-item" onClick={() => setTab(1)}>
            All Posts
          </button>
        </li>
        {!context.isLoggedIn && (
          <li className="nav-link">
            <button className="btn btn-link nav-item" onClick={() => setTab(2)}>
              Login
            </button>
          </li>
        )}
        {context.isLoggedIn && (
          <li className="nav-link">
            <button className="btn btn-link nav-item" onClick={() => setTab(3)}>
              Create Post
            </button>
          </li>
        )}
        {context.isLoggedIn && (
          <li className="nav-link">
            <button
              className="btn btn-link nav-item"
              onClick={logoutClickHandler}
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {tab === 1 && <Posts />}
      {tab === 2 && <Auth />}
      {tab === 3 && <PostForm />}
    </>
  );
}

export default Cockpit;
