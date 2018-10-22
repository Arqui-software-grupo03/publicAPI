// import routesLoader from '../utils/routesLoader';
// import Router from 'koa-router';


// const router = new Router();

// function load_routes(router) {
//   routesLoader(`${__dirname}`).then(files => {
//     files.forEach(route => {
//       router.use(route.routes());
//       // , route.allowedMethods({
//       //   throw: true
//       // }));
//     });
//   });
// }


// // console.log(router.routes())

// console.log(router.stack.map(i => i.path), 'blablabla');

// load_routes(router);

// export default router;

import Router from 'koa-router';
import posts from './posts.js';
import users from './users.js';
// import cities from './cities.js';


const router = new Router();

const routes = [
  posts,
  users,
];

routes.forEach(route => {
  router.use(route.routes());
});

console.log('routes:', router.stack.map(i => i.path));

export default router;


/*

Falta en el apiary:  

Users
1- deactivate account, patch vs delete ? 
2- list all posts of a user

Topics
3- list all topics
4- list all posts of a topic

Posts
5- delete post -> delete answer, para más claridad
6- list all answers

Hashtags
7- por qué no hay endpoints?


*/

/*

Falta en el apiary:  

Users
1- list all followers of a user
2- list all followed by the user
3- list all subscribed topics 
4- deactivate account, patch vs delete ? 
5- list all posts of a user

Topics
6- list all topics
7- get topic 
8- list all posts of a topic

Posts
9- get post
10- delete post -> delete answer, para más claridad
11- list all answers

Hashtags
12- ?


*/
