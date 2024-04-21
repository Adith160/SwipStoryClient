import React, { useRef, useState } from "react";
import styles from "./ViewStory.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import Stories from "react-insta-stories";

function ViewStory() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const storiesRef = useRef(null);

  const stories = [
    "https://cdn.pixabay.com/photo/2018/05/09/06/49/lens-3384657_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/13/02/59/camera-597884_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/09/06/49/lens-3384657_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/13/02/59/camera-597884_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/09/06/49/lens-3384657_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/13/02/59/camera-597884_1280.jpg",
  ];

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

  return (
    <div className={styles.mainDiv}>
      {currentStoryIndex > 0 && (
        <GrPrevious className={styles.prev} onClick={goToPrevious} />
      )}
      {currentStoryIndex < stories.length - 1 && (
        <GrNext className={styles.next} onClick={goToNext} />
      )}
      <div className={styles.mainContainer}>
        <IoCloseSharp className={styles.close} />
        <FiSend className={styles.send} />
        <div className={styles.storiesDiv}>
          <Stories
            stories={stories}
            defaultInterval={3000}
            width={"100%"}
            height={"100%"}
            ref={storiesRef}
            onStoryEnd={handleStoryEnd}
            currentIndex={currentStoryIndex}
          />
        </div>

        <div className={styles.contentDiv}>
          <h3>Heading comes here</h3>
          <span>
            Inspirational designs, illustrations, and graphic elements from the
            world’s best designers.
          </span>
        </div>
        <FaBookmark className={styles.bookmark} />
        <FcLike className={styles.like} /><p className={styles.totLike}>1025</p>
      </div>
    </div>
  );
}

export default ViewStory;
