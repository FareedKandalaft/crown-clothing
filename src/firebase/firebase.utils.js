import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAhm0bCBBUeWAC3h2qsPcXskG9a8vaQ2N0',
  authDomain: 'crown-clothing-db-30868.firebaseapp.com',
  projectId: 'crown-clothing-db-30868',
  storageBucket: 'crown-clothing-db-30868.appspot.com',
  messagingSenderId: '456696521708',
  appId: '1:456696521708:web:4bb88a9d0b5b60b67356c9',
  measurementId: 'G-V0XHEKC9ZE',
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // Note that you must use uid and not id
  // this must have changed recently since
  // course says to use id.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // console.log((await userRef.get()).exists);
  const snap = await userRef.get();
  // check if user exists -- if not then create
  if (!snap.exists) {
    const { displayName, email } = userAuth;
    const createDate = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createDate,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
