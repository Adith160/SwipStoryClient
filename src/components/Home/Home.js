import React from 'react'
import Categories from '../Categories/Categories'
import TopStories from '../TopStories/TopStories'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.mainDiv}>
      <Categories />
      <TopStories type='Food'/>
      <TopStories type='World'/>
    </div>
  )
}

export default Home