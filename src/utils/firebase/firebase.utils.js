import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {
getFirestore, 
doc, 
getDoc, 
setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCSWAJ0ZUNyAfL8c38VwdeLBRD-Kb3Auv0",
    authDomain: "crwn-clothing-572e4.firebaseapp.com",
    projectId: "crwn-clothing-572e4",
    storageBucket: "crwn-clothing-572e4.appspot.com",
    messagingSenderId: "779876054550",
    appId: "1:779876054550:web:36dc8566e5beadff2d6737"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // if the user snapshot doesnt exist then pull off displayname and email from userauth
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        // create a created at 
        const createdAt = new Date();
        
        // set doc with displayname email createdat
        try {
            await  setDoc(userDocRef,  {displayName, email, createdAt})
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  }