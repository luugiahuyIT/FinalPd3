import { fabClasses } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import styles from './DropDown.module.css'

const Dropdown = ({ item, display, close }) => {
   
    return (
         <ul style={{display: display}} className={styles.dropdown}>
             { item.map((submenu, index) => (
              <li key={index} className={styles.dropdownContent} onClick={close}>
                <Link className={styles.dropdownLink} to={`/management/${submenu.url}`} >{submenu.title}</Link>
              </li>
             ))}
        </ul>
    )
   }
   
   export default Dropdown;