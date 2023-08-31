import { useEffect, useState } from "react";
import { API } from "./api";

export default function App() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const res = await fetch(`${API}/users`);
    const info = await res.json();
    setUsers(info.users);
  }

  async function handleUpdate(user) {
    const res = await fetch(`${API}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: user.count + 1,
      }),
    });
    const info = await res.json();
    if (info.success) {
      fetchUsers();
    }
  }

  const handleDelete = async (userId) => {
    const res = await fetch(`${API}/users/${userId}`, {
      method: "DELETE",
    });
    const info = await res.json();
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Spray and Pray Board</h1>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="user-box"
            onClick={() => handleUpdate(user)}
          >
            <button onClick={() => handleDelete(user.id)}>X</button>
            <h3>{user.name}</h3>
            <div>{user.count}</div>
          </div>
        );
      })}
    </>
  );
}
