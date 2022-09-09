import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import '../productList/productList.css';
import './order.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderList, updateStatusOrder } from '../../redux/apiCalls';
import { DeleteOutline } from '@material-ui/icons';

const { TabPane } = Tabs;

const Order = () => {
  const orderList = useSelector((state) => state.order);
  console.log('orderList', orderList);
  const [newColumns, setNewColumns] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getOrderList(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // deleteProduct(id, dispatch);
  };

  const handleUpdateStatus = (record) => {
    const status = {
      status: 'approve',
    };
    updateStatusOrder(dispatch, record._id, status);
  };
  useEffect(() => {
    setNewColumns([
      ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <>
            <button
              // onClick={() => handleUpdateStatus(record._id)}
              className='productListEdit'
              style={{ backgroundColor: 'red' }}
            >
              Not Approve
            </button>
            <button
              onClick={() => handleUpdateStatus(record)}
              className='productListEdit'
            >
              Approve
            </button>
            <DeleteOutline
              className='productListDelete'
              onClick={() => handleDelete(record._id)}
            />
          </>
        ),
      },
    ]);
  }, []);
  return (
    <div className='productList'>
      <Tabs
        type='card'
        defaultActiveKey='1'
        size='large'
        tabBarStyle={{ margin: 'auto' }}
      >
        <TabPane tab='All' key='1'>
          <Table columns={newColumns} dataSource={orderList.orderAllList} />
        </TabPane>
        <TabPane tab='Waiting' key='2'>
          <Table columns={newColumns} dataSource={orderList.orderWaitingList} />
        </TabPane>
        <TabPane tab='Approve' key='3'>
          <Table columns={newColumns} dataSource={orderList.orderApproveList} />
        </TabPane>
        {/* <TabPane columns={newColumns} dataSource={orderList.orderAllList} tab='Delivered' key='4'></TabPane> */}
      </Tabs>
    </div>
  );
};

export default Order;
