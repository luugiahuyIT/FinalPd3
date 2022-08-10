import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import CardComponent from '../Card/CardComponent'
import styles from './ProductList.module.css'
const ProductList = (props) => {
    const [productList, setProductList] = useState([])
    const total = productList.length > 0 && (productList.length%4 ===0 ? productList.length%4 : productList.length/4 + 1)
    const col = 4
    const renderList = Array.from({length: total}, (_,i) => (
        productList.slice(i * col, (i + 1) * col)
    ))

    useEffect(() => {
        const fetchListBook = async () => {
            const res = await axios.get('https://api.itbook.store/1.0/search/mongodb')
            setProductList(res.data.books)
        }
        fetchListBook()
    },[])

  return (
    <>
      {renderList.map((item, index) => (
         <Row key={item.isbn13 + (index+'')} gutter={16} className={styles.row}> 
            {item.map(book => (
             <Col style={{padding: '0 20px' }} lg={6} >
                 <CardComponent key={item.isbn13} book={book}/>
             </Col>
            ))}
        </Row>
      ))}
    </>

  )
}

export default ProductList
