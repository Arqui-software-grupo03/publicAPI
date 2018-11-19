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

  bcrypt.compare(ctx.request.body.password, user.password, function(err, res) {
    if(res) {
      console.log('MATCH');
      // Passwords match
      const token = jwt.sign({
        id: user.id,
      }, 'MyVerySecretKey', { expiresIn: 60 * 15 }); // in seconds

      // User.update({ email: ctx.request.body.email }, { $set: token });
      console.log('ehwgvyfbuehiwfruhJAJAJAAJJAAJAJAJ');
      ctx.body = {
        token,
        user: omit(user._doc, 'password'),
      }
      console.log(ctx);
      return ctx;
    } else {
      // Passwords don't match
      ctx.status = 401;
      ctx.body = {
        message: 'Authentication Failed'
      };
      return ctx;
    }
  });

  // if (ctx.request.body.password === user.password) {
  //   // ctx.session.userId = user.id;
  //   const token = jwt.sign({
  //     id: user.id,
  //   }, 'MyVerySecretKey', { expiresIn: 60 * 15 }); // in seconds
  //
  //   // User.update({ email: ctx.request.body.email }, { $set: token });
  //
  //   ctx.body = {
  //     token,
  //     user: omit(user._doc, 'password'),
  //   }
  //   return ctx;
  // }

  // ctx.status = 401;
  // ctx.body = {
  //   message: 'Authentication Failed'
  // };
  // return ctx;
}
