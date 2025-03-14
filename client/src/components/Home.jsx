import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");

  const getMessage = () => {
    axios
      .get("http://localhost:3001/api/info", {
        withCredentials: true,
      })
      .then((response) => setMessage(response.data.message));
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={getMessage}>Click me to retrieve the message</button>
      <p>Message: {message}</p>
    </div>
  );
};

export default Home;
