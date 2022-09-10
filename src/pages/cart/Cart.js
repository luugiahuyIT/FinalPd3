import { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../../responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../../api/request';
import { useDispatch } from 'react-redux';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import {
  resetCart,
  incQuantityProduct,
  descQuantityProduct,
  removeProduct,
} from '../../redux/cartRedux';
// import { addInvoice } from '../../redux/invoiceRedux';
import { addInvoice } from '../../redux/apiCalls';

const KEY =
  'pk_test_51LBp7RCkXbwpgPlHFfSoDvkJXIqcMf6dc37hYRvnRy8n44gCVqswJZWo9uCjNQNEs5LBbOWp1DoCQEValq11swiA004az9AXSt';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;
const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  margin-top: 15px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-top: 10px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  display: inline-block;
  width: 110px;
  height: 40px;
  color: white;
  background-color: red;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  border-radius: 15px;
  margin-top: 10px;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  // const [locationList, setLocationList] = useState([]);
  const user = useSelector((state) => state.user.info);
  // const {
  //   placesService,
  //   placePredictions,
  //   getPlacePredictions,
  //   isPlacePredictionsLoading,
  // } = usePlacesService({
  //   apiKey: 'AIzaSyAYxiiq49MDy8Kf3HhXBlmERSX5K00yUdc',
  //   debounce: 1000,
  // });

  // console.log('locationList', locationList);
  // useEffect(() => {
  //   // fetch place details for the first element in placePredictions array
  //   if (placePredictions.length > 0) {
  //     setLocationList(
  //       placePredictions.map((location) => {
  //         return {
  //           location: location.description,
  //           place_id: location.place_id,
  //         };
  //       })
  //     );
  //   }
  // }, [placePredictions]);

  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total,
          products: cart.products,
        });

        // history.push('/success', {
        //     stripeData: res.data,
        //     products: cart,
        // })
      } catch (err) {}
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total]);
  const orderProduct = () => {
    // dispatch(addInvoice([...cart.products]));
    // dispatch(resetCart());
    setIsModalVisible(true);
    console.log('cart', cart.products);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (Object.keys(user).length) {
      form.setFieldsValue({
        address: user.address ? user.address : '',
        phoneNumber: user.phone ? user.phone : '',
      });
    }
  }, [user]);

  const onFinish = (values) => {
    values.products = cart.products;
    values.amount = cart.total;
    addInvoice(dispatch, values);
    dispatch(resetCart());
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleQuantity = (type, product) => {
    if (type === 'dec') {
      dispatch(descQuantityProduct(product));
    } else {
      dispatch(incQuantityProduct(product));
    }
  };

  return (
    <Container>
      <Navbar />
      {/* <Announcement /> */}
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      {/* <ProductColor color={product.color} />
                                    <ProductSize>
                                        <b>Size:</b> {product.size}
                                    </ProductSize> */}
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => handleQuantity('inc', product)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove onClick={() => handleQuantity('dec', product)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                    <RemoveButton
                      onClick={() => dispatch(removeProduct(product))}
                    >
                      Remove
                    </RemoveButton>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='Lama Shop'
              image='https://circuitcourt.macombgov.org/sites/default/files/content/government/circuitcourt/images/accept-online-payments_1.png'
              shippingAddress
              billingAddress
              description={`Your total $${cart.total}`}
              amount={cart.total}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
            <Button onClick={orderProduct}>ORDER</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      <Modal
        title='Confirm Address'
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
          form={form}
        >
          <Form.Item
            label='Address'
            name='address'
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone Number'
            name='phoneNumber'
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default Cart;
