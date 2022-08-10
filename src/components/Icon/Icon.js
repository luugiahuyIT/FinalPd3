import React from 'react'
import styles from './Icon.module.css'
const Icon = (props) => {
  return (
    <div className={styles.icon}>
        {props.children}
    </div>
  )
}

export default Icon
