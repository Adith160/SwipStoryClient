import React, { useEffect, useState } from 'react';
import Categories from '../Categories/Categories';
import TopStories from '../TopStories/TopStories';
import styles from './Home.module.css';
import { getAllStoriesByCategory } from '../../api/storyApi';
import ViewStory from '../../components/ViewStory/ViewStory';

function Home() {
  const [categories, setCategories] = useState(['Medical', 'Fruit', 'India', 'World']);
  const [storiesData, setStoriesData] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [selectedStoryData, setSelectedStoryData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const openStory = (storyData) => {
    setShowStory(true);
    setSelectedStoryData(storyData);
  };

  const filterStoriesByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.mainDiv}>
      <Categories filterStories={filterStoriesByCategory} />
      {storiesData.map((stories, index) => {
        if (selectedCategory === 'All' || selectedCategory === categories[index]) {
          return <TopStories key={index} type={categories[index]} stories={stories} openStory={openStory} />;
        }
        return null;
      })}
      {showStory && <ViewStory storyData={selectedStoryData} setShowStory={setShowStory} />}
    </div>
  );
}

export default Home;
