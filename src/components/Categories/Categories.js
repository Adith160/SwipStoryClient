import React, { useState } from "react";
import styles from "./Categories.module.css";
import AllImg from "../../assets/images/AllCat.png";
import WorldImg from "../../assets/images/WorldCat.png";
import FruitImg from "../../assets/images/FruitCat.png";
import MedImg from "../../assets/images/MedCat.png";
import IndiaImg from "../../assets/images/IndiaCat.png";

function Categories({ filterStories, selectedCategory }) {
  const handleCategoryClick = (category) => {
    filterStories(category);
    setSelected(category);
  };
  const [Selected, setSelected] = useState("All");
  return (
    <div className={styles.mainDiv}>
      <div
        className={styles.catDiv}
        style={
            Selected === "All" ? { border: "3px solid #00ACD2" } : {}
        }
        onClick={() => handleCategoryClick("All")}
      >
        <img src={AllImg} alt="all" />
        <span>All</span>
      </div>
      <div
        className={styles.catDiv}
        style={
            Selected === "Medical" ? { border: "3px solid #00ACD2" } : {}
        }
        onClick={() => handleCategoryClick("Medical")}
      >
        <img src={MedImg} alt="medicine" />
        <span>Medical</span>
      </div>
      <div
        className={styles.catDiv}
        style={
            Selected === "Fruit" ? { border: "3px solid #00ACD2" } : {}
        }
        onClick={() => handleCategoryClick("Fruit")}
      >
        <img src={FruitImg} alt="fruits" />
        <span>Fruits</span>
      </div>
      <div
        className={styles.catDiv}
        style={
            Selected === "World" ? { border: "3px solid #00ACD2" } : {}
        }
        onClick={() => handleCategoryClick("World")}
      >
        <img src={WorldImg} alt="world" />
        <span>World</span>
      </div>
      <div
        className={styles.catDiv}
        style={
            Selected === "India" ? { border: "3px solid #00ACD2" } : {}
        }
        onClick={() => handleCategoryClick("India")}
      >
        <img src={IndiaImg} alt="india" />
        <span>India</span>
      </div>
    </div>
  );
}

export default Categories;
