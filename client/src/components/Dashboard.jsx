import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  const getMessage = () => {
    axios
      .get("http://localhost:3001/api/info", {
        withCredentials: true, // THIS FLAG IS NEEDED TO PASS COOKIES (USER SESSION) FROM BROWSER TO BACK-END
      })
      .then((response) => setMessage(response.data.message));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={getMessage}>Click me to retrieve the message</button>
      <p>Message: {message}</p>
    </div>
  );
};

export default Dashboard;
