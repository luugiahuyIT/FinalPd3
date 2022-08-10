import React from 'react'
import styles from './index.module.css'

const index = (props) => {
  return (
    <div className={styles.wrapper} style={props.style}>
      {props.children}
    </div>
  )
}

export default index
