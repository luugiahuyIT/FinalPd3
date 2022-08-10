import { useState, useEffect } from 'react';
import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import styled from 'styled-components';
import { mobile } from '../../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuItem } from './menuItem';
import Dropdown from '../DropDown/DropDown';
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

const Navbar = (props) => {
  //   const [dropdown, setDropdown] = useState(false);
  const [display, setDisplay] = useState('none');
  const quantity = useSelector(state => state.cart.quantity)

  const handleMenu = () => {
    if (display == 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };

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
          <Logo>BOOKSTORE</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem onClick={handleMenu}>
            SIGN IN
            <Dropdown item={menuItem} display={display} close={handleMenu} />
          </MenuItem>
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
