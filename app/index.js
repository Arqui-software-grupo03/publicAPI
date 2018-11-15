import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import router from './routes/';
import session from 'koa-session';
import { port, connexionString } from './config';
import Id from './models/ids'
const cors = require('@koa/cors');


mongoose.connect(connexionString, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);
mongoose.set('useCreateIndex', true); // stops unwanted xwarnings



async function defaultId() {
  const id = await Id.findOne();
  if (!id) {
    const firstId = new Id({ userId: 1 });
    await firstId.save();
  }
}
defaultId();

// Create Koa Application
const app = new Koa();
app.use(cors({
  origin: '*'
}));

app.keys = [ 'most secret key ever' ];


app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(session({
    maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
  }, app));


app.use(router.routes());

// defaults ids
// const id = await Id.findOne();
// if (!id) {
//   const firstId = new Id({ userId: 1 });
//   await firstId.save();
// }


// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);


export default app;
