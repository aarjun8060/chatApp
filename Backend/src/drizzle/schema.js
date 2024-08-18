import {
  pgTable,
  varchar,
  uuid,
  pgEnum,
  boolean,
  uniqueIndex,
  timestamp,
} from "drizzle-orm/pg-core";
import { CHAT_TYPES, Message_Status, USER_TYPES } from "../constants.js";
import { convertObjectToEnum } from "../utils/common.js";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum(
  "user_role",
  convertObjectToEnum(USER_TYPES)
);
export const messageTypeEnum = pgEnum(
  "chat_type",
  convertObjectToEnum(CHAT_TYPES)
);

export const messageStatusEnum = pgEnum(
  "message_status",
  convertObjectToEnum(Message_Status)
);

// User Table
export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    profilePicture: varchar("profile_picture", { length: 255 }).default(""),
    about: varchar("about", { length: 255 }).default(""),
    accessToken: varchar("token", { length: 255 }).default(""),
    role: userRoleEnum("role").default("User"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

export const userRelations = relations(UserTable, ({ many }) => ({
  chats: many(ChatTable),
}));

export const ChatTable = pgTable("chat", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  receiverId: uuid("receiver_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  message: varchar("message", { length: 255 }).notNull(),
  messageType: messageTypeEnum("messageType").default("Message"),
  status: messageStatusEnum("messageStatus").default("Delivered"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatRelations = relations(ChatTable, ({ one }) => ({
  author: one(UserTable, {
    fields: [ChatTable.senderId],
    references: [UserTable.id],
  }),
}));
