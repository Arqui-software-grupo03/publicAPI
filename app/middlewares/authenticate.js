import jwt from 'jsonwebtoken';
import User from '../models/users.js'

const bcrypt = require('bcrypt');


function omit(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[ key ] = obj[ key ];
    }
    return result;
  }, {});
}



export default async function(ctx, next) {
  const user = await User.findOne({ email: ctx.request.body.email }).select('password');
  // const password = userObject.password;

  if (user == null) {
    ctx.status = 401;
    ctx.body = {
      message: 'User does not exist'
    };
    return ctx;
  }

  if(bcrypt.compareSync(ctx.request.body.password, user.password)) {
   // Passwords match
    const returnUser = await User.findOne({ email: ctx.request.body.email });
   const token = jwt.sign({
     id: returnUser.id
   }, 'MyVerySecretKey', { expiresIn: 60 * 15 *10 }); // in seconds (added 10 for development)
   // console.log(token);

   // User.update({ email: ctx.request.body.email }, { $set: token });

   ctx.body = {
     token,
     user: omit(returnUser._doc, 'password')
   }
   console.log(ctx.body);
   return ctx;
  } else {
   // Passwords don't match
   ctx.status = 401;
   ctx.body = {
     message: 'Authentication Failed'
   };
   return ctx;
  }
}
