import React, { useState } from "react";
import styles from "../Signup/Signup.module.css";
import { BiSolidHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";

function Login() {
  const [ShowPassword, SetShowPassword] = useState(false);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline className={styles.close} />
        <h3>Login to SwipTory</h3>
        <form>
          <div className={styles.inputDiv}>
            <b>Username</b> <input placeholder="Enter username"></input>
          </div>
          <div className={styles.inputDiv}>
            <b>Password</b>{" "}
            <input
              type={ShowPassword ? "password" : ""}
              placeholder="Enter password"
            ></input>
            {ShowPassword ? (
              <BiSolidHide
                className={styles.viewImg}
                onClick={() => SetShowPassword(!ShowPassword)}
              />
            ) : (
              <BiShow
                className={styles.viewImg}
                onClick={() => SetShowPassword(!ShowPassword)}
              />
            )}
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
