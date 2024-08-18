/**
 * @description : exports authentication strategy for admin using passport.js
 * @params {Object} passport : passport object for authentication
 * @return {callback} : returns callback to be used in middleware
 */
 
import  {
  Strategy, ExtractJwt 
} from 'passport-jwt'
import { JWT } from '../src/constants.js';
import { dbServiceFindByID } from '../src/services/db/auth.db.js';


export const adminPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = JWT.ADMIN_SECRET;
  passport.use('admin-rule',
    new Strategy(options, async (payload, done) => {
      try {
        const result = await dbServiceFindByID(payload._id);
        if (result) {
          return done(null, result.toJSON());
        }
        return done('No User Found', {});
      } catch (error) {
        return done(error,{});
      }
    })
  );   
};
