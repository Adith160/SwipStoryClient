import React, { useState } from "react";
import styles from "./AddStory.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";

function AddStory() {
  const [slides, setSlides] = useState([
    { name: "Slide 1", heading: "", description: "", imageUrl: "", category: "" },
    { name: "Slide 2", heading: "", description: "", imageUrl: "", category: "" },
    { name: "Slide 3", heading: "", description: "", imageUrl: "", category: "" }
  ]);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides(prevSlides => [
        ...prevSlides,
        { name: `Slide ${prevSlides.length + 1}`, heading: "", description: "", imageUrl: "", category: "" }
      ]);
    }
  };

  const handleInputChange = (field, value) => {
    setSlides(prevSlides => {
      const updatedSlides = [...prevSlides];
      updatedSlides[selectedSlide][field] = value;
      return updatedSlides;
    });
  };

  const goToNextSlide = () => {
    setSelectedSlide(prevSlide => Math.min(prevSlide + 1, slides.length - 1));
  };

  const goToPrevSlide = () => {
    setSelectedSlide(prevSlide => Math.max(prevSlide - 1, 0));
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline className={styles.close} />
        <span className={styles.message}> olasjo</span>
        <div className={styles.slideHeadingsDiv}>
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`${styles.slide} ${selectedSlide === index ? styles.selectedSlide : ""}`} 
              onClick={() => setSelectedSlide(index)}
            >
              {slide.name}
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
            <b>Heading :</b> <input placeholder="Your heading" value={slides[selectedSlide].heading} onChange={e => handleInputChange("heading", e.target.value)} />
          </div>
          <div className={styles.inputDiv} style={{ height: "48%" }}>
            <b>Description :</b>{" "}
            <textarea placeholder="Story Description" value={slides[selectedSlide].description} onChange={e => handleInputChange("description", e.target.value)} />
          </div>
          <div className={styles.inputDiv}>
            <b>Image :</b> <input placeholder="Add Image url" value={slides[selectedSlide].imageUrl} onChange={e => handleInputChange("imageUrl", e.target.value)} />
          </div>
          <div className={styles.inputDiv}>
            <b>Category :</b> <input placeholder="Select category" value={slides[selectedSlide].category} onChange={e => handleInputChange("category", e.target.value)} />
          </div>
          <button>Post</button>
        </form>
        <div className={styles.btnDiv}>
          <button className={styles.green} onClick={goToPrevSlide}>Previous</button>
          <button className={styles.blue} onClick={goToNextSlide}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default AddStory;
