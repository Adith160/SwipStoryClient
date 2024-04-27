import React, { useState } from "react";
import styles from "./TopStories.module.css";
import { FaRegEdit } from "react-icons/fa";

const Story = ({ image, heading, desc }) => {
  return (
    <div className={styles.storyDiv}>
      <img src={image} alt="img" />
      <span>
        <b>{heading}</b> <br />
        {desc}
      </span>
      <button><FaRegEdit/>Edit</button>
    </div>
  );
};

function TopStories(props) {
  const { type, stories } = props;
  const [showAll, setShowAll] = useState(false);

  return (
    <div className={styles.mainDiv}>
      <h2>Top Stories About {type}</h2>
      <div className={styles.storyContainer}>
        {stories.data && stories.data.length > 0 ? (
          stories.data
            .slice(0, showAll ? stories.data.length : 4)
            .map((story, index) => (
              <Story
                key={index}
                image={story.image}
                heading={story.heading}
                desc={story.desc}
              />
            ))
        ) : (
          <p>No stories available</p>
        )}
      </div>
      {!showAll && <button onClick={() => setShowAll(true)}>See more</button>}
    </div>
  );
}

export default TopStories;
