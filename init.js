const admin = require('firebase-admin');
const firebase = require('firebase');
require('dotenv').config();

const firebaseAppConfig = {
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com/`,
};
admin.initializeApp(firebaseAppConfig);
firebaseApp = firebase.initializeApp(
  {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com/`,
  },
  '[PRODUCTION-DEFAULT]'
);

module.exports = (ref) => admin.database().ref(ref);
