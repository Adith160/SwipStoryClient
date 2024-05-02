import React, { useState, useEffect } from "react";
import styles from "./AddStory.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { createStory, getStoryById, updateStory } from "../../api/storyApi";

function AddStory({
  setShowAddStory,
  ShowAddStory,
  isMobile,
  rerenderHome,
  EditStory,
  StoryId,
  setShowSpinner
}) {
  const [slides, setSlides] = useState([
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
  ]);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const categories = ["Medical", "Fruit", "World", "India"];

  useEffect(() => {
    if (EditStory && StoryId) {
      const fetchStory = async () => {
        try {
          setShowSpinner(true);
          const storyData = await getStoryById(StoryId);
          if (storyData) {
            setSlides(storyData.story);
          }
          setShowSpinner(false);
        } catch (error) {
          setShowSpinner(true);
          toast.error("Error fetching story:", error);
        }
      };
      fetchStory();
    }
  }, [EditStory, StoryId, setShowSpinner]);

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides((prevSlides) => [
        ...prevSlides,
        { heading: "", description: "", image: "", category: "" },
      ]);
    }
  };

  const handleInputChange = (field, value) => {
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      updatedSlides[selectedSlide][field] = value;
      return updatedSlides;
    });
  };

  const goToNextSlide = () => {
    setSelectedSlide((prevSlide) => Math.min(prevSlide + 1, slides.length - 1));
  };

  const goToPrevSlide = () => {
    setSelectedSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleCloseSlide = (index) => {
    setSlides((prevSlides) => {
      const updatedSlides = prevSlides.filter((slide, i) => i !== index);
      const newSelectedSlide = Math.min(
        selectedSlide,
        updatedSlides.length - 1
      );
      const orderedSlides = updatedSlides.map((slide, i) => ({
        ...slide,
        name: `Slide ${i + 1}`,
      }));
      setSelectedSlide(newSelectedSlide);
      return orderedSlides;
    });
  };

  const validateSlides = () => {
    // Check if there are exactly 3 slides
    if (slides.length < 3) {
      toast.error("Please fill exactly 3 slides.", { autoClose: 2000 });
      return false;
    }

    if (
      slides.some(
        (slide) =>
          !slide.heading ||
          !slide.description ||
          !slide.image ||
          !slide.category
      )
    ) {
      toast.error("All fields of all slides must be filled.", {
        autoClose: 2000,
      });
      return false;
    }
    const slideCategory = slides[0].category;
    if (slides.some((slide) => slide.category !== slideCategory)) {
      toast.error("All slides should have the same category.", {
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  const handlePost = async () => {
    if (validateSlides()) {
      try {
        setShowSpinner(true);
        if (EditStory) {
          // Remove _id from each slide
          const updatedSlides = slides.map(({ _id, ...rest }) => rest);
          await updateStory(
             StoryId ,
            {
              story: updatedSlides,
              category: updatedSlides[0].category,
            }
          );
          toast.success("Story updated successfully.", { autoClose: 2000 });
        } else {
          await createStory({ story: slides, category: slides[0].category });
          toast.success("Story added successfully.", { autoClose: 2000 });
        }
        setShowSpinner(false);
        setShowAddStory(!ShowAddStory);
        rerenderHome();
      } catch (error) {
        setShowSpinner(false);
        toast.error("Failed to add/update story. Please try again later.", {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline
          className={styles.close}
          onClick={() => setShowAddStory(!ShowAddStory)}
        />
        {isMobile ? (
          <h3 className={styles.heading2}>Add story to feed</h3>
        ) : (
          <h3 className={styles.message}>Add upto 6 slides</h3>
        )}
        <div className={styles.slideHeadingsDiv}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.slide} ${
                selectedSlide === index ? styles.selectedSlide : ""
              }`}
              onClick={() => setSelectedSlide(index)}
            >
              Slide {index + 1}
              {index > 2 && (
                <IoCloseCircleOutline
                  className={styles.closeSlide}
                  onClick={() => handleCloseSlide(index)}
                />
              )}
            </div>
          ))}
          {slides.length < 6 && (
            <div className={styles.slide} onClick={addSlide}>
              Add +
            </div>
          )}
        </div>
        <form>
          <div className={styles.inputDiv}>
            <b>Heading :</b>{" "}
            <input
              placeholder="Your heading"
              value={slides[selectedSlide].heading}
              onChange={(e) => handleInputChange("heading", e.target.value)}
              name="heading"
            />
          </div>
          <div className={` ${styles.textareaDiv} ${styles.inputDiv}`}>
            <b>Description :</b>{" "}
            <textarea
              placeholder="Story Description"
              value={slides[selectedSlide].description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              name="Desc"
            />
          </div>
          <div className={styles.inputDiv}>
            <b>Image :</b>{" "}
            <input
              placeholder="Add Image url"
              value={slides[selectedSlide].image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              name="image"
            />
          </div>
          <div className={styles.inputDiv}>
            <b>Category :</b>
            <select
              value={slides[selectedSlide].category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              name="cat"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handlePost}>
            {EditStory ? "Update" : "Post"}
          </button>
        </form>
        {isMobile ? (
          ""
        ) : (
          <div className={styles.btnDiv}>
            <button className={styles.green} onClick={goToPrevSlide}>
              Previous
            </button>
            <button className={styles.blue} onClick={goToNextSlide}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStory;
