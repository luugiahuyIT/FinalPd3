import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Wrapper from '../../UI/Wrapper'
import Filter from '../../components/Filter/Filter'
import styles from './ProductList.module.css'
import ListProduct from '../../components/ProductList/ProductList'
import { categories, author } from './data'
import { Select } from 'antd';
const { Option } = Select;

const wrapperStyle = {
    display: 'flex',
    marginTop: 50,
    height: 'fit-content'

}
const ProductList = (props) => {
  return (
    <>
        <Navbar />
        <Wrapper style={wrapperStyle}>
            <div className={styles.categories}>
               <Filter list={categories}/>
               <Filter list={author}/>
            </div>
            <div className={styles.productList}>
              <div className={styles.selectContainer}>
                  <Select defaultValue="1" style={{ width: 180 }} className={styles.select}>
                      <Option value="1">New</Option>
                      <Option value="2">Price low to high</Option>
                      <Option value="3">Price high to low</Option>
                </Select>
              </div>
                <ListProduct/>
            </div>
        </Wrapper>
        <Footer/>
    </>
  )
}

export default ProductList
