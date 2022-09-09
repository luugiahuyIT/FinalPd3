import React from 'react';
import { Card } from 'antd';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
// const { Meta } = Card;
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux'

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { style } from '@mui/system';

const CardComponent = ({ book }) => {
  const dispatch = useDispatch();

  return (
    // <div className={styles.cardWrapper}>
    <Card
      style={{ width: '100%', border: 'none', padding: 0 }}
      cover={
          <Link to='/'>
            <div className={styles.cardWrapper}>
              <img alt='example' src={book.img} />
              <div className={styles.info}>
                <Icon>
                  <ShoppingCartOutlined onClick={()=>dispatch(addProduct({...book, quantity: 1 }))}/>
                </Icon>
                <Icon>
                  <Link to={`/book/${book._id}`}>
                    <SearchOutlined />
                  </Link>
                </Icon>
                <Icon>
                  <FavoriteBorderOutlined />
                </Icon>
              </div>
            </div>
          </Link>
      }
    >
      <div className={styles.container}>
        <h3 className={styles.title}>{book.title}</h3>
        <Link to='/' className={styles.link}>
          {book.author}
        </Link>
        <p className={styles.price}>{book.price} $</p>
        {/* <p className={styles.price}>sale {book.price}</p> */}

      </div>
    </Card>
    // </div>
  );
};

export default CardComponent;
