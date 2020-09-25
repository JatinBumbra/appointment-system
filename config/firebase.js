const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = require('./config');

firebase.initializeApp(firebaseConfig);

module.exports = firebase.firestore();
