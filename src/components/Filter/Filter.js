import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import styles from './Filter.module.css';

const Filter = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.header} onClick={() => setShow(!show)}>
        <h3 className={styles.title}>Title</h3>
        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <div className={styles.line}></div>
      {show && (
        <ul className={styles.filterList}>
          {props.list.map((item) => (
            <li className={styles.filterItem} key={item.id}>
              <Checkbox shape="curve" variant="thick" icon={ <img
            src="https://tiny.cc/tuotsz"
            alt="check mark"
        />} animation="rotate">{item.text}</Checkbox>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
