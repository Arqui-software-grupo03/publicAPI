import Router from 'koa-router';
import UsersControllers from '../controllers/users';
import authenticate from '../middlewares/authenticate';


const router = new Router();


// login
router.post('/users/login', authenticate);

// sign up
router.post('/sign_in', UsersControllers.create);


export default router;