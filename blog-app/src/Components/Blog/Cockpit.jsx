import { useState } from "react";
import Posts from "./Posts";
import Auth from "../Auth/Auth";

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
      </ul>
      {tab === 1 && <Posts />}
      {tab === 2 && <Auth />}
    </>
  );
}

export default Cockpit;
