import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BookSlider.module.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Row, Col } from 'antd';
import CardComponent from '../Card/CardComponent';
import Wrapper from '../../UI/Wrapper';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getRecommendBook } from '../../redux/apiCalls';

const BookSlider = (props) => {
  // const [listBook, setListBook] = useState([])
  const listBook = useSelector((state) =>
    props.type === 'recommend'
      ? state.product.recommendList
      : state.product.products
  );
  const dispatch = useDispatch();

  const totalSilde =
    listBook.length > 0 && listBook.length % 6 == 0
      ? listBook.length / 6
      : listBook.length / 6 + 1;
  const col = 6;
  const renderList = Array.from({ length: totalSilde }, (_, i) =>
    listBook.slice(i * col, (i + 1) * col)
  );
  console.log('listBook', listBook);
  useEffect(() => {
    // const fetchListBook = async () => {
    //     const res = await axios.get('https://api.itbook.store/1.0/new')
    //     setListBook(res.data.books)
    // }
    // fetchListBook()
    if (props.type === 'recommend') {
      getRecommendBook(dispatch);
    }
    getProducts(dispatch);
  }, []);

  return (
    <>
      {listBook.length > 0 && (
        <Wrapper>
          <div className={styles.header}>
            <h3 className={styles.title}>
              {props.type === 'recommend' ? 'Recommend' : 'Our Bestsellers'}
            </h3>
            <Link to='/category' className={styles.link}>
              See More
            </Link>
          </div>

          <Swiper
            modules={[Navigation]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            //   autoplay={{ delay: 3000 }}
            navigation
          >
            {renderList.length > 0 &&
              renderList.map((item, index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <Row
                      key={item.isbn13 + index}
                      gutter={16}
                      className={styles.slider}
                    >
                      {item.map((book) => (
                        <Col
                          style={{ padding: '0 20px' }}
                          lg={4}
                          className={styles.item}
                        >
                          <CardComponent key={item.isbn13} book={book} />
                        </Col>
                      ))}
                    </Row>
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
          {props.line && <div className={styles.line}></div>}
        </Wrapper>
      )}
    </>
  );
};

export default BookSlider;
