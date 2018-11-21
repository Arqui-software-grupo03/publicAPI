import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import router from './routes/';
// import session from 'koa-session';
import { port, connexionString } from './config';
import Id from './models/ids'
import { sendMessage, getUserTokenUpdates } from './utils/firebase-cloud-messaging';

const cors = require('@koa/cors');

getUserTokenUpdates();
// sendMessage("eI3kOT_eeOI:APA91bGg_2DJVbIiQwb0bIFFssxBpuwTzV9trHpITVDeZjoSYBz1jzR82cCmnxf_GOHsvVeTi8uaPwFRLsWu4xA6ttwRHU7jQb5-4l2SLLs-o7ObIHjLDvVKm2u9rs07KhLZoomL0Pqn", {'title': 'hola', 'body': 'nananan'})
// const db = admin.database();
/* const topicsRef = db.ref('/topics');
const usersRef = db.ref('/followers');
usersRef.child('schau').set({
  followers: ['hlmuller']
}); */
// const topics = ref.child('data');
/* topics.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }

}); */
/* const ref = db.ref('/fcmTokens');
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
}); */

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
  // .use(session({
  //   maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
  // }, app));


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
