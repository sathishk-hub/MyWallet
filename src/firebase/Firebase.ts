import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {User} from '../types/Types';
import auth from '@react-native-firebase/auth';

const create = async (user: User) => {
  try {
    await auth().createUserWithEmailAndPassword(user.email, user.password);
  } catch (e) {
    console.log(e);
  }
};

const signin = async (user: User) => {
  try {
    await auth().signInWithEmailAndPassword(user.email, user.password);
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
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default {
  createUser: create,
  signin,
  logout,
  onGoogleSignin,
};
