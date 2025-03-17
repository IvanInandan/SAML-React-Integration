import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [email, setEmail] = useState(null);
  const [issuer, setIssuer] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/whoami", {
        withCredentials: true,
      });

      setEmail(response.data.user.nameID);
      setIssuer(response.data.user.issuer);
      setSession(response.data.user.sessionIndex);
    } catch (error) {
      console.log("Error retrieving user data: ", error);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <div>
        <p>Email: {email}</p>
        <p>Identity Provider: {issuer}</p>
        <p>Session ID: {session}</p>
      </div>
    </div>
  );
};

export default Home;
