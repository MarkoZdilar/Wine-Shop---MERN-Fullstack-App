import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageUsersPage.css";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/users/current",
          { withCredentials: true }
        );
        setCurrentUserId(response.data._id);
      } catch (error) {
        console.error("Greška pri dohvaćanju trenutnog korisnika:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users", {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
      }
    };

    fetchCurrentUserData();
    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId, newUsername) => {
    try {
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        { username: newUsername },
        { withCredentials: true }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, username: newUsername } : user
        )
      );
    } catch (error) {
      console.error("Greška pri ažuriranju korisnika:", error);
      alert("Došlo je do greške pri ažuriranju korisnika.");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        { role: newRole },
        { withCredentials: true }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Greška pri ažuriranju uloge korisnika:", error);
      alert("Došlo je do greške pri ažuriranju uloge korisnika.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === currentUserId) {
      alert("Ne možete izbrisati vlastiti račun.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/api/users/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Greška pri brisanju korisnika:", error);
      alert("Došlo je do greške pri brisanju korisnika.");
    }
  };

  return (
    <div className="manage-users-container">
      <h1>Upravljanje korisnicima</h1>
      <table className="manage-users-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Email</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={user._id === currentUserId ? "disabled-row" : ""}
            >
              <td>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => handleUpdateUser(user._id, e.target.value)}
                  disabled={user._id === currentUserId}
                />
              </td>
              <td>{user.email}</td>
              <td>
                {user._id === currentUserId ? (
                  <span>{user.role}</span>
                ) : (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="Korisnik">Korisnik</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                )}
              </td>
              <td>
                {user._id !== currentUserId && (
                  <>
                    <button onClick={() => handleDeleteUser(user._id)}>
                      Obriši
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsersPage;
