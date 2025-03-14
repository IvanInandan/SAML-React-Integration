import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Login from "./components/Login";

const App = () => {
  const user = useSelector((state) => state.user);

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
      <Link to="/login" style={padding}>
        Login
      </Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <div>
        <h2>Hi, I'm {JSON.stringify(user)}</h2>
      </div>
    </div>
  );
};

export default App;
