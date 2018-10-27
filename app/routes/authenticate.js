import Router from 'koa-router';
import authenticate from '../middlewares/authenticate';


const router = new Router();

// login
router.post('/login', authenticate);

export default router;
