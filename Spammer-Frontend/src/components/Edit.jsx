// Edit.jsx
import { useState } from "react";
import { API } from "../assets/api";

export default function Edit(props) {
  const { message, setIsEditingMessage, fetchMessages } = props; // Destructure message and other props

  const [newMessage, setNewMessage] = useState(message.text); // Initialize with the current message text

  async function handleEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newMessage, // Use the correct field name
      }),
    });
    const info = await res.json();
    setIsEditingMessage(null); // Exit edit mode
    fetchMessages();
  }

  return (
    <div>
      <form onSubmit={handleEdit}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button>Edit Message</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditingMessage(null); // Exit edit mode
          }}>
          Cancel
        </button>
      </form>
    </div>
  );
}
