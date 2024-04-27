import React, { useEffect, useState } from 'react';
import Categories from '../Categories/Categories';
import TopStories from '../TopStories/TopStories';
import styles from './Home.module.css';
import { getAllStoriesByCategory } from '../../api/storyApi';

function Home() {
  const [categories, setCategories] = useState(['Medical', 'Fruit', 'India', 'World']);
  const [storiesData, setStoriesData] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const stories = await Promise.all(categories.map(category => getAllStoriesByCategory(category)));
        setStoriesData(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
        // Handle error
      }
    };

    fetchStories();
  }, [categories]);

  return (
    <div className={styles.mainDiv}>
      <Categories />
      {storiesData.map((stories, index) => (
        <TopStories key={index} type={categories[index]} stories={stories} />
      ))}
    </div>
  );
}

export default Home;
