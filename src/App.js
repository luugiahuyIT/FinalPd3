import Home from "./pages/home/Home";
import ProductList from "./pages/productList/ProductList";
import Product from './pages/product/Product'
import Management from './pages/manage/Management'

import Cart from './pages/cart/Cart'
import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
const App = () => {

  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/book/:id" element={<Product />} />
        <Route exact path="/:category" element={<ProductList />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/management/:name" element={<Management />} />


      </Routes>
  );
};

export default App;
