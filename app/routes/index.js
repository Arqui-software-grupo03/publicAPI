import Router from 'koa-router';
import posts from './posts.js';
import users from './users.js';
import topics from './topics.js';
import auth from './authentication.js'

import {check, setUser} from '../middlewares/jwt';



const router = new Router();

router.prefix('/api');

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
router.use(check);
router.use(setUser);

protectedRoutes.forEach(route => {
  router.use(route.routes());
});

console.log('routes:', router.stack.map(i => i.path));

export default router;
