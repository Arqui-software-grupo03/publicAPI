import Router from 'koa-router';
import UsersControllers from '../controllers/users';
import authenticate from '../middlewares/authenticate';


const router = new Router();


// login
router.post('/login', authenticate);

// sign up
router.post('/users', UsersControllers.create);


export default router;