import { Router } from "express";
import { getFileUploadUrl } from "../controllers/userapp/v1/fileUpload.Controller.js";
const router = Router()

// secured Route 
router.route("/get-upload-url").get(getFileUploadUrl)

export default router