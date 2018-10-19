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
import probando from './probando.js';
import probando1 from './probando1.js';
// import cities from './cities.js';


const router = new Router();

const routes = [
  probando,
  probando1,
];

routes.forEach(route => {
  router.use(route.routes());
});

console.log('routes:', router.stack.map(i => i.path));

export default router;
