import React, { useState, useEffect } from "react";

// Fetches data from the raw Node.js server (http module) with useEffect + useState
function InfoMessage() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/info")
      .then((res) => res.json())
      .then((data) => setMessage(data.info))
      .catch(() => setMessage("Could not reach the server on port 5000."));
  }, []);

  return (
    <div className="box">
      <h2>Message from the Node.js server</h2>
      <p className="message">{message}</p>
    </div>
  );
}

export default InfoMessage;
