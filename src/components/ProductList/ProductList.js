import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import CardComponent from '../Card/CardComponent';
import styles from './ProductList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/apiCalls';
const ProductList = ({ params }) => {
  // const [productList, setProductList] = useState([])
  const listBook = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const totalSilde = listBook.length > 0 && listBook.length / 4;
  const col = 4;
  const renderList = Array.from({ length: totalSilde }, (_, i) =>
    listBook.slice(i * col, (i + 1) * col)
  );
  console.log('listBook',listBook)
  useEffect(() => {
    // const fetchListBook = async () => {
    //     const res = await axios.get('https://api.itbook.store/1.0/new')
    //     setListBook(res.data.books)
    // }
    // fetchListBook()
    getProducts(dispatch,params);
  }, [params]);

  return (
    <>
      {renderList.map((item, index) => (
        <Row
          key={item.isbn13 + (index + '')}
          gutter={16}
          className={styles.row}
        >
          {item.map((book) => (
            <Col style={{ padding: '0 20px' }} lg={6}>
              <CardComponent key={item.isbn13} book={book} />
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default ProductList;
