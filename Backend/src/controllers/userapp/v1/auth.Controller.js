/**
 * auth.Controller.js
 * @description :: exports All authentication methods and controller for User
 */

import { USER_TYPES, PLATFORM } from "../../../constants.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import {
  validateFilterWithJoi,
  validateParamsWithJoi,
} from "../../../utils/validateRequest.js";
import { authSchemaKeys } from "../../../utils/validation/userValidation.js";
import {
  dbServiceCreate,
  dbServiceFindByID,
} from "../../../services/db/auth.db.js";
import * as common from "../../../utils/common.js";
import { loginUser } from "../../../services/auth.services.js";
import { UserTable } from "../../../drizzle/schema.js";
import { isUuid } from "uuidv4";

/**
 *
 * @param {Object} req: request  for register and It have { phone,email,password}
 * @param {*} res : response for register and stored user's data in data with validation
 */
const register = asyncHandler(async (req, res) => {
  // Required Validation
  let { name, email, password } = req.body;
  // validation
  let validateRequest = validateParamsWithJoi(req.body, authSchemaKeys);
  if (!validateRequest.isValid) {
    return res.validationError({
      message: `Invalid values in parameters, ${validateRequest.message}`,
    });
  }
  let passwordHash = await common.passwordHash(password);
  let data = {
    ...req.body,
    password: passwordHash,
    role: USER_TYPES.User,
  };
  // check data avaible in database or not
  if (req.body.email) {
    let checkUniqueFields = await common.checkUniqueFieldsInDatabase(
      UserTable,
      ["email"],
      data,
      "REGISTER"
    );

    if (checkUniqueFields.isDuplicate) {
      return res.validationError({
        message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.`,
      });
    }
  }
  // create  User
  const result = await dbServiceCreate(UserTable, data);
  return res.success({
    data: result,
    message: "register successfully",
  });
});

/**
 * @description : login with email and password
 * @param {Object} req : request for login
 * @param {Object} res : response for login
 * @return {Object} : response for login {status, message, data}
 */

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.badRequest({
      message:
        "Insufficient request parameters! email or password  is required.",
    });
  }

  let roleAccess = false;
  let result = await loginUser(email, password, PLATFORM.USERAPP, roleAccess);
  console.log("result", result);
  if (!result.flag) {
    return res.badRequest({ message: result.data });
  }
  return res.success({
    data: result.data,
    message: "Login Successful",
  });
});

/**
 * @description : find document of User from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found User. {status, message, data}
 */
const getUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user.id) {
      return res.badRequest({
        message: "Insufficient request parameters! id is required.",
      });
    }
    if (!isUuid(req.user.id)) {
      return res.validationError({ message: "invalid object" });
    }
    let foundUser = await dbServiceFindByID(req.user.id);

    if (!foundUser) {
      return res.internalServerError();
    }

    return res.success({ data: foundUser });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
});

export { register, login, getUser };
