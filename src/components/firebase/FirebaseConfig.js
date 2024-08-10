import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTR-ZZiYl0XGvErBjM_kI_YbOnc4iVASU",
  authDomain: "colorshop-44e58.firebaseapp.com",
  projectId: "colorshop-44e58",
  storageBucket: "colorshop-44e58.appspot.com",
  messagingSenderId: "799943953324",
  appId: "1:799943953324:web:94cc33a5de5fafa131c809",
  measurementId: "G-BSJ6NX4P01"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


