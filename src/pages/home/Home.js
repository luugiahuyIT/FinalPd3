import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BookSlider from '../../components/BookSlider/BookSlider'
import Footer from '../../components/Footer/Footer'
import styles from './Home.module.css'
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <img className={styles.banner} src='https://cdn.waterstones.com/images/00233541-1920x533.jpeg' alt='banner' />
      <BookSlider line/>
      <BookSlider line/>
      <BookSlider line/>
      <BookSlider type='recommend' line={false}/>
      <Footer/>
    </div>
  )
}

export default Home
