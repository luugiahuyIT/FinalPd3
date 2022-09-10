import React from 'react';
import styles from './InvoiceItem.module.css';
import { Row, Col } from 'antd';
// import 'antd/dist/antd.css'
const InvoiceItem = ({ item }) => {
  console.log('item', item);
  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col className='gutter-row' lg={10} style={{ borderRadius: 10 }}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={item.img} alt='' />
          </div>
        </Col>
        <Col className='gutter-row' lg={14}>
          <p className={styles.text}>Book name: {item.title}</p>
          <p className={styles.text} style={{}}>
            Quantity: {item.quantity}
          </p>
          <p className={styles.text}>Total: {item.price * item.quantity} $</p>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceItem;
