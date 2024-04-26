import React, { useState } from "react";
import styles from "../Signup/Signup.module.css";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { loginUser } from "../../api/auth";

function Login({ setShowLogin, ShowLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateField(username)) {
      setErrorMessage("Please enter a valid username");
      return;
    }
    if (!validateField(password)) {
      setErrorMessage("Please enter a valid password");
      return;
    }

    try {
      const response = await loginUser({ username, password });
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name);
        setShowLogin(!ShowLogin)
        // Redirect to dashboard or set authentication state
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  const validateField = (username) => {
    return username.trim() !== "";
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline
          className={styles.close}
          onClick={() => setShowLogin(!ShowLogin)}
        />
        <h3>Login to SwipTory</h3>
        <form onSubmit={handleLogin}>
          <div className={styles.inputDiv}>
            <b>Username</b>{" "}
            <input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className={styles.inputDiv}>
            <b>Password</b>{" "}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {showPassword ? (
              <BiSolidHide
                className={styles.viewImg}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <BiShow
                className={styles.viewImg}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <span>{errorMessage}</span>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
