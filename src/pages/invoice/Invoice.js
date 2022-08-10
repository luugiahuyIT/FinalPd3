import React, {useState} from 'react';
import { Row, Col } from 'antd';
import styles from './Invoice.module.css';
import Modal from '../../components/Modal/Modal';
import  ReactDOM  from 'react-dom'

const Invoice = ({item}) => {
  const [show, setShow] = useState(false)
  const portalElement = document.getElementById('appModal')
  return (
    <div className={styles.invoiceItem}>
      <Row gutter={16} style={{ borderBottom: '1px solid' }}>
        <Col className='gutter-row' lg={12}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              alt=''
              src={item.image}
            />
          </div>
        </Col>
        <Col className='gutter-row' lg={12}>
          <p>Tên sản phẩm: {item.title}</p>
          <p>Số lượng: {item.quantity}</p>
          <p>Thời gian đặt hàng</p>
          <p>Tổng đơn hàng: {item.total}</p>
          <button className={styles.detail} onClick={() => setShow(true)}>
            Chi tiết đơn hàng
          </button>
        </Col>
      </Row>
      {ReactDOM.createPortal(<Modal item={item} show={show} onClose={() => setShow(false)}/>, portalElement)}

    </div>
  );
};

export default Invoice;
