import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Login from "./components/Login";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log("User session: ", user);

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Link to="/" style={padding}>
        Home
      </Link>
      <Link to="/app" style={padding}>
        App
      </Link>
      <Link to="/settings" style={padding}>
        Settings
      </Link>

      {!user && (
        <a href="/api/login" style={padding}>
          Login
        </a>
      )}

      {user && (
        <>
          <a href="/api/logout" style={padding}>
            Logout
          </a>

          <span>Hi {user.nameID}!</span>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
