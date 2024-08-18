// export const DB_NAME = "E_commerce_Backend"
export const DB_NAME = "relaxoDB";

export const USER_TYPES = {
  User: "User",
  Admin: "Admin",
};

export const PLATFORM = {
  USERAPP: "User",
  ADMIN: "Admin",
};

export let LOGIN_ACCESS = {
  [USER_TYPES.User]: [PLATFORM.USERAPP],
  [USER_TYPES.Admin]: [PLATFORM.ADMIN],
};

export const FILTER_KEYS = {
  _ID: "_id",
  ID: "id",
};
// Auth Constants
export const MAX_LOGIN_RETRY_LIMIT = 5;
export const LOGIN_REACTIVE_TIME = 2;

export const JWT = {
  USERAPP_SECRET: "myjwtuserappsecret",
  ADMIN_SECRET: "myjwtadminsecret",
  EXPIRES_IN: 10000,
};

export const FORGOT_PASSWORD_WITH = {
  LINK: {
    sms: false,
    email: true,
  },
  EXPIRE_TIME: 10,
};

export const CHAT_TYPES = {
  Message: "Message",
  Voice: "Voice",
  Image: "Image",
  Video: "Video",
};

export const Message_Status = {
  Read: "Read",
  Unread: "Unread",
  Delivered: "Delivered",
};
