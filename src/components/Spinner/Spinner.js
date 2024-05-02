import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div className={styles.mainDiv}>
        <RotatingLines 
          visible={true}
          height="36"
          width="46"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass="" />
    </div>
  )
}

export default Spinner