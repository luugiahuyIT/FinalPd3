import React from 'react';
import { Row, Col } from 'antd';
import './order.css'

const Detail = ({ item }) => {
  return (
    <div>
      {item.products.map((product) => (
        <Row gutter={16}>
          <Col className='gutter-row' lg={12} style={{ borderRadius: 10 }}>
            <div style={{width: '50%'}}>
              <img style={{width: '100%'}} src={product.img} alt='' />
            </div>
          </Col>
          <Col style={{width: '50%'}} className='gutter-row' lg={12}>
            <p style={{fontSize: 16}}>Book name: {product.title}</p>
            <p style={{fontSize: 16}}>
              Quantity: {product.quantity}
            </p>
            <p style={{fontSize: 16}}>Total: {product.price * product.quantity} $</p>
          </Col>
        </Row>
      ))}
        <div className='totalBill'>Total Bill: {item.amount} $</div>

    </div>
  );
};

export default Detail;
