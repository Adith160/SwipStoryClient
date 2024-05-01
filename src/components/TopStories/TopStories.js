import React, { useState } from "react";
import styles from "./TopStories.module.css";
import { FaRegEdit } from "react-icons/fa";

const Story = ({
  story,
  openStory,
  storyData,
  editable,
  setShowAddStory,
  ShowAddStory,
  setEditStory,
  setStoryId,
}) => {
  const { heading, description, image } = story; // Destructuring story object
  return (
    <div className={styles.storyDiv} onClick={() => openStory(storyData._id)}>
      <img src={image} alt="img" />
      <span>
        <b>{heading}</b> <br />
        {description}
      </span>
      {editable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAddStory(!ShowAddStory);
            setEditStory(true);
            setStoryId(storyData._id);
          }}
        >
          <FaRegEdit />
          Edit
        </button>
      )}
    </div>
  );
};

function TopStories(props) {
  const {
    type,
    stories,
    openStory,
    setShowAddStory,
    ShowAddStory,
    setEditStory,
    setStoryId,
  } = props;
  const [showAll, setShowAll] = useState(false);

  // Empty array as second argument makes this effect run only once after initial render

  return (
    <div className={styles.mainDiv}>
      {type === "Bookmarks" ? (
        <h2>Your {type}</h2>
      ) : type === "My Stories" ? (
        <h2>Your Stories</h2>
      ) : (
        <h2>Top Stories About {type}</h2>
      )}
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
                editable={type === "My Stories" ? true : false}
                setShowAddStory={setShowAddStory}
                ShowAddStory={ShowAddStory}
                setEditStory={setEditStory}
                setStoryId={setStoryId}
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
