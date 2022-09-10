// import {
//   CalendarToday,
//   LocationSearching,
//   MailOutline,
//   PermIdentity,
//   PhoneAndroid,
//   Publish,
// } from "@material-ui/icons";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './user.css';
// import "../newUser/newUser.css"
import { updateInfo, getUser } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

export default function User() {
  const dispatch = useDispatch();

  const location = useLocation();

  const user = useSelector((state) => state.user.info);
  const id = useSelector((state) => state.user.currentUser._id);

  const [inputs, setInputs] = useState({
    ...user,
  });
  const userId = user && user._id;

  console.log('user', user);
  // const [category, setCategory] = useState(product.categories);
  const [file, setFile] = useState(null);

  console.log('input', inputs);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    getUser(id, dispatch);
  }, [id, user]);

  console.log('inputs', inputs);
  const onUpdate = (e) => {
    // eslint-disable-next-line no-unused-vars
    e.preventDefault();
    const { createdAt, updatedAt, ...rest } = inputs;
    updateInfo(userId, { ...rest }, dispatch);
  };

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <img
              src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='userShowImg'
            />
            <div className='userShowTopTitle'>
              <span className='userShowUsername'>Anna Becker</span>
              <span className='userShowUserTitle'>Software Engineer</span>
            </div>
          </div>
          {/* <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div> */}
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>Username</label>
                <input
                  type='text'
                  placeholder='annabeck99'
                  className='userUpdateInput'
                  name='username'
                  value={inputs.username}
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Full Name</label>
                <input
                  type='text'
                  placeholder='Anna Becker'
                  className='userUpdateInput'
                  name='fullname'
                  value={inputs.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  type='email'
                  placeholder='annabeck99@gmail.com'
                  className='userUpdateInput'
                  name='email'
                  value={inputs.email}
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Phone</label>
                <input
                  type='text'
                  placeholder='+1 123 456 67'
                  className='userUpdateInput'
                  name='phone'
                  value={inputs.phone}
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Address</label>
                <input
                  type='text'
                  placeholder='New York | USA'
                  className='userUpdateInput'
                  name='address'
                  value={inputs.address}
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Gender</label>
                <div className='newUserGender'>
                  <input
                    type='radio'
                    name='gender'
                    checked={inputs.gender === 'male'}
                    id='male'
                    value='male'
                    onChange={handleChange}
                  />
                  <label for='male'>Male</label>
                  <input
                    type='radio'
                    name='gender'
                    checked={inputs.gender === 'female'}
                    id='female'
                    value='female'
                    onChange={handleChange}
                  />
                  <label for='female'>Female</label>
                  <input
                    type='radio'
                    name='gender'
                    id='other'
                    checked={inputs.gender === 'other'}
                    value='other'
                    onChange={handleChange}
                  />
                  <label for='other'>Other</label>
                </div>
              </div>
            </div>
            <div className='userUpdateRight'>
              <div className='userUpdateUpload'>
                <img
                  className='userUpdateImg'
                  src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                  alt=''
                />
                <label htmlFor='file'>
                  {/* <Publish className="userUpdateIcon" /> */}
                </label>
                <input type='file' id='file' style={{ display: 'none' }} />
              </div>
              <button onClick={onUpdate} className='userUpdateButton'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
