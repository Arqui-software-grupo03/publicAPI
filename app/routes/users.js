// import 'babel-polyfill';
import Router from 'koa-router';
import UsersControllers from '../controllers/users';




const model = 'users';


const router = new Router();

// router.prefix(`/${model}`);

// get all users
router.get('/users/', UsersControllers.all);

// update user
router.patch('/users/:id', UsersControllers.update);




// get user
router.get('/users/:id', UsersControllers.show);

// deactivate account
router.delete('/users/:id', UsersControllers.delete);


// // list all followers
// router.get('/:id/followers', UsersControllers.followers);

// // list all followed
// router.get('/:id/followed', UsersControllers.followed);

// follow user
router.post('/users/:id/followers', UsersControllers.follow);

// unfollow user
router.delete('/users/:id/followers', UsersControllers.unfollow);

// get current user
router.get('/user', UsersControllers.currentUser);
// get user by email
router.post('/login', UsersControllers.currentUserByEmail);

export default router;
