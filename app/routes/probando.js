// import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
// import jwt from '../middlewares/jwt';
// import CitiesControllers from '../controllers/cities';

const api = 'hola';

const router = new Router();

// router.prefix(`/${baseApi}/${api}`);

// GET /api/hola
// / GET /api / hola
router.get('/r', (ctx, next) => { ctx.body = { hola: 'hola', chao: 'chao' }; });

export default router;
