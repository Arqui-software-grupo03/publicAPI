import User from '../models/users';
import { dirTopics, dirPosts } from '../config';

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const axios = require('axios');
const serverAccount = require('../serverKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://arquitran-iic2173-2018-2.firebaseio.com'
});


/* const isEmailInDatabase = async (path, userEmail) => {
  let inDatabase = false;
  await admin.database().ref(path).on('value',
    async (snapshot) => {
      const subscribers = await snapshot.val();
      let val = false;
      if (subscribers) {
        Object.keys(subscribers).forEach((key) => {
          if (subscribers[key].followers.map(element => element === userEmail).length > 0) {
            val = true;
          }
        });
      }
      inDatabase = val;
      return val;
    }
  );
  return inDatabase;
}

const updateRealTimeDatabase = async (path, userEmail) => {
  if (! await isEmailInDatabase(path, userEmail)) {
    console.log('heroe');
    const topicChildRef = admin.database().ref(path);
    topicChildRef.push({ followers: [userEmail] });
  }
}

const deleteFromRealTimeDatabase = async (path, userEmail) => {
  await admin.database().ref(path).on('value',
    async (snapshot) => {
      const subscribers = await snapshot.val();
      if (subscribers) {
        Object.keys(subscribers).forEach((key) => {
          if (subscribers[key].followers.map(element => element === userEmail).length > 0) {
            const newPath = `${path}/${key}`;
            admin.database().ref(newPath).remove(() => console.log('completed'));
          }
        });
      }
    }
  );
} */

const getUserTokenUpdates = () => {
  admin.database().ref('/fcmTokens/users').on('value', async (snapshot) => {
    const data = snapshot.val();
    const keysArray = Object.keys(data);
    
    try {
      const getAllUsers = await User.find();
      getAllUsers.map(async user => {
        const userKey = `user-${user.id}`;
        const index = keysArray.indexOf(userKey);
        if (index >= 0) {
          if (user.fcmTokens.filter(element => element === data[userKey]).length === 0) {
            try {
              await User.updateOne({id: user.id}, {$push: { fcmTokens: data[userKey] }})
            } catch(err) {
              // console.log(err);
            }
          }
        } else {
          try {
            await User.updateOne({id: user.id}, {$set: { fcmTokens: user.fcmTokens.filter(e => e === data[userKey]) }})
          } catch(err) {
            // console.log(err);
          }
        }
      });
    } catch(err) {
      // console.log(err)
    }
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
  });
}

const sendMessage = async (recipient, message) => {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const body = {
    'notification': {
        'title': message.title,
        'body': message.body
        // 'click_action': 'http://localhost:3000/',
    },
    'to': recipient
  }
  const headers = {
    headers: {
      'Authorization': `key=${serverAccount.serverKey}`,
      'content-type': 'application/json'
    }
  }
  try {
    await axios.post(url, body, headers);
    console.log('Sent!');
  } catch(err) {
    console.log(err);
    // console.log(err);
  }
}

const updateUsers = (userTokensArray, message) => {
  userTokensArray.map(
    (token) => {
      sendMessage(token, message);
    }
  );
}


const subscribeUser = async () => {

}

const updateTopicSubscribers = async (request) => {
  const subscribersArray = await axios.get(`${dirTopics}/${request.topic_identifier}/subscribers`);
  const users = [];
  const topic = await axios.get(`${dirTopics}/${request.topic_identifier}/`);
  const post = await axios.get(`${dirPosts}/${request.post_id}/`);
  const message = {
    'title': `Nuevo post en topic: ${topic.data.title}`,
    'body': post.data.content
  };
  // console.log(message);
  subscribersArray.data.map(async (obj) => {
    users.push(User.findOne({id: obj.user_id}).then(
      user => {
        if (user.fcmTokens.length > 0) {
          sendMessage(user.fcmTokens[user.fcmTokens.length - 1], message);
        }
      }
    ));
  });
  await Promise.all(users);
}


export { admin, sendMessage, getUserTokenUpdates, updateUsers, updateTopicSubscribers };