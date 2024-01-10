import {User, wallet} from '../types/Types';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const create = async (user: User) => {
  try {
    await auth().createUserWithEmailAndPassword(user.email, user.password);
  } catch (e) {
    console.log(e);
  }
};

const signin = async (user: User): Promise<any> => {
  try {
    return await auth().signInWithEmailAndPassword(user.email, user.password);
  } catch (e) {
    console.log(e);
  }
};
const logout = async () => {
  try {
    await auth().signOut();
  } catch (e) {
    console.log(e);
  }
};

async function onGoogleSignin() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log(e);
  }
}

const getCurrentUser = () => {
  try {
    return auth().currentUser;
  } catch (error) {}
};

const walletDoc = 'myWallet';
const optionDoc = 'options';

const walletDB = firestore().collection(walletDoc);
const optionDB = firestore().collection(optionDoc);

const saveData = ({data}: {data: wallet[]}) => {
  try {
    data.forEach(item => {
      const fields = {
        ...item,
        createdAt: firestore.FieldValue.serverTimestamp(),
        createdMonth: new Date(Date.now()).toLocaleString('en-US', {
          month: 'long',
        }),
        userId: getCurrentUser()?.uid,
      };
      walletDB.add(fields);
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

const updateData = ({docId, data}: {docId: string; data: wallet}) => {
  try {
    return walletDB.doc(docId).update(data);
  } catch (e) {
    console.log(e);
  }
};

const deleteData = ({docId}: {docId: string}) => {
  try {
    return walletDB.doc(docId).delete();
  } catch (e) {
    console.log(e);
  }
};

export default {
  createUser: create,
  signin,
  logout,
  onGoogleSignin,
  getCurrentUser,
  walletDB,
  optionDB,
  saveData,
  updateData,
  deleteData,
};
