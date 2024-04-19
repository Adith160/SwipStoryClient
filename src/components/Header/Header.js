import React from "react";
import styles from "./Header.module.css";
import Profile from "../../assets/images/Calm and confident.png";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";

function Header() {
  const isLogin = true;
  const isMobile = true;
  return (
    <div className={styles.mainDiv}>
      <span>SwipTory</span>
      {isMobile ? (
        isLogin ? (
          <div className={styles.rightDiv}>
            <button className={styles.clrPink}>
              <IoBookmarkSharp /> Bookmarks
            </button>
            <button className={styles.clrBlue}>Add Story</button>
            <img src={Profile} alt="img" />
            <MdOutlineMenu
              style={{ cursor: "pointer", height: "4vh", width: "4vh" }}
            />
          </div>
        ) : (
          <div>
            <button className={styles.clrPink}>Register Now</button>
            <button className={styles.clrBlue}>Sign In</button>
          </div>
        )
      ) : isLogin ? (
        <div className={styles.rightDiv}>
          <button className={styles.clrPink}>
            <IoBookmarkSharp /> Bookmarks
          </button>
          <button className={styles.clrBlue}>Add Story</button>
          <img src={Profile} alt="img" />
          <MdOutlineMenu
            style={{ cursor: "pointer", height: "4vh", width: "4vh" }}
          />
        </div>
      ) : (
        <div>
          <button className={styles.clrPink}>Register Now</button>
          <button className={styles.clrBlue}>Sign In</button>
        </div>
      )}
    </div>
  );
}

export default Header;
