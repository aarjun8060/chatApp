/**
 * auth.js
 * @description :: middleware that checks authentication and authorization of user
 */

import passport from "passport";
import { JWT, LOGIN_ACCESS, PLATFORM } from "../constants.js";
import { dbServiceFindByID } from "../services/db/auth.db.js";
import jwt from "jsonwebtoken";
/**
 * @description : returns callback that verifies required rights and access
 * @param {Object} req : request of route.
 * @param {callback} resolve : resolve callback for succeeding method.
 * @param {callback} reject : reject callback for error.
 * @param {int} platform : platform
 */
const verifyCallback =
  (req, resolve, reject, platform) => async (error, user, info) => {
    if (error || info || !user) {
      return reject("Unauthorized User");
    }
    req.user = user;
    let tokenExpiryStatus = jwt.verify(user.accessToken, JWT.USERAPP_SECRET);
    if (!tokenExpiryStatus) {
      return reject("Token not valid");
    }

    if (user.role) {
      let allowedPlatforms = LOGIN_ACCESS[user.role]
        ? LOGIN_ACCESS[user.role]
        : [];
      if (!allowedPlatforms.includes(platform)) {
        return reject("Unauthorized user");
      }
    }
    resolve();
  };

/**
 * @description : authentication middleware for request.
 * @param {Object} req : request of route.
 * @param {Object} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 * @param {int} platform : platform
 */
export const auth = (platform) => async (req, res, next) => {
  if (platform == PLATFORM.USERAPP) {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "userapp-rule",
        { session: false },
        verifyCallback(req, resolve, reject, platform)
      )(req, res, next);
    })
      .then(() => next())
      .catch((error) => {
        return res.unAuthorized({ message: error.message });
      });
  } else if (platform == PLATFORM.ADMIN) {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "admin-rule",
        { session: false },
        verifyCallback(req, resolve, reject, platform)
      )(req, res, next);
    })
      .then(() => next())
      .catch((error) => {
        return res.unAuthorized({ message: error.message });
      });
  }
};
