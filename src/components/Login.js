import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getUserInfo() {
    const response = await fetch("/.auth/me");
    const user = await response.json();
    console.log(user);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
    alert("Successfully logged out");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin(email, password);
      login(data.token);
      navigate("/customer");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      <div>
        <a href="/.auth/login/aab">Login</a>
        <a href="/.auth/logout">Log out</a>
      </div>

      <div>
        <button onClick={getUserInfo}>get logged in user info</button>
      </div>

      <div>
      <Link to="/register">
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
