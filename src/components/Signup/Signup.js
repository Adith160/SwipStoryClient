import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../Redux/User/UserSlice"; // Assuming your userSlice is in the specified path

import { BiSolidHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";


function Signup() {
  const dispatch = useDispatch();
  const [ShowPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Dispatch the registerUserAsync action with the username and password
    dispatch(registerUserAsync({ username, password }));
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline className={styles.close} />
        <h3>Register to SwipTory</h3>
        <form onSubmit={handleRegister}>
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
              type={ShowPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {ShowPassword ? (
              <BiSolidHide
                className={styles.viewImg}
                onClick={() => setShowPassword(!ShowPassword)}
              />
            ) : (
              <BiShow
                className={styles.viewImg}
                onClick={() => setShowPassword(!ShowPassword)}
              />
            )}
          </div>
          <span>Please enter valid username</span>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
