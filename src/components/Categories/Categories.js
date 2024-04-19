import React from 'react'
import styles from './Categories.module.css'
import AllImg from '../../assets/images/AllCat.png'
import WorldImg from '../../assets/images/WorldCat.png'
import FruitImg from '../../assets/images/FruitCat.png'
import MedImg from '../../assets/images/MedCat.png'
import IndiaImg from '../../assets/images/IndiaCat.png'

function Categories() {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.catDiv}>
            <img src={AllImg} alt='all'/>
            <span>All</span>
        </div>
        <div className={styles.catDiv}>
            <img src={MedImg} alt='medicine'/>
            <span>Medical</span>
        </div>
        <div className={styles.catDiv}>
            <img src={FruitImg} alt='fruits'/>
            <span>Fruits</span>
        </div>
        <div className={styles.catDiv}>
            <img src={WorldImg} alt='world'/>
            <span>World</span>
        </div>
        <div className={styles.catDiv}>
            <img src={IndiaImg} alt='india'/>
            <span>India</span>
        </div>
    </div>
  )
}

export default Categories