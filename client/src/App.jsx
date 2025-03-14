import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Login from "./components/Login";

const App = () => {
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
    </div>
  );
};

export default App;
