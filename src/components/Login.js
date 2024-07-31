import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    alert("Successfully logged out");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin(username, password);
      login(data.token);
      navigate("/customer");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Login;
