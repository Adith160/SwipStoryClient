import React, { useState, useEffect, forwardRef, useRef } from "react";
import styles from "./ViewStory.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import Stories from "react-insta-stories";
import { toast } from "react-toastify";
import {
  addLikeToStory,
  addStoryToBookmarks,
  getBookmarkedStoryById,
  getStoryById,
} from "../../api/storyApi";

const ViewStory = forwardRef(
  (
    { setShowStory, isMobile, storyId, setShowLogin, isLogin, setShowSpinner },
    ref
  ) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const storiesRef = useRef(null);
    const [storyData, setStoryData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (storyId) {
            setShowSpinner(true);
            const { exists } = await getBookmarkedStoryById(storyId);
            setBookmarked(exists);
            const response = await getStoryById(storyId);
            setStoryData(response);
            setLikeCount(response.likes);
            setShowSpinner(false);
          }
        } catch (error) {
          toast.error("Error fetching story data:", error);
          setShowSpinner(false);
        }
      };

      fetchData();
    }, [storyId, setShowSpinner]);

    const handleStoryEnd = () => {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    };

    const goToNext = () => {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      if (storiesRef.current) {
        storiesRef.current.next();
      }
    };

    const goToPrevious = () => {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
      if (storiesRef.current) {
        storiesRef.current.prev();
      }
    };

    const handleLike = async () => {
      if (!isLogin) {
        return setShowLogin(true);
      }
      if (storyData && storyData._id) {
        try {
          setShowSpinner(true);
          await addLikeToStory(storyData._id);
          liked ? setLiked(false) : setLiked(true);
          setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1)); // Increment like count
          setShowSpinner(false);
        } catch (error) {
          toast.error("Error adding like:", error);
          setShowSpinner(false);
        }
      }
    };

    const handleBookmarks = async () => {
      if (!isLogin) {
        return setShowLogin(true);
      }
      if (storyData && storyData._id) {
        try {
          setShowSpinner(true);
          await addStoryToBookmarks(storyData._id);
          setBookmarked(!bookmarked);
          setShowSpinner(false);
        } catch (error) {
          toast.error("Error adding bookmark:", error);
          setShowSpinner(false);
        }
      }
    };

    const copyToClipboard = (e) => {
      e.preventDefault(); // Prevent default action of the click event
      const el = document.createElement("textarea");
      el.value = generateStoryLink();
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      toast.success("Link Copied To The Clipboard!");
    };

    const generateStoryLink = () => {
      if (storyData && storyData._id) {
        return `${window.location.origin}/viewstory/${storyData._id}`;
      }
      return "";
    };

    if (!storyData) {
      return null; // Render nothing until storyData is fetched
    }

    const { story } = storyData;
    const formattedStories = story?.map((story) => ({
      url: story.image,
      header: story.heading,
      text: story.description,
    }));

    return (
      <div className={styles.mainDiv} ref={ref}>
        {!isMobile && (
          <>
            {currentStoryIndex > 0 && (
              <GrPrevious className={styles.prev} onClick={goToPrevious} />
            )}
            {currentStoryIndex < formattedStories.length - 1 && (
              <GrNext className={styles.next} onClick={goToNext} />
            )}
          </>
        )}
        <div className={styles.mainContainer}>
          <IoCloseSharp
            className={styles.close}
            onClick={() => setShowStory(false)}
          />
          <FiSend className={styles.send} onClick={(e) => copyToClipboard(e)} />

          <div className={styles.storiesDiv}>
            <Stories
              stories={formattedStories}
              defaultInterval={3000}
              width="100%"
              height="102%"
              ref={storiesRef}
              onStoryEnd={handleStoryEnd}
              currentIndex={currentStoryIndex}
            />
          </div>

          <div className={styles.contentDiv}>
            <h3 style={{ fontSize: isMobile ? "1.6em" : "" }}>
              {story[currentStoryIndex]?.heading}
            </h3>
            <span style={{ fontSize: isMobile ? "1.2em" : "" }}>
              {story[currentStoryIndex]?.description}
            </span>
          </div>
          <FaBookmark
            className={styles.bookmark}
            onClick={handleBookmarks}
            style={{ color: bookmarked ? "blue" : "" }}
          />
          {liked ? (
            <FcLike className={styles.like} onClick={handleLike} />
          ) : (
            <FaRegHeart className={styles.like} onClick={handleLike} />
          )}
          <p className={styles.totLike}>{likeCount}</p>
        </div>
      </div>
    );
  }
);

export default ViewStory;
