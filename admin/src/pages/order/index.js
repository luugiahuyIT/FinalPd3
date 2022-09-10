import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import '../productList/productList.css';
import './order.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderList,
  updateStatusOrder,
  deleteOrderById,
} from '../../redux/apiCalls';
import { DeleteOutline } from '@material-ui/icons';
import { orderDetail } from '../../redux/orderRedux';
import { Modal } from 'antd';
import Detail from './Detail'
const { TabPane } = Tabs;

const Order = () => {
  const orderList = useSelector((state) => state.order);
  const detail = useSelector((state) => state.order.orderDetail);

  console.log('orderList', orderList);
  const [newColumns, setNewColumns] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getOrderList(dispatch);
  }, [dispatch]);

  const handleDelete = (id, status) => {
    deleteOrderById(dispatch, id, status);
    getOrderList(dispatch);
  };

  const handleUpdateStatusNotApprove = (id) => {
    const status = {
      status: 'not approve',
    };
    updateStatusOrder(dispatch, id, status);
    getOrderList(dispatch);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);
  };

  const showDetail = (record) => {
    setIsModalVisible(true);
    console.log('record', record);
    dispatch(orderDetail(record));
  };

  const handleUpdateStatus = (record) => {
    const status = {
      status: 'approve',
    };
    updateStatusOrder(dispatch, record._id, status);
    getOrderList(dispatch);
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
              onClick={() => handleUpdateStatusNotApprove(record._id)}
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
              onClick={() => handleDelete(record._id, record.status)}
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
          <Table
            columns={newColumns}
            dataSource={orderList.orderAllList}
            onRow={record => {
              return {
                onDoubleClick: () => {
                  console.log('record', record);
                  showDetail({...record});
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab='Waiting' key='2'>
          <Table columns={newColumns} dataSource={orderList.orderWaitingList} />
        </TabPane>
        <TabPane tab='Approve' key='3'>
          <Table columns={newColumns} dataSource={orderList.orderApproveList} />
        </TabPane>
        <TabPane tab='Not Approve' key='4'>
          <Table
            columns={newColumns}
            dataSource={orderList.orderNotApproveList}
          />
        </TabPane>
        <TabPane tab='Delivered' key='5'>
          <Table
            columns={newColumns}
            dataSource={orderList.orderDeliveriedList}
          />
        </TabPane>
      </Tabs>
      <Modal
        title=''
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
      >
        <Detail item={detail}/>
      </Modal>
    </div>
  );
};

export default Order;
