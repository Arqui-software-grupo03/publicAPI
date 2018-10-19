import Router from 'koa-router';
import probando from './routes/probando.js';
import probando1 from './routes/probando1.js';
// import cities from './cities.js';


const router = new Router();

const routes = [
    probando,
    probando1,
];

// function load_routes(router) {
//   routesLoader(`${__dirname}`).then(files => {

//   });
// }

// routes.forEach(route => {
//   router.use('/', route.routes(), route.allowedMethods({
//     throw: true
//   }));
// });

// function load_routes(router) {
//   routesLoader(`${__dirname}`).then(files => {

//   });
// }

// for (let k in routes) {
//     console.log(k, 'la shit');
//     router.use(k, routes[k].routes(), routes[k].allowedMethods({
//         throw: true
//     }));
// }
// routes.forEach(route => {
  // router.use(route.routes(), route.allowedMethods({
  //   throw: true
  // }));
//   router.use(route.routes());
// });


// router.use('/', probando.routes(), probando.allowedMethods({
//     throw: true
// }));
// router.use('/aaa', probando1.routes(), probando1.allowedMethods({
//     throw: true
// }));

// router.use(probando.routes());
// router.use(probando1.routes());

// router.allowedMethods({
//     throw: true
// });

console.log(router.stack.map(i => i.path), 'whaat');


// load_routes(router);

export default router;
