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
import { toast } from 'react-toastify';
import { UseSelector, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPaypal, error: errorPaypal } = useGetPaypalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPaypal && !loadingPaypal && paypal.clientId) {
            const loadingPaypalScript = () => {
                paypalDispatch({
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadingPaypalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPay, errorPaypal]);

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success("Payment successful");
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    };

    const onApproveTest = async () => {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success("Payment successful");
    };

    const onError = (err) => {
        toast.error(err.message);
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    };

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
                                        {order.isDelivered ? (
                                            <Message variant='success'>
                                                Delivered on {order.deliveredAt}
                                            </Message>
                                        ) : (
                                            <Message variant='danger'>
                                                Not Delivered
                                            </Message>
                                        )}
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
                                            {!order.isPaid && (
                                                <ListGroup.Item>
                                                    {loadingPay && <Loader />}
                                                    {isPending ? <Loader /> : (
                                                        <div>
                                                            {/* <Button
                                                                onClick={onApproveTest}
                                                                style={{ marginBottom: '10' }}
                                                            >Test Pay Order</Button> */}
                                                            <div>
                                                                <PayPalButtons
                                                                    createOrder={createOrder}
                                                                    onApprove={onApprove}
                                                                    onError={onError}
                                                                    style={{ layout: "vertical" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </ListGroup.Item>
                                            )}
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