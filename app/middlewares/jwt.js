import jwt from 'koa-jwt';
import jsonwebtoken from 'jsonwebtoken';


let check = jwt({
  secret: 'MyVerySecretKey'
});

async function setUser(ctx, next) {
  const { id } = jsonwebtoken.decode(ctx.headers.authorization.split(' ')[ 1 ]);
  ctx.userId = id;
  // ctx.session.userId = id;
  // console.log('cdbehcd', ctx.session.userId, id);
  await next();
}

export {check, setUser};
