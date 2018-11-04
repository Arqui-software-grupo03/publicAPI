// import 'babel-polyfill';
import Router from 'koa-router';
import UsersControllers from '../controllers/users';



const model = 'users';


const router = new Router();

router.prefix(`/${model}`);

// get all users
router.get('/', UsersControllers.all);

// update user
router.patch('/:id', UsersControllers.update);

// create user
router.post('/', UsersControllers.create);

// get user
router.get('/:id', UsersControllers.show);

// deactivate account
router.delete('/:id', UsersControllers.delete);

// // list all followers
// router.get('/:id/followers', UsersControllers.followers);

// // list all followed
// router.get('/:id/followed', UsersControllers.followed);

// follow user
router.post('/:id/followers', UsersControllers.follow);

// unfollow user
router.delete('/:id/followers', UsersControllers.unfollow);

export default router;
