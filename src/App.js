import Home from './pages/home/Home';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import Management from './pages/manage/Management';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import User from './pages/user/User';

import Cart from './pages/cart/Cart';
import { Routes, Route } from 'react-router-dom';
import './App.css';
const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/book/:id' element={<Product />} />
      <Route exact path='/:category' element={<ProductList />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route
        exact
        path='/management/invoicemanagement'
        element={<Management />}
      />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/management/accountmanagement' element={<User />} />
    </Routes>
  );
};

export default App;
