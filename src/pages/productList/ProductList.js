import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Wrapper from '../../UI/Wrapper';
import Filter from '../../components/Filter/Filter';
import styles from './ProductList.module.css';
import ListProduct from '../../components/ProductList/ProductList';
import { categories, author } from './data';
import { Select } from 'antd';
const { Option } = Select;

const wrapperStyle = {
  display: 'flex',
  marginTop: 50,
  height: 'fit-content',
};
const ProductList = (props) => {
  const [search, setSearch] = useState({});

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
          <Filter type='author' onClick={handleChange} list={author} />
        </div>
        <div className={styles.productList}>
          <div className={styles.selectContainer}>
            <Select
              defaultValue='1'
              style={{ width: 180 }}
              className={styles.select}
            >
              <Option value='1'>New</Option>
              <Option value='2'>Price low to high</Option>
              <Option value='3'>Price high to low</Option>
            </Select>
            <Select
              mode='multiple'
              size='middle'
              placeholder='Please select'
              value={Object.values(search)}
              onChange={handleChangeSelect}
              allowClear
              style={{
                width: '30%',
              }}
            >
            </Select>
          </div>
          <ListProduct params={search}/>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default ProductList;
