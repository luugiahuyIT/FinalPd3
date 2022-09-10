import {
  loginStart,
  loginFailure,
  loginSuccess,
  getUserInfo,
  logoutUser,
} from './userRedux';
import { publicRequest, userRequest } from '../api/request';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  getRecommendList,
} from './productRedux';

import { getInvoice, deleteInvoice } from './invoiceRedux';
import { getData } from './filterRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    const { accessToken, _id } = res.data;
    localStorage.setItem('USER_TOKEN', accessToken);
    localStorage.setItem('USER_ID', _id);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  console.log('test')
  try {
    dispatch(logoutUser());
    localStorage.setItem('USER_TOKEN', null);
    localStorage.setItem('USER_ID', null);
  } catch (err) {}
};

export const getProducts = async (dispatch, params) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products', { params });
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const addInvoice = async (dispatch, order) => {
  // dispatch(getProductStart());
  try {
    const res = await userRequest.post('/orders/create', order);
    // dispatch(getProductSuccess(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const getInvoiceList = async (dispatch, userId) => {
  // dispatch(getProductStart());
  console.log('userId', userId);
  try {
    const res = await userRequest.get(`/orders/find/${userId}`);
    dispatch(getInvoice(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const getRecommendBook = async (dispatch) => {
  // dispatch(getProductStart());
  try {
    const res = await userRequest.get(`/products/recommend`);
    dispatch(getRecommendList(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const signUp = async (user) => {
  try {
    const res = await publicRequest.post('/auth/register', user);
  } catch (err) {}
};

export const getUser = async (id, dispatch) => {
  try {
    // update
    const res = await userRequest.get(`/users/find/${id}`);
    dispatch(getUserInfo(res.data));
  } catch (err) {}
};

export const updateInfo = async (id, user, dispatch) => {
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(getUser(id, dispatch));
  } catch (err) {}
};

export const getAuthorAndCategories = async (dispatch) => {
  try {
    // update
    const [authors, categories] = await Promise.all([
      publicRequest.get('/author/'),
      publicRequest.get('/category/'),
    ]);

    dispatch(
      getData({
        authors: authors.data,
        categories: categories.data,
      })
    );
  } catch (err) {}
};

export const deleteOrder = async (id, dispatch) => {
  try {
    // update
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteInvoice(id));
  } catch (err) {}
};
