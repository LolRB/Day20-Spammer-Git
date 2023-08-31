import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./assets/api";
import Edit from "./components/Edit";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditingMessage, setIsEditingMessage] = useState(false);

  //fetches and sets messages
  async function fetchMessages() {
    const res = await fetch(`${API}/messages`);
    const info = await res.json();
    console.log(info);
    setMessages(info.messages);
  }

  // Post message
  async function handlePost(e) {
    e.preventDefault();

    const res = await fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputValue,
      }),
    });
    const info = await res.json();
    console.log(info);
    if (info.success) {
      console.log("hello this is a test");
      fetchMessages();
      setInputValue("");
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //updates likes
  async function handleLikes(message) {
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: message.likes + 1 }),
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  }

  // Dellete a message
  async function handleDelete(message) {
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "DELETE",
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return (
    <>
      <h1>Spammer</h1>
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="Whats your message?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>Post Message</button>
      </form>
      {messages.map((message) => {
        return (
          <div key={message.id} className="message-container">
            <div>
              {message.text}
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingMessage(message.id); // Pass the message ID
                }}>
                ✏️
              </button>
              {isEditingMessage === message.id && (
                <Edit
                  message={message} // Pass the message
                  setIsEditingMessage={setIsEditingMessage}
                  fetchMessages={fetchMessages} // Pass the fetchMessages function
                />
              )}
            </div>
            <div className="lower-buttons">
              <button className="button">↩️</button>
              <button className="button" onClick={() => handleLikes(message)}>
                👍{message.likes}
              </button>
              <button className="button" onClick={() => handleDelete(message)}>
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;
