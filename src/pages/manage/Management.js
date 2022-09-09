import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './Management.module.css';
import { Tabs, Select } from 'antd';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoiceList } from '../../redux/apiCalls';

import Invoice from '../invoice/Invoice';
const { TabPane } = Tabs;
const { Option } = Select;

const Management = () => {
  const invoice = useSelector((state) => state.invoice);
  const user = useSelector((state) => state.user.currentUser);
  console.log('invoice', invoice);
  const dispatch = useDispatch();
  const handleChange = () => {};
  useEffect(() => {
    if (user) {
      getInvoiceList(dispatch, user._id);
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Select
          defaultValue='lucy'
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value='jack'>Jack</Option>
          <Option value='lucy'>Lucy</Option>
          <Option value='disabled' disabled>
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
            {invoice.invoiceAllList.map((item) => (
              <Invoice item={item} />
            ))}
          </TabPane>
          <TabPane tab='Waiting' key='2'>
            {invoice.invoiceWaitingList.map((item) => (
              <Invoice item={item} />
            ))}
          </TabPane>
          <TabPane tab='Approve' key='3'></TabPane>
          <TabPane tab='Delivered' key='4'></TabPane>
        </Tabs>
        <div style={{ margin: '20px auto' }}>
          <Pagination defaultCurrent={6} total={50} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Management;
