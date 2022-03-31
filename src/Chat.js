import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import uuid from "../node_modules/uuid/dist/v4";

const myId = uuid();
const socket = io("http://localhost:6060", { transports: ["websocket"] });
socket.on("connect", () => console.log("[IO] Connect => New connection"));

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = (newMessage) =>
      setMessages([...messages, newMessage]);
    socket.on("chat.message", handleNewMessage);
    return () => socket.off("chat.message", handleNewMessage);
  }, [messages]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat.message", {
        id: myId,
        message,
      });
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <main className="container">
      <ul className="list">
        {messages.map((m) => (
          <li 
            className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`} 
            key={m.id}
          >
            <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>{m.message}</span>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          placeholder="Digite um novo texto aqui"
          type="text"
          onChange={handleInputChange}
          value={message}
        />
      </form>
    </main>
  );
}

export default Chat;
