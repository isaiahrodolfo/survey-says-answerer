import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, type User } from "../services/api";

const NamePage = () => {
  const [userId, setUserId] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load users");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDone = () => {
    if (!userId) {
      alert("Please select your name");
      return;
    }

    console.log("userId", userId);
    console.log("users", users);

    const selectedUser = users.find((user) => user.id === userId);
    if (!selectedUser) {
      alert("Please select a valid user");
      return;
    }

    localStorage.setItem("userId", String(selectedUser.id)); // Must be string for localStorage
    localStorage.setItem("userName", selectedUser.name);

    navigate("/questions");
  };

  return (
    <section className="name-screen">
      <div className="name-container">
        <div className="name-input-group">
          <label className="name-label">Your Name:</label>

          <select
            className="name-input"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            disabled={isLoading}
          >
            <option value="">Select a name</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isLoading && <div className="loading-message">Loading users...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>

        <button
          className="done-button"
          onClick={handleDone}
          disabled={isLoading}
        >
          Done
        </button>
      </div>
    </section>
  );
};

export default NamePage;
