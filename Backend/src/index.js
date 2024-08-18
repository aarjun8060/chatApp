import dotenv from "dotenv";
import { app } from "./app.js";
import { Server } from "socket.io";
import { createChat } from "./controllers/userapp/v1/chat.Controller.js";
import { callingControllers, saveDataToBody } from "./utils/common.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { createdChatService } from "./services/chat.services.js";
import { db } from "./db/index.js";
import { UserTable, ChatTable } from "../src/drizzle/schema.js";
import { desc, eq, max, ne, sql } from "drizzle-orm";
dotenv.config({
  path: "./.env",
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// global.onlineUsers = new Map();
let onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.emit("welcome", "Hello from the server!");
  socket.on("add-user", ({ userId }) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("check-online", ({ userId }) => {
    const isOnline = onlineUsers.get(userId);
    io.emit("check-online", isOnline);
  });

  socket.on("chat-message", async (msg) => {
    let senderId = onlineUsers.get(msg.senderId);
    let receiverId = onlineUsers.get(msg.receiverId);

    const chat = await createdChatService(msg);

    if (chat && chat.length > 0) {
      io.to(senderId).emit("chat-message", chat[0]);
      io.to(receiverId).emit("chat-message", chat[0]);
    }
  });

  socket.on("typing", (data) => {
    const { senderId, receiverId } = data;

    let receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderId });
    }
  });
  socket.on("messageRead", async ({ senderId, receiverId }) => {
    let chatUpdate = await updateAllChats(senderId, receiverId);

    if (chatUpdate && chatUpdate.length > 0) {
      io.to(senderId).emit("chat-message", chatUpdate);
      io.to(receiverId).emit("chat-message", chatUpdate);
    }
  });
  socket.on("disconnect", () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
        io.emit("online-users", Array.from(onlineUsers.keys()));
      }
    });
  });
});
