import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Test Website</h1>
      <div style={styles.linkContainer}>
        <Link to="/customer" style={styles.link}>
          Customer Page
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "3em",
    color: "#333",
  },
  linkContainer: {
    marginTop: "30px",
  },
  link: {
    margin: "0 15px",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "5px",
  },
};

export default Home;
