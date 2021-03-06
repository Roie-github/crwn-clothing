import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBHJKEU28DmzhR9pZ2sY0czdjgz9W-ZARA",
    authDomain: "crwn-db-639a4.firebaseapp.com",
    projectId: "crwn-db-639a4",
    storageBucket: "crwn-db-639a4.appspot.com",
    messagingSenderId: "642103635869",
    appId: "1:642103635869:web:e05076266c320a6b110974"
};

export const createUserProfileDocument= async(userAuth, additionalData)=>{
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot =await userRef.get();

   if(!snapShot.exists){
        const { displayName, email}  =userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userRef;
    

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle =()=>auth.signInWithPopup(provider);

export default firebase;