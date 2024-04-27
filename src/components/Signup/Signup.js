import React, { useState } from "react";
import styles from "./Signup.module.css";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { registerUser } from "../../api/auth";

function Signup({ setShowSignup, ShowSignup}) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
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
      const response = await registerUser({ username, password });
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name);
        setShowSignup(false);
      }
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const validateField = (username) => {
    // Perform your validation logic here
    return username.trim() !== "";
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline
          className={styles.close}
          onClick={() => setShowSignup(!ShowSignup)}
        />
        <h3>Register to SwipTory</h3>
        <form onSubmit={handleRegister}>
          <div className={styles.inputDiv}>
            <b>Username</b>{" "}
            <input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputDiv}>
            <b>Password</b>{" "}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
