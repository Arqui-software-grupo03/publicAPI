// import 'babel-polyfill';
import Router from 'koa-router';
import TopicsControllers from '../controllers/topics';



const router = new Router();


const model = 'topics';
router.prefix(`/${model}`);


// create topic
router.post('/', TopicsControllers.create);

// get topic
router.get('/:id', TopicsControllers.show);

// delete topic
router.delete('/:id', TopicsControllers.delete);

// list all topics
router.get('/', TopicsControllers.all);

// get all subscribers from topic
router.get('/:id/subscribers', TopicsControllers.subscribers);

// subscribe to topic
router.post('/:id/subscribers', TopicsControllers.subscribe);

// unsubscribe to topic
router.delete('/:id/subscribers/:userId', TopicsControllers.unsubscribe);

// add post to topic
router.post('/:id/posts', TopicsControllers.categorize);

// remove post from topic
router.delete('/:id/posts/:postId', TopicsControllers.deleteCategorization);

// list all posts of a topic
router.get('/:id/posts', TopicsControllers.listPosts);


export default router;
