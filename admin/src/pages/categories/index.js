import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Table } from 'antd';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from '../../redux/apiCalls';
import { DeleteOutline } from '@material-ui/icons';

const Categories = () => {
  const [newColumns, setNewColumns] = useState();
  const [type, setType] = useState({
    type: 'create',
    idUpdate: '',
  });

  const categories = useSelector((state) => state.category.categories);
  console.log('authorList', categories);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const handleDelete = (id) => {
    deleteCategoryById(dispatch, id);
    getCategoryList(dispatch);
  };
  const onFinish = (values) => {
    console.log('values', values);
    if (type.type === 'create') {
      createCategory(dispatch, values);
    } else {
      updateCategory(dispatch, type.idUpdate, values);
    }
    form.resetFields();
    setIsModalVisible(false);
    getCategoryList(dispatch);
  };

  const handleUpdate = (record) => {
    console.log('record', record);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: record.name,
    });
    setType({
      type: 'update',
      idUpdate: record._id,
    });
  };

  useEffect(() => {
    getCategoryList(dispatch);

    setNewColumns([
      ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <>
            <button
              onClick={() => handleUpdate(record)}
              className='productListEdit'
            >
              Edit
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
      <button
        onClick={() => {
          setIsModalVisible(true);
          setType({
            type: 'create',
            idUpdate: '',
          });
        }}
        className='productListEdit'
      >
        Create
      </button>
      <Table columns={newColumns} dataSource={categories} />
      <Modal
        title='Basic Modal'
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
          form={form}
        >
          <Form.Item
            label='Category Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your category name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
