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
  console.log(user);
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
   console.log('MATCH');

   const token = jwt.sign({
     id: user.id,
   }, 'MyVerySecretKey', { expiresIn: 60 * 15 }); // in seconds
   // console.log(token);

   // User.update({ email: ctx.request.body.email }, { $set: token });

   ctx.body = {
     token,
     user: omit(user._doc, 'password'),
   }

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
