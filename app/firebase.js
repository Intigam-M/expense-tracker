import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, push, update, remove, get, onValue } from "firebase/database";
import toast from "react-hot-toast";
import{generalData, userData} from '@/lib/dbStructure'

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
const auth = getAuth();
const db = getDatabase();

export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        setData(userData, 'user/'+user.uid)
        return user;
    } catch (error) {
        toast.error(error.message)
    }
}
export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user;
    }
    catch (error) {
        toast.error(error.message)
    }
}
export const logout = async () => {
    try {
        await signOut(auth)
        return true;
    } catch (error) {
        toast.error(error.message)
    }
}


// ------------------ DATABASE ------------------


export const setData = async (data, path) => {
    try {
        const setDataRef = ref(db, path);
        await set(setDataRef, data);
        return true;
    } catch (error) {
        toast.error(error.message)
    }
}

export const pushData = async (data, path) => {
    try {
        const addDataRef = ref(db, path);
        await push(addDataRef, data);
        return true;
    } catch (error) {
        toast.error(error.message)
    }
}

export const updateData = async (data, path) => {
    try {
        const updateDataRef = ref(db, path);
        await update(updateDataRef, data);
        return true;
    } catch (error) {
        toast.error(error.message);
    }
};

export const deleteData = async (path) => {
    try {
        const deleteDataRef = ref(db, path);
        await remove(deleteDataRef);
        return true;
    } catch (error) {
        toast.error(error.message);
    }
};

export const getData = async (path) => {
    try {
        const dataRef = ref(db, path);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
            // Data found at the specified path
            return snapshot.val();
        } else {
            // Data does not exist at the specified path
            return null;
        }
    } catch (error) {
        toast.error(error.message);
        return null;
    }
};

export const listenForDataUpdates = (path, callback) => {
    const dataRef = ref(db, path);

    const dataListener = onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Call the provided callback function with the data
            callback(data);
        } else {
            // Data does not exist at the specified path, call the callback with null
            callback(null);
        }
    }, (error) => {
        toast.error(error.message);
    });

    // Return the unsubscribe function, if needed to remove the listener later
    return () => {
        off(dataRef, 'value', dataListener);
    };
};



export default app;