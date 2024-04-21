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
  // Array of story objects
  const storiesData = [
    {
      image:
        "https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg",
      heading: "Heading 1",
      desc: "Inspirational designs, illustrations, and graphic elements from the world’s best designers.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg",
      heading: "Heading 2",
      desc: "Inspirational designs, illustrations, and graphic elements from the world’s best designers.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg",
      heading: "Heading 3",
      desc: "Inspirational designs, illustrations, and graphic elements from the world’s best designers.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg",
      heading: "Heading 4",
      desc: "Inspirational designs, illustrations, and graphic elements from the world’s best designers.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg",
      heading: "Heading 5",
      desc: "Description 5",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  return (
    <div className={styles.mainDiv}>
      <h2>Top Stories About {props.type}</h2>
      <div className={styles.storyContainer}>
        {storiesData
          .slice(0, showAll ? storiesData.length : 4)
          .map((story, index) => (
            <Story
              key={index}
              image={story.image}
              heading={story.heading}
              desc={story.desc}
            />
          ))}
      </div>
      {!showAll && <button onClick={() => setShowAll(true)}>See more</button>}
      {/* <p>No stories Available</p> */}
    </div>
  );
}

export default TopStories;
