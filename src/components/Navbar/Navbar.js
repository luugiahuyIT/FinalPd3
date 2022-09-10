import { useState, useEffect } from 'react';
import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Dropdown, Menu, Space } from 'antd';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuItem } from './menuItem';
import { logout } from '../../redux/apiCalls';

// import Dropdown from '../DropDown/DropDown';
const Container = styled.div`
  height: fit-content;
  ${mobile({ height: '50px' })}
  background-color: teal;
  color: white;
  margin: 0 !important;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 8px;
  border-radius: 8px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
  height: 30px;
  width: 200px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: '2', justifyContent: 'center' })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })};
  color: white;
  font-size: 24px;
`;

const menu = (
  <Menu
    items={[
      {
        label: (
          <Link to='/management/invoicemanagement'>Invoice Management</Link>
        ),
        key: '0',
      },
      {
        label: (
          <Link to='/management/accountmanagement'>Account Management</Link>
        ),
        key: '1',
      },
      {
        label: <a>Logout</a>,
        key: '3',
      },
    ]}
  />
);

const Navbar = (props) => {
  //   const [dropdown, setDropdown] = useState(false);
  const [display, setDisplay] = useState('none');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const isLogin =
    localStorage.getItem('USER_ID') && localStorage.getItem('USER_ID')
      ? true
      : false;

  const handleMenu = () => {
    if (display == 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };

  // const handleMenuClick = (e) => {
  //   console.log('e', e);
  //   if (e.key === '3') {
  //     logout(dispatch);
  //   }
  // };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to='/management/invoicemanagement'>Invoice Management</Link>
          ),
          key: '0',
        },
        {
          label: (
            <Link to='/management/accountmanagement'>Account Management</Link>
          ),
          key: '1',
        },
        // {
        //   label: <a>Logout</a>,
        //   key: '3',
        // },
      ]}
    />
  );
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Title, author, keyword or ISBN' />
            <SearchIcon style={{ fontSize: '25px', color: 'white' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to='/'>
            <Logo>BOOKSTORE</Logo>
          </Link>
        </Center>
        <Right>
          <Link style={{ color: 'white' }} to='/register'>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          {isLogin ? (
            <MenuItem onClick={handleMenu}>
              {/* <Dropdown item={menuItem} display={display} close={handleMenu} /> */}
              <Dropdown overlay={menu} trigger={['click']}>
                <a
                  style={{ color: 'white' }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>{user && user.username}</Space>
                </a>
              </Dropdown>
            </MenuItem>
          ) : (
            <Link style={{ color: 'white' }} to='/login'>
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}

          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlinedIcon style={{ color: 'white' }} />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
