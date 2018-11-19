const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://arquitran-iic2173-2018-2.firebaseio.com'
});

const updateRealTimeDatabase = (path, userEmail) => {
  const topicChildRef = admin.database().ref(path);
  topicChildRef.push({ followers: [userEmail] });
}

export { admin, updateRealTimeDatabase };