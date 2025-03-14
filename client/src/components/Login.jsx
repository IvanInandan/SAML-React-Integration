import axios from "axios";

import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();

  /*
  HandleLogin = async () => {
    try {
      const response = await axios.get("/api/whoami", {
        withCredentials: true, // Allows passport + express to pass login information by recognizing where request is coming from
      });

      // If request is authorized
      console.log(response.data.user, "SAML"); // Log information received from back-end

      if (response.data.user.nameID) {
        // Set user state
        dispatch(setUser(response.data.user));
        console.log("Setting user state: ", response.data.user);
      } else {
        // Redirect to login
        redirectToLogin();
      }
    } catch (error) {
      // Redirect to login
      console.log("ERROR REACHING SERVER: ", error);
      redirectToLogin();
    }
  };
  */

  const handleLogin = () => {
    console.log("Logging in");
    redirectToLogin();
  };

  const handleLogout = () => {
    dispatch(logout("I'm logged out!"));
  };

  const redirectToLogin = () => {
    window.location.replace("/api/login/");
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
