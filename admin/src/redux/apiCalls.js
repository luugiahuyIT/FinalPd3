import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  addUserFailure,
  addUserSuccess,
  addUserStart,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from './userRedux';
import { publicRequest, userRequest } from '../api/request';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from './productRedux';

import { getOrder, deleteOrder } from './orderRedux';
import { getAuthor, deleteAuthor } from './authorRedux';
import { getCategories, deleteCategory } from './categoryRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    console.log('res', res);
    const { accessToken, _id } = res.data;
    localStorage.setItem('USER_TOKEN', accessToken);
    localStorage.setItem('USER_ID', _id);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/create`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get(`/users/`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users/create`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const getOrderList = async (dispatch) => {
  try {
    const res = await userRequest.get('/orders');
    dispatch(getOrder(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const updateStatusOrder = async (dispatch, id, status) => {
  try {
    const res = await userRequest.put(`/orders/${id}`, status);
    // dispatch(getOrder(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const getAuthorList = async (dispatch) => {
  try {
    const res = await userRequest.get('/author');
    dispatch(getAuthor(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const createAuthor = async (dispatch, author) => {
  try {
    const res = await userRequest.post('/author', author);
    // dispatch(getAuthor(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const updateAuthor = async (dispatch, id, author) => {
  try {
    const res = await userRequest.put(`/author/${id}`, author);
    // dispatch(getAuthor(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const deleteAuthorById = async (dispatch, id) => {
  console.log('id', id);
  try {
    const res = await userRequest.delete(`/author/${id}`);
    dispatch(deleteAuthor(id));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const getCategoryList = async (dispatch) => {
  try {
    const res = await userRequest.get('/category');
    dispatch(getCategories(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const createCategory = async (dispatch, category) => {
  try {
    const res = await userRequest.post('/category', category);
    // dispatch(getcategory(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const updateCategory = async (dispatch, id, category) => {
  try {
    const res = await userRequest.put(`/category/${id}`, category);
    // dispatch(getAuthor(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const deleteCategoryById = async (dispatch, id) => {
  try {
    const res = await userRequest.delete(`/category/${id}`);
    dispatch(deleteCategory(id));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const deleteOrderById = async (dispatch, id, status) => {
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrder({id, status}));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};
