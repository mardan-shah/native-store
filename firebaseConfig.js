import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbXrznF6eUDKCCdKoBep3HTexcGu0i9rU",
  authDomain: "native-store-81299.firebaseapp.com",
  projectId: "native-store-81299",
  storageBucket: "native-store-81299.appspot.com",
  messagingSenderId: "517754362132",
  appId: "1:517754362132:web:94749de74824c9d96f8a01"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);

const storage = getStorage(app);

export { auth, database, storage };
