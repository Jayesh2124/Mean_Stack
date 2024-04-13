import  express from "express";
import { CreateRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verify_token.js";


const router = express.Router();

// create
router.post('/create', verifyAdmin, CreateRole);

router.get('/getRoles',verifyAdmin, getAllRoles);

router.put('/:id',verifyAdmin, updateRole);

router.delete('/deleteRole/:id',verifyAdmin, deleteRole);

export default router;