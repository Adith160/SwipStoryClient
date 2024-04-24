import React, { useState } from "react";
import styles from "./Header.module.css";
import Profile from "../../assets/images/Calm and confident.png";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

function Header() {
  const isLogin = true;
  const isMobile = false;
  const [ShowProfile, setShowProfile] = useState(false);
  return (
    <div className={styles.mainDiv}>
      <span>SwipTory</span>
      {isMobile ? (
        <div className={styles.rightDiv}>
          <MdOutlineMenu
            style={{ cursor: "pointer", height: "4vh", width: "4vh" }}
            onClick={() => setShowProfile(!ShowProfile)}
          />

          {ShowProfile && (
            <div className={styles.mobileMenu}>
              {isLogin ? (
                <>
                  {" "}
                  <div className={styles.topProfile}>
                    <img src={Profile} alt="img" /> <span>AKv jhaci abci</span>{" "}
                    <IoCloseOutline className={styles.closeIcon} onClick={() => setShowProfile(!ShowProfile)}/>
                  </div>
                  <button className={styles.clrPink}>Your Story</button>
                  <button className={styles.clrPink}>Add Story</button>
                  <button className={styles.clrPink}>
                    <IoBookmarkSharp /> Bookmarks
                  </button>
                  <button>Logout</button>
                </>
              ) : (
                <>
                <IoCloseOutline className={styles.closeIcon2} onClick={() => setShowProfile(!ShowProfile)}/>
                <button className={styles.clrBlue}>Log In</button>
                  <button className={styles.clrPink}>Register Now</button>
                </>
              )}
            </div>
          )}
        </div>
      ) : isLogin ? (
        <div className={styles.rightDiv}>
          <button className={styles.clrPink}>
            <IoBookmarkSharp /> Bookmarks
          </button>
          <button className={styles.clrPink}>Add Story</button>
          <img src={Profile} alt="img" />
          <MdOutlineMenu
            style={{ cursor: "pointer", height: "4vh", width: "4vh" }}
            onClick={() => setShowProfile(!ShowProfile)}
          />

          {ShowProfile && (
            <div className={styles.menu}>
              <span>AK</span>
              <button>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.rightDiv}>
          <button className={styles.clrPink}>Register Now</button>
          <button className={styles.clrBlue}>Sign In</button>
        </div>
      )}
    </div>
  );
}

export default Header;
