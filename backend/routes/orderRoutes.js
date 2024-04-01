import { Router } from "express";
const router = Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;