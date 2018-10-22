// import 'babel-polyfill';
import Router from 'koa-router';
import PostsControllers from '../controllers/posts';



const router = new Router();


const model = 'posts';
router.prefix(`/${model}`);

// get all posts
router.get('/', PostsControllers.all);

// create posts
router.post('/', PostsControllers.all);

// edit post
router.patch('/:id', PostsControllers.all);

// get post
router.get('/:id', PostsControllers.all);

// delete post
router.delete('/:id', PostsControllers.all);

// list all answers
router.get('/:id/answers', PostsControllers.all);

// create answer
router.post('/:id/answers', PostsControllers.all);

// edit answer
router.patch('/:id/answers/:answerId', PostsControllers.all);

// delete answer
router.delete('/:id/answers/:answerId', PostsControllers.all);



export default router;