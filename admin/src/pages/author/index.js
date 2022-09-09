import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Table } from 'antd';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthorList,
  createAuthor,
  updateAuthor,
  deleteAuthorById,
} from '../../redux/apiCalls';
import { DeleteOutline } from '@material-ui/icons';

const Author = () => {
  const [newColumns, setNewColumns] = useState();
  const [type, setType] = useState({
    type: 'create',
    idUpdate: '',
  });

  const authorList = useSelector((state) => state.author.authorList);
  console.log('authorList', authorList);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const handleDelete = (id) => {
    deleteAuthorById(dispatch, id);
    getAuthorList(dispatch);
  };
  const onFinish = (values) => {
    console.log('values', values);
    if (type.type === 'create') {
      createAuthor(dispatch, values);
    } else {
      updateAuthor(dispatch, type.idUpdate, values);
    }
    form.resetFields();
    setIsModalVisible(false);
    getAuthorList(dispatch);
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
    getAuthorList(dispatch);

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
      <Table columns={newColumns} dataSource={authorList} />
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
            label='Author Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your author name!',
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

export default Author;
