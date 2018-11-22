// import 'babel-polyfill';
import Router from 'koa-router';
import PostsControllers from '../controllers/posts';



const router = new Router();


const model = 'posts';
router.prefix(`/${model}`);

// get all posts
router.get('/', PostsControllers.all);

// create posts
router.post('/', PostsControllers.add);

// edit post
router.patch('/:id', PostsControllers.update);

// get post
router.get('/:id', PostsControllers.findById);

// delete post
router.delete('/:id', PostsControllers.delete);

// list all answers
router.get('/:id/answers', PostsControllers.allAnswers);

// create answer
router.post('/:id/answers', PostsControllers.addAnswer);

// edit answer
router.patch('/:id/answers/:answerId', PostsControllers.updateAnswer);

// delete answer
router.delete('/:id/answers/:answerId', PostsControllers.deleteAnswer);

// get user posts
router.get('/user/:id', PostsControllers.getUserPosts);


export default router;