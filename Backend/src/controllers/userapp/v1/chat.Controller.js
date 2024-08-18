import { isUuid } from "uuidv4";
import { dbServiceFindByID } from "../../../services/db/auth.db.js";
import {
  chatDBAllChats,
  chatDBBySenderReceiverID,
  chatDBCreate,
  chatDBUpdateOne,
  chatFindByID,
} from "../../../services/db/chat.db.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { validateParamsWithJoi } from "../../../utils/validateRequest.js";
import { chatSchemaKeys } from "../../../utils/validation/chatValidation.js";
const getAllUserChats = asyncHandler(async (req, res) => {
  try {
    const data = await chatDBAllChats(req.user.id);
    return res.success({
      data: data,
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
});

const createChat = asyncHandler(async (req, res) => {
  try {
    const { senderId } = req.body;
    let validateRequest = validateParamsWithJoi(req.body, chatSchemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }
    const checkSenderId = await dbServiceFindByID(senderId);
    if (!checkSenderId) {
      return res.recordNotFound({
        message: "Sender is not found!",
      });
    }

    const createdChat = await chatDBCreate(req.body);

    if (!createdChat) {
      return res.internalServerError();
    }
    console.log("createdChat", createdChat);
    return res.success({
      data: createdChat && createdChat.length > 0 && createdChat[0],
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
});

const updateChatSatus = asyncHandler(async (req, res) => {
  try {
    if (!isUuid(req.params.id)) {
      return res.validationError({ message: "invalid object" });
    }

    let chat = await chatFindByID(req.params.id);

    if (!isUuid(req.body.senderId)) {
      return res.validationError({ message: "invalid object" });
    }

    if (!(chat.senderId === req.body.senderId)) {
      return res.validationError({ message: "Sender Id is not same!" });
    }

    const updateChat = await chatDBUpdateOne(req.body, req.params.id);

    if (!updateChat) {
      return internalServerError();
    }

    return res.success({
      data: updateChat,
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
});

const getUserChat = asyncHandler(async (req, res) => {
  try {
    // const {senderId,receiverId} = req.body;
    const receiverId = req.params.receiverId;
    const senderId = req.user.id;

    if (!isUuid(senderId)) {
      return res.validationError({ message: "invalid object" });
    }

    if (!isUuid(receiverId)) {
      return res.validationError({ message: "invalid object" });
    }

    const chatUsers = await chatDBBySenderReceiverID(senderId, receiverId);

    if (!chatUsers) {
      return res.recordNotFound();
    }
    console.log("chatUsers", chatUsers);
    res.success({
      data: chatUsers,
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
});
export { getAllUserChats, createChat, getUserChat, updateChatSatus };
