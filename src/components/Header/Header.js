import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Profile from "../../assets/images/Calm and confident.png";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

function Header({ setShowSignup, ShowSignup, setShowLogin, ShowLogin, setShowAddStory, ShowAddStory }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ShowProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setIsLogin(true);
    }

    const isMobileDevice = () => {
      return window.innerWidth <= 768; // You can adjust the threshold as needed
    };

    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                    <IoCloseOutline
                      className={styles.closeIcon}
                      onClick={() => setShowProfile(!ShowProfile)}
                    />
                  </div>
                  <button className={styles.clrPink}>Your Story</button>
                  <button className={styles.clrPink} onClick={() => setShowAddStory(!ShowAddStory)}>Add Story</button>
                  <button className={styles.clrPink}>
                    <IoBookmarkSharp /> Bookmarks
                  </button>
                  <button onClick={() => setShowLogin(!ShowLogin)}>Logout</button>
                </>
              ) : (
                <>
                  <IoCloseOutline
                    className={styles.closeIcon2}
                    onClick={() => setShowProfile(!ShowProfile)}
                  />
                  <button className={styles.clrBlue} onClick={() => setShowLogin(!ShowLogin)}>
                    Log In
                  </button>
                  <button className={styles.clrPink} onClick={() => setShowSignup(!ShowSignup)}>
                    Register Now
                  </button>
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
          <button className={styles.clrPink} onClick={() => setShowAddStory(!ShowAddStory)}>Add Story</button>
          <img src={Profile} alt="img" />
          <MdOutlineMenu
            style={{ cursor: "pointer", height: "4vh", width: "4vh" }}
            onClick={() => setShowProfile(!ShowProfile)}
          />

          {ShowProfile && (
            <div className={styles.menu}>
              <span>AK</span>
              <button onClick={() => setShowLogin(!ShowLogin)}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.rightDiv}>
          <button className={styles.clrPink} onClick={() => setShowSignup(!ShowSignup)}>
            Register Now
          </button>
          <button className={styles.clrBlue} onClick={() => setShowLogin(!ShowLogin)}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
