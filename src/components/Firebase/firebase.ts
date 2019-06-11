import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const firestore = app.firestore();
export const database = app.database();

class Firebase {
    doCreateUserWithEmailAndPassword = (email:string, password:string) =>
        auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email:string, password:string) =>
        auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => auth.signOut();

    doPasswordReset = (email:string) => auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password:string) =>
        auth.currentUser && auth.currentUser.updatePassword(password);

    user = (uid: string) => database.ref(`users/${uid}`);
    users = () => database.ref('users');
}

export default Firebase;