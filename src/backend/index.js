import { eventChannel } from 'redux-saga';
import mastermindServer from 'mastermind-server';

// Provide your Firebase DB config here
const api = mastermindServer({
  apiKey: 'AIzaSyBi-9FlIyrWG08DSZGJlcx5Ivi7OCor1jo',
  authDomain: 'mastermind-ea220.firebaseapp.com',
  databaseURL: 'https://mastermind-ea220.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '179449371905'
}, eventChannel);

export default api;
