// import 'babel-polyfill';
import Router from 'koa-router';
import TopicsControllers from '../controllers/topics';



const router = new Router();


const model = 'topics';
router.prefix(`/${model}`);

// list all topics
router.get('/', TopicsControllers.all);

// create topic
router.post('/', TopicsControllers.all);

// get topic
router.get('/:id', TopicsControllers.all);

// delete topic
router.delete('/:id', TopicsControllers.all);

// subscribe to topic
router.post('/:id/followers', TopicsControllers.all);

// unsubscribe to topic
router.delete('/:id/followers', TopicsControllers.all);

// add post to topic
router.post('/:id/posts', TopicsControllers.all);

// list all posts of a topic
router.get('/:id/posts', TopicsControllers.all);


export default router;
