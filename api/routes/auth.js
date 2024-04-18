import  express  from "express";
import { Login, Register , sendEmail, resetPassword} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/Register',Register);

router.post('/Login',Login);

router.post('/send-email', sendEmail)

router.post('/reset-password', resetPassword)

export default router;