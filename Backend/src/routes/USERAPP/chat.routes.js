import { Router } from "express";
import { PLATFORM } from "../../constants.js";
import {
    auth
} from "../../middlewares/auth.middlewares.js";
import { 
    createChat, 
    getAllUserChats, 
    getUserChat,
    updateChatSatus
} from "../../controllers/userapp/v1/chat.Controller.js";
const router = Router()

router.route("/update/:id").put(auth(PLATFORM.USERAPP),updateChatSatus)
router.route("/allchats").get(getAllUserChats); //auth(PLATFORM.USERAPP)
router.route("/create").post(auth(PLATFORM.USERAPP),createChat);
router.route("/chatById/:receiverId").get(auth(PLATFORM.USERAPP),getUserChat)

export default router