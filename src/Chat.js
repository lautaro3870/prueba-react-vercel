import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userNamee, setUserName] = useState("");

  const getData = async () => {
    const response = await fetch("https://localhost:7258/WeatherForecast");
    const data = await response.json();
    console.log(data);
  };

  // useEffect(() => {
  //     getData()
  // }, [])

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7258/chathub")
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connection started");
          connection.on("ReceiveMessage", (userName, message) => {
            const newMessage = `${userName}: ${message}`;
            setMessages((messages) => [...messages, newMessage]);
          });
        })
        .catch(console.error);
    }
  }, [connection]);

  const handleSend = () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.invoke("SendMessage", "User", message);
      setMessage("");
    } else {
      console.log("Connection not in the Connected state.");
    }
  };

  return (
    <div>
      <br />
      {userNamee === "" ? (
        <div>
          <label>Ingrese nombre se usuario: </label>
          <input type="text" id="nombre" />
          <button
            onClick={() => {
              var nombre = document.getElementById("nombre").value;
              setUserName(nombre);
            }}
          >
            Ingresar
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
