import React, { useState } from "react";

function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, {
        id: 1,
        message
      }])
      setMessage('')
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)

  }
  return (
    <main className="container">
      <ul className="list">
        {messages.map(m => (
        <li className="list__item list__item--mine">
          <span className="message message--mine" key={m.id}>
            {m.message}
          </span>
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
