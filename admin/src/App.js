import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/Login/Login';
import Transaction from './pages/order/';
import Author from './pages/author/';
import Category from './pages/categories/';

import { useSelector } from 'react-redux';

function App() {
  // const admin = JSON.parse(localStorage.getItem("persist:root")) ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin : null;
  const admin =
    JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
      .currentUser == null
      ? false
      : JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
          .currentUser.isAdmin;

  console.log(
    'admin',
    JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
  );
  // const admin = useSelector((state) => state.user.currentUser ? state.user.currentUser.isAdmin : null)
  return (
    <Router>
      <Switch>
        {admin ? (
          <>
            <Topbar />
            <div className='container'>
              <Sidebar />
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/users'>
                <UserList />
              </Route>
              <Route path='/user/:userId'>
                <User />
              </Route>
              <Route path='/newUser'>
                <NewUser />
              </Route>
              <Route path='/products'>
                <ProductList />
              </Route>
              <Route path='/product/:productId'>
                <Product />
              </Route>
              <Route path='/newproduct'>
                <NewProduct />
              </Route>
              <Route path='/transactions'>
                <Transaction />
              </Route>
              <Route path='/author'>
                <Author />
              </Route>
              <Route path='/category'>
                <Category />
              </Route>
            </div>
          </>
        ) : (
          <Route path='/'>
            <Login />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
