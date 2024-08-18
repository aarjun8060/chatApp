import Joi from "joi";
import { CHAT_TYPES, Message_Status } from "../../constants.js";


export const chatSchemaKeys = Joi.object({
    senderId: Joi.string().guid({ version: ["uuidv4"] }).required(),
    receiverId: Joi.string().guid({ version: ["uuidv4"] }).required(),
    message: Joi.string().max(255).required(),
    messageType: Joi.string()
    .valid(...Object.values(CHAT_TYPES))
    .default("Message"),
    messageStatus: Joi.string()
    .valid(...Object.values(Message_Status))
    .default("Delivered")

}).unknown(true);

 
