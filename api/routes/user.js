import express from 'express'
import { deleteUser, getAllUser, getUserById, updateUser } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verify_token.js';

const router = express.Router();

router.get('/getAllUsers' , getAllUser);

router.put('/updateUser/:id', verifyUser,updateUser);

router.get('/getUserById/:id',verifyUser, getUserById);

router.delete('/deleteUser/:id', verifyAdmin ,deleteUser);

export default router;