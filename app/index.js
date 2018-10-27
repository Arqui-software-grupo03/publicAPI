import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import router from './routes/';
import { port, connexionString } from './config';


mongoose.connect(connexionString, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);
mongoose.set('useCreateIndex', true);

// Create Koa Application
const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet());


app.use(router.routes());

// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);


export default app;
