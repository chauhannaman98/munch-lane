import { Router } from "express";
const router = Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getUsers,
    updateUserByID,
    updateUserProfile,
    deleteUser,
    getUserbyID
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserbyID)
    .put(protect, admin, updateUserByID);

export default router;