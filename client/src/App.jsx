import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser, logoutUser } from "./reducers/userReducer";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/user/logout",
        {},
        {
          withCredentials: true, // Ensure credentials are sent with the request
        }
      );
      dispatch(logoutUser()); // Update your frontend state (e.g., Redux store)
      window.location.href = "/"; // Redirect to home page or login page
    } catch (error) {
      console.log("Logout failed: ", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div>
      <Link to="/" style={padding}>
        Home
      </Link>
      <Link to="/app" style={padding}>
        App
      </Link>

      {!user && (
        <a href="/api/user/login" style={padding}>
          Login
        </a>
      )}

      {user && (
        <a href="/" onClick={handleLogout} style={padding}>
          Logout
        </a>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
