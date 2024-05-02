import React, { useEffect, useState, useMemo, useCallback } from "react";
import Categories from "../Categories/Categories";
import TopStories from "../TopStories/TopStories";
import styles from "./Home.module.css";
import { toast } from "react-toastify";
import {
  getAllStoriesByCategory,
  getMyStories,
  getBookmarkedStories,
} from "../../api/storyApi";
import ViewStory from "../../components/ViewStory/ViewStory";

function Home({
  setShowAddStory,
  ShowAddStory,
  setEditStory,
  setStoryId,
  isLogin,
  ShowBookmark,
  isMobile,
  setShowLogin,
  setShowSpinner,
}) {
  const categories = useMemo(() => ["Medical", "Fruit", "India", "World"], []);
  const [storiesData, setStoriesData] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [myStories, setMyStories] = useState([]);

  const fetchStories = useCallback(async () => {
    try {
      const promises = categories.map((category) =>
        getAllStoriesByCategory(category)
      );
      const responses = await Promise.all(promises);
      setStoriesData(responses);
    } catch (error) {
      toast.error("Error fetching stories:", error);
    }
  }, [categories]);

  const fetchBookmarkedStories = useCallback(async () => {
    try {
      setShowSpinner(true);
      const bookmarkedStories = await getBookmarkedStories();
      setStoriesData([bookmarkedStories]);
      setShowSpinner(false);
    } catch (error) {
      toast.error("Error fetching bookmarked stories:", error);
      setShowSpinner(false);
    }
  }, [setShowSpinner]);

  const fetchMyStories = async () => {
    try {
      const myStoriesData = await getMyStories();
      setMyStories(myStoriesData);
    } catch (error) {
      toast.error("Error fetching my stories:", error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      // Fetch and set myStories if logged in
      fetchMyStories();
    }
  }, [isLogin]);

  useEffect(() => {
    // Fetch stories when categories change or ShowBookmark changes
    if (!ShowBookmark) {
      fetchStories();
    } else if (ShowBookmark && isLogin) {
      fetchBookmarkedStories();
    }
  }, [categories, ShowBookmark, isLogin, fetchStories, fetchBookmarkedStories]);

  const refreshData = () => {
    if (!ShowBookmark) {
      fetchStories();
    } else if (ShowBookmark && isLogin) {
      fetchBookmarkedStories();
    }
    if (isLogin) {
      fetchMyStories();
    }
  };

  const openStory = (storyId) => {
    setShowStory(true);
    setSelectedStoryId(storyId);
  };

  const filterStoriesByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.mainDiv}>
      {!ShowBookmark && <Categories filterStories={filterStoriesByCategory} />}
      {isLogin && !ShowBookmark && selectedCategory === "All" && (
        <TopStories
          type="My Stories"
          stories={myStories}
          openStory={openStory}
          setShowAddStory={setShowAddStory}
          ShowAddStory={ShowAddStory}
          setEditStory={setEditStory}
          setStoryId={setStoryId}
          refreshData={refreshData}
          isMobile={isMobile}
        />
      )}
      {storiesData.map((stories, index) => {
        if (
          selectedCategory === "All" ||
          selectedCategory === categories[index]
        ) {
          return (
            <TopStories
              key={index}
              type={ShowBookmark ? "Bookmarks" : categories[index]}
              stories={stories}
              openStory={openStory}
              isMobile={isMobile}
            />
          );
        }
        return null;
      })}
      {showStory && (
        <ViewStory
          storyId={selectedStoryId}
          setShowStory={setShowStory}
          isMobile={isMobile}
          setShowLogin={setShowLogin}
          isLogin={isLogin}
          setShowSpinner={setShowSpinner}
        />
      )}
    </div>
  );
}

export default Home;
