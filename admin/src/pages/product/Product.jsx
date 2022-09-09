import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { userRequest } from "../../api/request";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import app from '../../firebase'

export default function Product() {
    const [productStats, setProductStats] = useState([])
    const dispatch = useDispatch();

    const location = useLocation()
    const productId = location.pathname.split("/")[2]

    const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
    const [inputs, setInputs] = useState({
      ...product
    });
    // const [category, setCategory] = useState(product.categories);
    const [file, setFile] = useState(null);

   console.log('input', inputs)

    
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // const handleCat = (e) => {
  //   setCategory(e.target.value.split(","));
  // };

  const onUpdate = (e) => {
    // eslint-disable-next-line no-unused-vars
    e.preventDefault()
    const { createdAt, updatedAt, ...rest } = inputs
    updateProduct(productId, {...rest }, dispatch)
  }


  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?productId=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
        setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" value={inputs.title} onChange={handleChange}/>
            <label>Product Description</label>
            <input name="desc" type="text" value={inputs.desc} onChange={handleChange}/>
            <label>Price</label>
            <input name="price" type="number" value={inputs.price} onChange={handleChange}/>
            <label>Author</label>
            <input name="author" type="text" value={inputs.author} onChange={handleChange}/>
            <label>Category</label>
            <input name="categories" type="text" value={inputs.categories} onChange={handleChange}/>
            {/* <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select> */}
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button onClick={onUpdate} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
