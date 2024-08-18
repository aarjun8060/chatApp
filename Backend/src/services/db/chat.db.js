import { and, desc, eq, max, ne, or } from "drizzle-orm";
import { db } from "../../db/index.js";
import { UserTable, ChatTable } from "../../drizzle/schema.js";
import { sql } from "drizzle-orm";

export const chatDBAllChats = async (userId) => {
  try {
    const rawData = await db
      .select({
        userId: UserTable.id,
        userName: UserTable.name,
        userEmail: UserTable.email,
        userProfilePicture: UserTable.profilePicture,
        userRole: UserTable.role,
        userCreatedAt: UserTable.createdAt,
        chatId: ChatTable.id,
        senderId: ChatTable.senderId,
        receiverId: ChatTable.receiverId,
        message: ChatTable.message,
        messageType: ChatTable.messageType,
        messageStatus: ChatTable.status,
        chatCreatedAt: ChatTable.createdAt,
      })
      .from(UserTable)
      .leftJoin(
        ChatTable,
        or(
          eq(ChatTable.senderId, UserTable.id),
          eq(ChatTable.receiverId, UserTable.id)
        )
      );
    const usersWithChats = rawData.reduce((acc, curr) => {
      let user = acc.find((u) => u.userId === curr.userId);

      if (!user) {
        user = {
          userId: curr.userId,
          name: curr.userName,
          email: curr.userEmail,
          profilePicture: curr.userProfilePicture,
          role: curr.userRole,
          createdAt: curr.userCreatedAt,
          chats: [],
        };
        acc.push(user);
      }

      if (curr.chatId) {
        user.chats.push({
          chatId: curr.chatId,
          senderId: curr.senderId,
          receiverId: curr.receiverId,
          message: curr.message,
          messageType: curr.messageType,
          messageStatus: curr.messageStatus,
          createdAt: curr.chatCreatedAt,
        });

        user.chats.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return acc;
    }, []);

    return usersWithChats;
  } catch (error) {
    console.log("error", error);
  }
};

export const chatDBCreate = async (data) => {
  try {
    const result = await db.insert(ChatTable).values(data).returning();
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const chatDBBySenderReceiverID = async (sender, receiver) => {
  try {
    const result = await db
      .select()
      .from(ChatTable)
      .where(
        or(
          and(
            eq(ChatTable.senderId, sender),
            eq(ChatTable.receiverId, receiver),
          ),
          and(
            eq(ChatTable.receiverId, sender),
            eq(ChatTable.senderId, receiver)
          )
        )
      );
    console.log("result", result);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const chatFindByID = async (id) => {
  try {
    const result = await db
      .select()
      .from(ChatTable)
      .where(eq(ChatTable.id, id))
      .limit(1);
    console.log("result", result);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      "Error in Create function in dbservices",
      error.message ? error.message : error
    );
  }
};

export const chatDBUpdateOne = async (data, id) => {
  try {
    const result = await db
      .update(ChatTable)
      .set(data)
      .where(eq(ChatTable.id, id))
      .returning();
   
    if (result && result.length > 0) {
      return result[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      "Error in Create function in dbservices",
      error.message ? error.message : error
    );
  }
};

export const updateAllChats = async (sender, receiver) => {
  try {
    const result = await db
      .update(ChatTable)
      .set({ status: "Read" })
      .where(
        or(
          eq(ChatTable.senderId, sender),
          eq(ChatTable.receiverId, receiver),
          eq(ChatTable.receiverId, sender),
          eq(ChatTable.senderId, receiver)
        )
      );
    console.log("result", result);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log("error", error);
  }
};
