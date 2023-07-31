import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

export const register = async (email, password) => {
    try{
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    return user;
    } catch(error){
        console.log(error.message)
    }
}


export default app;