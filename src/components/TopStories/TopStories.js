import React, { useState } from "react";
import styles from "./TopStories.module.css";
import { FaRegEdit } from "react-icons/fa";

const Story = ({ story, openStory, storyData }) => {
  const { heading, description, image } = story; // Destructuring story object
  return (
    <div className={styles.storyDiv} onClick={() => openStory(storyData)}>
      <img src={image} alt="img" />
      <span>
        <b>{heading}</b> <br />
        {description}
      </span>
      <button><FaRegEdit/>Edit</button>
    </div>
  );
};

function TopStories(props) {
  const { type, stories, openStory } = props;
  const [showAll, setShowAll] = useState(false);
  
  return (
    <div className={styles.mainDiv}>
      <h2>Top Stories About {type}</h2>
      <div className={styles.storyContainer}>
        {stories.data && stories.data.length > 0 ? (
          stories.data
            .slice(0, showAll ? stories.data.length : 4)
            .map((storyGroup, index) => (
              <Story
                key={index}
                story={storyGroup.story[0]} // Load only the first object from each storyGroup
                openStory={openStory}
                storyData={storyGroup}
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
