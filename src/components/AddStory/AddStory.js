import React, { useState } from "react";
import styles from "./AddStory.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function AddStory() {
  const isMobile = true; 
  const [slides, setSlides] = useState([
    { name: "Slide 1", heading: "", description: "", imageUrl: "", category: "" },
    { name: "Slide 2", heading: "", description: "", imageUrl: "", category: "" },
    { name: "Slide 3", heading: "", description: "", imageUrl: "", category: "" }
  ]);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const categories = ['Medical', 'Fruits', 'World', 'India'];

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

  const handleCloseSlide = (index) => {
    setSlides(prevSlides => {
      const updatedSlides = prevSlides.filter((slide, i) => i !== index);
      const newSelectedSlide = Math.min(selectedSlide, updatedSlides.length - 1);
      const orderedSlides = updatedSlides.map((slide, i) => ({
        ...slide,
        name: `Slide ${i + 1}`
      }));
      setSelectedSlide(newSelectedSlide);
      return orderedSlides;
    });
  };

  const validateSlides = () => {
    if (slides.some(slide => !slide.heading || !slide.description || !slide.imageUrl || !slide.category)) {
      toast.error("All fields of all slides must be filled.", { autoClose: 2000 });
      return false;
    }
    const slideCategory = slides[0].category;
    if (slides.some(slide => slide.category !== slideCategory)) {
      toast.error("All slides should have the same category.", { autoClose: 2000 });
      return false;
    }
    return true;
  };

  const handlePost = () => {
    if (validateSlides()) {
      localStorage.setItem("slidesData", JSON.stringify(slides));
      toast.success("Slides data stored successfully.", { autoClose: 2000 });
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <IoCloseCircleOutline className={styles.close} />
        <h3 className={styles.heading2}>Add story to feed</h3>
        <div className={styles.slideHeadingsDiv}>
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`${styles.slide} ${selectedSlide === index ? styles.selectedSlide : ""}`} 
              onClick={() => setSelectedSlide(index)}
            >
              {slide.name}
              {index > 2 && <IoCloseCircleOutline className={styles.closeSlide} onClick={() => handleCloseSlide(index)} />}
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
          <div className={` ${styles.textareaDiv} ${styles.inputDiv}`} >
            <b>Description :</b>{" "}
            <textarea placeholder="Story Description" value={slides[selectedSlide].description} onChange={e => handleInputChange("description", e.target.value)} />
          </div>
          <div className={styles.inputDiv}>
            <b>Image :</b> <input placeholder="Add Image url" value={slides[selectedSlide].imageUrl} onChange={e => handleInputChange("imageUrl", e.target.value)} />
          </div>
          <div className={styles.inputDiv}>
            <b>Category :</b> 
            <select value={slides[selectedSlide].category} onChange={e => handleInputChange("category", e.target.value)}>
              <option value="" disabled>Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handlePost}>Post</button>
        </form>
        {isMobile ? '' : 
         <div className={styles.btnDiv}>
         <button className={styles.green} onClick={goToPrevSlide}>Previous</button>
         <button className={styles.blue} onClick={goToNextSlide}>Next</button>
       </div>}
       
      </div>
    </div>
  );
}

export default AddStory;
