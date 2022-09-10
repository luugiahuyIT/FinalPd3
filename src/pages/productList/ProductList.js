import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Wrapper from '../../UI/Wrapper';
import Filter from '../../components/Filter/Filter';
import styles from './ProductList.module.css';
import ListProduct from '../../components/ProductList/ProductList';
import { categories, author } from './data';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthorAndCategories } from '../../redux/apiCalls';
const { Option } = Select;

const wrapperStyle = {
  display: 'flex',
  marginTop: 50,
  height: 'fit-content',
};
const ProductList = (props) => {
  const [search, setSearch] = useState({});
  const dispatch = useDispatch();

  const authors = useSelector((state) => state.filter.authorList);
  const categories = useSelector((state) => state.filter.categoryList);
  console.log('authors',authors)
  console.log('categories',categories)

  useEffect(() => {
    getAuthorAndCategories(dispatch);
  }, []);

  const handleChange = (e) => {
    setSearch((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangeSelect = (value) => {
    if (value.length === 0) {
      setSearch({});
    }
  };
  return (
    <>
      <Navbar />
      <Wrapper style={wrapperStyle}>
        <div className={styles.categories}>
          <Filter type='category' onClick={handleChange} list={categories} />
          <Filter type='author' onClick={handleChange} list={authors} />
        </div>
        <div className={styles.productList}>
          <div className={styles.selectContainer}>
            {/* <Select
              defaultValue='1'
              style={{ width: 180 }}
              className={styles.select}
            >
              <Option value='1'>New</Option>
              <Option value='2'>Price low to high</Option>
              <Option value='3'>Price high to low</Option>
            </Select> */}
            <Select
              className={styles.select}
              style={{ width: '20%' }}
              mode='multiple'
              size='middle'
              placeholder='Please select'
              value={Object.values(search)}
              onChange={handleChangeSelect}
              allowClear
            ></Select>
          </div>
          <ListProduct params={search} />
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default ProductList;
