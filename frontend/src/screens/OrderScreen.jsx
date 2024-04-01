import { Link, useParams } from 'react-router-dom';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    return (
        isLoading ? (<Loader />)
            : error ? <Message variant='danger'>{error.data.message}</Message>
                : (
                    <>
                        <h1 className='mt-4'>Order# {order._id} </h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong>{order.user.name}
                                        </p>
                                        <p>
                                            <strong>Email: </strong>{order.user.email}
                                        </p>
                                        <p>
                                            <strong>Address: </strong>
                                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}
                                        </p>
                                        <p>
                                            {order.isDelivered ? (
                                                <Message variant='success'>
                                                    Delivered on {order.deliveredAt}
                                                </Message>
                                            ) : (
                                                <Message variant='danger'>
                                                    Not Delivered
                                                </Message>
                                            )}
                                        </p>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                            <strong>Method: </strong>
                                            {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <Message variant='success'>
                                                Paid on {order.paidAt}
                                            </Message>
                                        ) : (
                                            <Message variant='danger'>
                                                Not Paid
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item._id}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item._id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>Order Summary</h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>₹{order.itemsPrice}</Col>
                                            </Row>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>₹{order.shippingPrice}</Col>
                                            </Row>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>₹{order.taxPrice}</Col>
                                            </Row>
                                            <Row>
                                                <Col>Order Total</Col>
                                                <Col>₹{order.totalPrice}</Col>
                                            </Row>
                                            {/* PAY ORDER PLACEHOLDER */}
                                            {/* MARK AS PAID PLACEHOLDER */}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )
    )
}

export default OrderScreen