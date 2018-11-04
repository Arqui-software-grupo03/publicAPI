import jwt from 'jsonwebtoken';
import User from '../models/users.js'

export default async function(ctx, next) {
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
    ctx.session.userId = user._id
    ctx.body = {
      token: jwt.sign({
        data: user.username,
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

