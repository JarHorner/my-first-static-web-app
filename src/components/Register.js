import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../services/api";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await apiRegister(username, email, password);
        navigate("/login");
    } catch (error) {
      alert("Register failed");
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>

      <div>
      <Link to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
