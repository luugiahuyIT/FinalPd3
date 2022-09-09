import React, { useState } from 'react';
import { Row, Col } from 'antd';
import styles from './Invoice.module.css';
import Modal from '../../components/Modal/Modal';
import ReactDOM from 'react-dom';

const Invoice = ({ item }) => {
  const [show, setShow] = useState(false);
  const portalElement = document.getElementById('appModal');
  return (
    <div className={styles.invoiceItem}>
      <Row gutter={16} style={{ borderBottom: '1px solid' }}>
        <Col className='gutter-row' lg={12}>
          <div className={styles.imageContainer}>
            <img className={styles.image} alt='' src={item.products[0].image} />
          </div>
        </Col>
        <Col className='gutter-row' lg={12}>
          {/* <p>Tên sản phẩm: {item.title}</p> */}
          <p>Mã đơn hàng: {item._id}</p>

          {/* <p>Số lượng: {item.quantity}</p> */}
          <p>Thời gian đặt hàng: {item.createdAt}</p>
          <p>Tổng đơn hàng: {item.amount}</p>
          <button className={styles.detail} onClick={() => setShow(true)}>
            Chi tiết đơn hàng
          </button>
        </Col>
      </Row>
      {ReactDOM.createPortal(
        <Modal item={item.products} show={show} onClose={() => setShow(false)} />,
        portalElement
      )}
    </div>
  );
};

export default Invoice;
