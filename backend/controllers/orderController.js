import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// @desc    Create new order
// @router  POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
});

// @desc    Get logged in user orders
// @router  GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc    Get order by ID
// @router  GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order
        .findById(req.params.id)
        .populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to pay
// @router  PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // order.paymentResult = {
        //     id: req.body.id,
        //     status: req.body.status,
        //     update_time: req.body.update_time,
        //     email_address: req.body.payer.email_address,
        // };

        try {
            const updatedOrder = await order.save();
        } catch (err) {
            console.log(`Error saving order: ${err}`);
        }

        res.status(201).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


// @desc    Pay via razorpay
// @router  PUT /api/orders/:id/razorpay
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    let razorpayOrder;

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    } else {
        const options = {
            amount: order.totalPrice * 100,
            currency: 'INR',
            receipt: order._id
        }
        instance.orders.create(options, (err, order) => {
            if (!err) {
                res.status(201).json(order);
            } else {
                res.status(500);
                throw new Error('Something went wrong!');
            }
        });
    }
});

// @desc    Pay via razorpay
// @router  PUT /api/orders/:id/razorpay
// @access  Private
const razorpayVerify = asyncHandler(async (req, res) => {
    const { paymentId, razorpayOrderId, signature } = req.body;

    const body = razorpayOrderId + "|" + paymentId;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === signature;

    res.status(201).json(isAuthentic);
});

// @desc    Update order to delivered
// @router  GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true,
            order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(201).json(updatedOrder);
    } else {
        res.status(404)
        throw new Error("Order not found");
    }
});

// @desc    Get all orders
// @router  GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.status(200).json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    createOrder,
    razorpayVerify,
};