import { validateParamsWithJoi } from "../utils/validateRequest.js";
import { chatSchemaKeys } from "../utils/validation/chatValidation.js";
import { dbServiceFindByID } from "./db/auth.db.js";
import { chatDBCreate } from "./db/chat.db.js";

const createdChatService = async (data) => {
    try {
        console.log("hello JIII")
        const {
            senderId
        } = data;
        console.log('data',data)
        let validateRequest = validateParamsWithJoi(data, chatSchemaKeys);
        console.log("validateRequest",validateRequest)
        if (!validateRequest.isValid) {
            return false
        }
        console.log('data',data)
        const checkSenderId = await dbServiceFindByID(data?.senderId);
        console.log("checkSenderId",checkSenderId)
        if(!checkSenderId){
            return false
        }

        const createdChat = await chatDBCreate(data);

        if(!createdChat){
            return false
        }
        console.log("createdChat",createdChat )
        return createdChat
    } catch (error) {
        return false
    }
}

export {
    createdChatService
}