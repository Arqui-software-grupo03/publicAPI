import jwt from 'jsonwebtoken';
import User from '../models/users.js'
// import bcrypt from 'bcrypt';

export default async function(ctx, next) {
  // ctx.request.body.password = await bcrypt.hash(ctx.request.body.password, 10);
  const user = await User.findOne({ username: ctx.request.body.username }).select('+password');
  console.log(user)
  if (user == null) {
    ctx.status = 401;
    ctx.body = {
      message: 'User does not exist'
    };
    return ctx;
  }

  if (ctx.request.body.password === user.password) {
    ctx.body = {
      token: jwt.sign({
        data: user.username,
        // expiration time in seconds
        // exp: Math.floor(Date .now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
      }, 'MyVerySecretKey')
    }
    return ctx;
  }
  ctx.status = 401;
  ctx.body = {
    message: 'Authentication Failed'
  };
  return ctx;
}

