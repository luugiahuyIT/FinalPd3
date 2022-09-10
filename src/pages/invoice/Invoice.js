import React, { useState } from 'react';
import { Row, Col } from 'antd';
import styles from './Invoice.module.css';
import Modal from '../../components/Modal/Modal';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { deleteOrder } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const Invoice = ({ item }) => {
  const [show, setShow] = useState(false);
  const portalElement = document.getElementById('appModal');
  const dispatch = useDispatch();

  const deleteHanlder = (id) => {
    deleteOrder(id, dispatch);
  };
  return (
    <div className={styles.invoiceItem}>
      <Row gutter={16} style={{ borderBottom: '1px solid' }}>
        {/* <Col className='gutter-row' lg={12}>
          <div className={styles.imageContainer}>
            <img className={styles.image} alt='' src={item.products[0].image} />
          </div>
        </Col> */}
        <Col className='gutter-row' lg={12}>
          {/* <p>Tên sản phẩm: {item.title}</p> */}
          <p>Code: {item._id}</p>
          {/* <p>Số lượng: {item.quantity}</p> */}
          <p>Time Order: {item.createdAt}</p>
          <p>Total Bill: {item.amount} $</p>
          <button className={styles.detail} onClick={() => setShow(true)}>
            Chi tiết đơn hàng
          </button>
          {item.status === 'waiting' && (
            <button
              style={{ backgroundColor: 'red' }}
              className={styles.detail}
              onClick={() => deleteHanlder(item._id)}
            >
              Remove
            </button>
          )}
        </Col>
      </Row>
      {ReactDOM.createPortal(
        <Modal
          total={item.amount}
          item={item.products}
          show={show}
          onClose={() => setShow(false)}
        />,
        portalElement
      )}
    </div>
  );
};

export default Invoice;
