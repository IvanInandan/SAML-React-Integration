import { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(""); // email received from SAML response on backend

  useEffect(() => {
    console.log(
      "Checking to see if we are authenticated with express & passport"
    );

    //
    axios
      .get("/api/whoami", {
        withCredentials: true, // Allows passport + express to pass login information by recognizing where request is coming from
      })
      .then((response) => {
        // If request is authorized
        console.log(response.data.user, "SAML"); // Log information received from back-end

        // If user is found
        if (response.data.user.nameID) {
          // Store email from response (nameID)
          setEmail(response.data.user.nameID);
          setLoading(false);
        }

        // If user is not found
        else {
          // Redirect to login
          RedirectToLogin();
        }
      })
      .catch((error) => {
        // Redirect to login
        console.log("ERROR REACHING SERVER: ", error);
        RedirectToLogin();
      });
  }, []);

  const RedirectToLogin = () => {
    window.location.replace("/api/login");
  };

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <h1>Hi I'm {email}</h1>
      <p> Content of state: {user}</p>
      <button
        onClick={() => {
          dispatch(login("I'm logged in!"));
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          dispatch(logout("I'm logged out!"));
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Login;
