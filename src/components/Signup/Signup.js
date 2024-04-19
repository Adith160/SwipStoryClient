import React from "react";
import styles from "./Signup.module.css";

function Signup() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <h3>Register to SwipTory</h3>
        <form>
          <div className={styles.inputDiv}>
            <b>Username</b>  <input placeholder="Enter username"></input>
          </div>
          <div  className={styles.inputDiv}>
            <b>Password</b> <input placeholder="Enter password"></input>
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
