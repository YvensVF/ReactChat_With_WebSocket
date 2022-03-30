import React, { useState } from "react";

function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessage('')
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)

  }
  return (
    <main className="container">
      <ul className="list">
        <li className="list__item list__item--mine">
          <span className="message message--mine">Olá</span>
        </li>
        <li className="list__item list__item--other">
          <span className="message message--other">Olá</span>
        </li>
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
