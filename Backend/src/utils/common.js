import bcrypt from "bcrypt";
import { dbServiceFindByEmail } from "../services/db/auth.db.js";
import jwt from "jsonwebtoken";
/**
 * convertObjectToEnum : converts object to enum
 * @param {Object} obj : object to be converted
 * @return {Array} : converted Array
 */

export const convertObjectToEnum = (obj) => {
    const enumArr = [];
    Object.values(obj).map((val) => enumArr.push(val));
    return enumArr;
}

export const passwordHash = (password) => {
    return bcrypt.hash(password,10);
} 
export const isPasswordMatch = (password,user) => {
    return bcrypt.compare(password,user.password);
}

export const generateAccessToken = async (ACCESS_TOKEN_SECRET,user) => {
    const token = await jwt.sign({
        id:user.id,
        email:user.email,
        name:user.name,
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    return token;
}

export const  checkUniqueFieldsInDatabase = async (model,fieldsToCheck,data,operation,filter={}) => {
    switch (operation){
        case 'REGISTER':
            for(const field of fieldsToCheck){
                // Add unique field and it's value in filter.
                let query;

                query = {
                    ...filter,
                    [field]: data[field]
                };

           
                let found = await dbServiceFindByEmail(data[field]);
              
                if(found){
                    return {
                        isDuplicate:true,
                        field:field,
                        value:data[field]
                    }
                }
            }
        break;
        default:
            return { isDuplicate:false};
            break; 
    }
    return {isDuplicate:false}
}

export const saveDataToBody = (data) => {
    return (req, res, next) => {
        req.body = { ...req.body, ...data };
        next(); 
    };
};

export const callingControllers = (fun) => {
    return async (req, res,next) => {
        try {
            let result = await fun(req, res,next);
            
            return result 
        } catch (error) {
            console.log("error",error)
        }
    };
};

// export default {
//     checkUniqueFieldsInDatabase,
//     convertObjectToEnum
// }