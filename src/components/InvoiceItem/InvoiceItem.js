import React from 'react';
import styles from './InvoiceItem.module.css';
import { Row, Col } from 'antd';
// import 'antd/dist/antd.css'
const InvoiceItem = ({item}) => {
  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col className='gutter-row' lg={10} style={{borderRadius: 10}}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={item.img}
              alt=''
            />
          </div>
        </Col>
        <Col className='gutter-row' lg={14}>
            <p className={styles.text}>{item.title}</p>
            <p style={{}}>{item.quantity}</p>
            <p>Thành tiền:{item.total}</p>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceItem;
