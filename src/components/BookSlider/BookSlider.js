import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styles from './BookSlider.module.css'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Row, Col } from 'antd'
import CardComponent from '../Card/CardComponent'
import Wrapper from '../../UI/Wrapper'
import 'antd/dist/antd.css';


const BookSlider = (props) => {
    const [listBook, setListBook] = useState([])
    const totalSilde = listBook.length > 0 && listBook.length/6
    const col = 6
    const renderList = Array.from({length: totalSilde}, (_,i) => (
        listBook.slice(i * col, (i + 1) * col)
    ))

    useEffect(() => {
        const fetchListBook = async () => {
            const res = await axios.get('https://api.itbook.store/1.0/new')
            setListBook(res.data.books)
        }
        fetchListBook()
    },[])

  return (
    <Wrapper>
        <div className={styles.header}>
            <h3 className={styles.title}>Our Bestsellers</h3> 
            <Link to='/' className={styles.link}>
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
      {renderList.map((item, index) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <Row key={item.isbn13 + index} gutter={16} className={styles.slider}> 
                {item.map(book => (
                    <Col style={{padding: '0 20px' }} lg={4} className={styles.item}>
                        <CardComponent key={item.isbn13} book={book}/>
                    </Col>
                ))}
           </Row>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
    {props.line && <div className={styles.line}></div> }
    </Wrapper>
  )
}

export default BookSlider
