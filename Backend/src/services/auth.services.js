

/**
 * @description : login user.
 * @param {string} username : username of user.
 * @param {string} password : password of user.
 * @param {string} platform : platform.
 * @param {boolean} roleAccess: a flag to request user`s role access
 * @return {Object} : returns authentication status. {flag, data}
 */

import dayjs from "dayjs";
import { LOGIN_ACCESS, LOGIN_REACTIVE_TIME, MAX_LOGIN_RETRY_LIMIT, PLATFORM,JWT, FORGOT_PASSWORD_WITH } from "../constants.js";
import {  
    authDBUpdateOne,
    dbServiceFindByEmail
 } from "../services/db/auth.db.js";
import { UserTable } from "../drizzle/schema.js";
import { sendMail } from "./email.services.js";
import otpGenerator from "otp-generator"
import bcrypt from "bcrypt";
import { generateAccessToken, isPasswordMatch } from "../utils/common.js";

export const loginUser = async (username,password,platform,roleAccess) => {
    try {
        let where;
        let user= await dbServiceFindByEmail(username)
      
        if(user){
            if(user.loginRetryLimit >= MAX_LOGIN_RETRY_LIMIT){
                let now = dayjs();
                if(user.loginReactiveTime){
                    let limitTime = dayjs(user.loginReactiveTime)
                    if(limitTime > now){
                        let expireTime = dayjs().add(LOGIN_REACTIVE_TIME,'minute')
                        if(!(limitTime > expireTime)) { 
                            return {
                                flag:true,
                                data: `you have exceed the number of limit.you can login after ${common.getDifferenceOfTwoDatesInTime(now, limitTime)}.`
                            }
                        }

                        await dbServiceUpdateOne(UserTable,{_id:user.id},{
                            loginReactiveTime: expireTime.toISOString(),
                            loginRetryLimit: user.loginRetryLimit + 1
                        })

                        return {
                            flag: true,
                            data: `you have exceed the number of limit.you can login after ${common.getDifferenceOfTwoDatesInTime(now, expireTime)}.`
                        }
                    }else{
                        user = await dbServiceUpdateOne(UserTable,{_id:user.id},{
                            loginReactiveTime: '',
                            loginRetryLimit: 0
                        },{new:true})
                    }
                }else{
                    // send error
                    let expireTime = dayjs().add(LOGIN_REACTIVE_TIME,'minute')

                    await dbServiceUpdateOne(UserTable,{
                        _id: user.id, isActive: true, isDeleted: false
                    },{
                        loginReactiveTime: expireTime.toISOString(),
                        loginRetryLimit: user.loginRetryLimit + 1
                    })

                    return {
                        flag: true,
                        data: `you have exceed the number of limit.you can login after ${common.getDifferenceOfTwoDatesInTime(now, expireTime)}.`
                    };
                }
            }
        }
        if(password){
      
            const isPassword = await isPasswordMatch(password,user)
      
            if(!isPassword){
                await dbServiceUpdateOne(UserTable,
                    { _id: user.id, isActive: true, isDeleted: false },
                    { loginRetryLimit: user.loginRetryLimit + 1 });
                return { flag: true, data: 'Incorrect Password' }
            }
     
            const userData = user
         
            let token;
            if(!user.role){
                return { flag: true, data: 'You have not been assigned any role' }
            }
           
            if(platform == PLATFORM.USERAPP){
                if (!LOGIN_ACCESS[user.role].includes(PLATFORM.USERAPP)) {
                    return { flag: true, data: 'you are unable to access this platform' }
                }
                token = await generateAccessToken(JWT.USERAPP_SECRET,user)
                
            }else if(platform == PLATFORM.ADMIN){
                if (!LOGIN_ACCESS[user.role].includes(PLATFORM.ADMIN)) {
                    return { flag: true, data: 'you are unable to access this platform' }
                }
                token = await generateAccessToken(JWT.ADMIN_SECRET,user)
            }

            let expire = dayjs().add(JWT.EXPIRES_IN, 'second').toISOString();
             
            await authDBUpdateOne({ "accessToken": token},user.id);

            let userToReturn = { ...userData, token };
            return { flag: true, data: userToReturn }

        }else{
            return { flag: true, data: 'User not exists' }
        }
        
    } catch (error) {
        return { flag: false, data: 'User not exists' }
        console.log("Error in auth services functions",error.message ? error.message : error)
    }
}


export const sendResetPasswordOTPNotification = async (user) => {
    try {
     
        let resultOfEmail = false
        let where = {
            _id: user.id,
            isActive: true, 
            isDeleted: false,
        }
        let token = otpGenerator.generate(6, { digits:true,lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false });
    
        let expires = dayjs();

        expires = expires.add(FORGOT_PASSWORD_WITH.EXPIRE_TIME, "minute").toISOString();

        // await dbServiceUpdateOne(User, where,{ resetPasswordLink: { code: token, expireTime: expires } });

        if (user.email) {
            let viewType = "/reset-password/";
        
            let mailObj = {
                subject: "Learning Backend Reset Password OTP",
                to: user.email,
                template: "/views/email/OTP/resetPasswordOtp",
                data: {
                    isWidth: true,
                    user: user || '-',
                    token:token
                }
            };
            try {
                await sendMail(mailObj);
                resultOfEmail = true;
            } catch (error) {
                console.log(error);
            }
        }
      
        return { resultOfEmail };
    } catch (error) {
        throw new Error(error.message);
    }
}
 