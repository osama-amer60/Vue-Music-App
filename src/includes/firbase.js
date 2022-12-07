import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore ,} from "firebase/firestore";
import { getStorage} from "firebase/storage";
 


const firebaseConfig = {
    apiKey: "AIzaSyBirkeAMp7P3XYC-g6wnQiDYe5DFgOZdfA",
    authDomain: "vue-music-app-66d07.firebaseapp.com",
    projectId: "vue-music-app-66d07",
    storageBucket: "vue-music-app-66d07.appspot.com",
    messagingSenderId: "1013972661320",
    appId: "1:1013972661320:web:67eb9c3557cc88f9d6147d"
  };


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export{
    auth,
    db,
    storage,
}
