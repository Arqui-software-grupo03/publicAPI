// import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';

const router = new Router();
// GET /api/hola
// / GET /api / hola
router.get('/r1', (ctx, next) => { ctx.body = { hola: 'holaaaaa1', chao: 'chao1' }; });

export default router;
