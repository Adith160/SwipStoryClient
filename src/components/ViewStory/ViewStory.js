import React, { useRef, useState } from "react";
import styles from "./ViewStory.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import Stories from "react-insta-stories";

function ViewStory({ setShowStory, storyData }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const storiesRef = useRef(null);

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

  // Ensure storyData is provided and has the 'story' field
  const stories = storyData?.story || [];

  // Transform stories into the required format for react-insta-stories
  const formattedStories = stories.map((story) => ({
    url: story.image,
    header: story.heading,
    text: story.description
  }));

  return (
    <div className={styles.mainDiv}>
      {currentStoryIndex > 0 && (
        <GrPrevious className={styles.prev} onClick={goToPrevious} />
      )}
      {currentStoryIndex < formattedStories.length - 1 && (
        <GrNext className={styles.next} onClick={goToNext} />
      )}
      <div className={styles.mainContainer}>
        <IoCloseSharp className={styles.close} onClick={() => setShowStory(false)} />
        <FiSend className={styles.send} />
        <div className={styles.storiesDiv}>
          <Stories
            stories={formattedStories}
            defaultInterval={3000}
            width={"100%"}
            height={"100%"}
            ref={storiesRef}
            onStoryEnd={handleStoryEnd}
            currentIndex={currentStoryIndex}
          />
        </div>

        <div className={styles.contentDiv}>
          <h3>{stories[currentStoryIndex]?.heading}</h3>
          <span>{stories[currentStoryIndex]?.description}</span>
        </div>
        <FaBookmark className={styles.bookmark} />
        <FcLike className={styles.like} /><p className={styles.totLike}>1025</p>
      </div>
    </div>
  );
}

export default ViewStory;
