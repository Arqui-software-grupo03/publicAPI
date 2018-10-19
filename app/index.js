import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
// import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import router from './routes/';
import { port, connexionString } from './config';


// import Router from 'koa-router';

// mongoose.connect(connexionString);
// mongoose.connection.on('error', console.error);

// Create Koa Application
const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet());

// const router = new Router();

// router.prefix(`/${baseApi}/${api}`);

// GET /api/hola
// router.get('/', (ctx, next) => { ctx.body = { hola: 'hola', chao: 'chao' }; });

app.use(router.routes());
// app.use(router.allowedMethods({
//   throw: true
// }));
// routing(app);

// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);


export default app;
