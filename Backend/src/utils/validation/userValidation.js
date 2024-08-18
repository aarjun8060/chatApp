/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

import joi from "joi";


export const authSchemaKeys = joi.object({
    name:joi.string().min(3).max(100),
    email: joi.string().email({ tlds: { allow: false } }),
    password: joi.string().allow(null).allow(''),
}).unknown(true);

/** validation keys and properties of user for updation */
export const updateAuthSchemaKeys = joi.object({
    email: joi.string().email({ tlds: { allow: false } }),
    phone: joi.number().integer().allow(0),
    userType: joi.number().allow(0),
    isActive: joi.boolean(),
    isDeleted: joi.boolean(),
  }).unknown(true);