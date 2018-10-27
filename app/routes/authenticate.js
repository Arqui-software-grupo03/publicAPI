// import 'babel-polyfill';
import Router from 'koa-router';
// import { apiVersion } from '../config';
import authenticate from '../middlewares/authenticate';


const router = new Router();

// const api = 'login';
// router.prefix(`/${api}`);

// login
router.post('/login', authenticate);

export default router;
