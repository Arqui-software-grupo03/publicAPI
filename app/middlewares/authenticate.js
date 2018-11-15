import jwt from 'jsonwebtoken';
import User from '../models/users.js'

export default async function(ctx, next) {
  const user = await User.findOne({ email: ctx.request.body.email }).select('+password');
  console.log(user)
  if (user == null) {
    ctx.status = 401;
    ctx.body = {
      message: 'User does not exist'
    };
    return ctx;
  }
  if (ctx.request.body.password === user.password) {
    ctx.session.userId = user.id
    ctx.body = {
      token: jwt.sign({
        data: user.email,
      }, 'MyVerySecretKey'),
      user: user,
    }
    return ctx;
  }
  ctx.status = 401;
  ctx.body = {
    message: 'Authentication Failed'
  };
  return ctx;
}

