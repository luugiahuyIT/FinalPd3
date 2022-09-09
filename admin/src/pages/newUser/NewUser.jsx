import "./newUser.css";
import { useState } from "react";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const isAdminChange = (e) => {
    setInputs((prev) => {
      return { ...prev, isAdmin: e.target.value === "true" ? true : false };
    });
  }
  const onCreate =(e) => {
    e.preventDefault();
    addUser({...inputs }, dispatch)
  }
  
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="john" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input name="fullname" type="text" placeholder="John Smith" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="password" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input name="phone" type="text" placeholder="+1 123 456 78" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input name="address" type="text" placeholder="New York | USA" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={handleChange}/>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={handleChange}/>
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleChange}/>
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="isAdmin" id="active" onChange={isAdminChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/* <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button onClick={onCreate} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
