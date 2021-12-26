import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const productId = params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    
    

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }
   

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <>
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col xs={2} md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col xs={3} md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col xs={2} md={3}>
                                        <Form.Select value={item.qty} onChange={(event) => dispatch(addToCart(item.product, Number(event.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col xs={2} md={1}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <p></p>
                    <Link to='/'><Button type='button' className='btn btn-dark'>Continue Shopping</Button></Link>
                    </>
                )}
            </Col>
            
            <Col md={4}>
                <h1>checkout</h1>
                <Card className='card border-primary mb-3'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
            
        </Row>
    ) 
}

export default CartScreen
