// import 'babel-polyfill';
import Router from 'koa-router';
import UsersControllers from '../controllers/users';



const model = 'users';


const router = new Router();

router.prefix(`/${model}`);

// get all users
router.get('/', UsersControllers.all);

// create user
router.post('/', UsersControllers.all);

// get user
router.get('/:email', UsersControllers.all);

// deactivate account
router.patch('/:email', UsersControllers.all);

// list all followers
router.get('/:email/followers', UsersControllers.all);

// list all followed
router.get('/:email/followed', UsersControllers.all);

// follow user
router.post('/:email/followers', UsersControllers.all);

// unfollow user
router.delete('/:email/followers', UsersControllers.all);

export default router;
