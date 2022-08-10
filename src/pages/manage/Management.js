import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './Management.module.css';
import { Tabs, Select } from 'antd';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux'

import Invoice from '../invoice/Invoice';
const { TabPane } = Tabs;
const { Option } = Select;

const Management = () => {
  const invoice = useSelector(state=> state.invoice.invoiceList)
  console.log('invoice', invoice)
  const handleChange = () => {

  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
    </Select>
        <Tabs
          type='card'
          defaultActiveKey='1'
          size='large'
          tabBarStyle={{ margin: 'auto' }}
        >
          <TabPane tab='All' key='1'>
            {invoice.map(item => item.map(item => <Invoice item={item} />)) }
            
          </TabPane>
          <TabPane tab='Waiting' key='2'>
          </TabPane>
          <TabPane tab='Waiting' key='2'>
          </TabPane>
          <TabPane tab='Delivered' key='3'>
          </TabPane>
        </Tabs>
      <div style={{margin: '20px auto'}}>
       <Pagination  defaultCurrent={6} total={50} />

      </div>
      </div>
      <Footer />
    </>
  );
};

export default Management;
