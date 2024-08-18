import { Router } from "express";
import { 
    getUser, 
    login, 
    register, 
    // resetPassword, 
    // sentResetPasswordOTP, 
    // softDelete, 
    // updateUser,
    // validateEmail
} from "../../controllers/userapp/v1/auth.Controller.js";
import { PLATFORM } from "../../constants.js";
import {
    auth
} from "../../middlewares/auth.middlewares.js";
import { getAllUserChats } from "../../controllers/userapp/v1/chat.Controller.js";
const router = Router()
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/get").get(auth(PLATFORM.USERAPP),getUser)
router.route("/allUsersChats").get(auth(PLATFORM.USERAPP),getAllUserChats);

export default router