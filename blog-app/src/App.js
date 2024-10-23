import { useState } from "react";
import Cockpit from "./Components/Blog/Cockpit";
import AuthContext from "./Context/AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Cockpit />
      </AuthContext.Provider>
    </>
  );
}

export default App;
