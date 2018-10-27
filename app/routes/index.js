import Router from 'koa-router';
import posts from './posts.js';
import users from './users.js';
import topics from './topics.js';
import auth from './authenticate.js'

import jwt from '../middlewares/jwt';



const router = new Router();


const protectedRoutes = [
  posts,
  users,
  topics
];

const unprotectedRoutes = [
  auth
];

unprotectedRoutes.forEach(route => {
  router.use(route.routes());
});

// jwt authetigication
router.use(jwt);

protectedRoutes.forEach(route => {
  router.use(route.routes());
});

console.log('routes:', router.stack.map(i => i.path));

export default router;
