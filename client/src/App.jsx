import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
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
      <p>Hello, I'm {email}</p>
    </div>
  );
};

export default App;
