import React, { useState } from "react";
import styles from "./Header.module.css";
import Profile from "../../assets/images/Calm and confident.png";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

function Header({
  setShowSignup,
  ShowSignup,
  setShowLogin,
  ShowLogin,
  setShowAddStory,
  ShowAddStory,
  isMobile,
  isLogin,
  setIsLogin,
  rerenderHome,
  setShowBookmark,
  setEditStory
}) {
  const [ShowProfile, setShowProfile] = useState(false);

  const toggleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLogin(false);
    rerenderHome();
    setShowProfile(false);
  };
  return (
    <div className={styles.mainDiv}>
      <span onClick={() => setShowBookmark(false)}>SwipTory</span>
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
                  <button
                    className={styles.clrPink}
                    onClick={() => {
                      setShowBookmark(false);
                      setShowProfile(false);
                      rerenderHome();
                    }}
                  >
                    Your Story
                  </button>
                  <button
                    className={styles.clrPink}
                    onClick={() => {
                      setShowAddStory(!ShowAddStory);
                      setShowProfile(false);
                      setEditStory(false)
                    }}
                  >
                    Add Story
                  </button>
                  <button
                    className={styles.clrPink}
                    onClick={() => {
                      setShowBookmark(true);
                      setShowProfile(false);
                    }}
                  >
                    <IoBookmarkSharp /> Bookmarks
                  </button>
                  <button onClick={() => toggleLogout()}>Logout</button>
                </>
              ) : (
                <>
                  <IoCloseOutline
                    className={styles.closeIcon2}
                    onClick={() => setShowProfile(!ShowProfile)}
                  />
                  <button
                    className={styles.clrBlue}
                    onClick={() => {
                      setShowLogin(!ShowLogin);
                      setShowProfile(false);
                    }}
                  >
                    Log In
                  </button>
                  <button
                    className={styles.clrPink}
                    onClick={() => {
                      setShowSignup(!ShowSignup);
                      setShowProfile(false);
                    }}
                  >
                    Register Now
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ) : isLogin ? (
        <div className={styles.rightDiv}>
          <button
            className={styles.clrPink}
            onClick={() => setShowBookmark(true)}
          >
            <IoBookmarkSharp /> Bookmarks
          </button>
          <button
            className={styles.clrPink}
            onClick={() => {setShowAddStory(!ShowAddStory); setEditStory(false)}}
          >
            Add Story
          </button>
          <img src={Profile} alt="img" />
          <MdOutlineMenu
            style={{ cursor: "pointer", height: "4vh", width: "4vh" }}
            onClick={() => setShowProfile(!ShowProfile)}
          />

          {ShowProfile && (
            <div className={styles.menu}>
              <span>AK</span>
              <button onClick={() => toggleLogout()}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.rightDiv}>
          <button
            className={styles.clrPink}
            onClick={() => {
              setShowProfile(false);
              setShowSignup(!ShowSignup);
            }}
          >
            Register Now
          </button>
          <button
            className={styles.clrBlue}
            onClick={() => {
              setShowProfile(false);
              setShowLogin(!ShowLogin);
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
