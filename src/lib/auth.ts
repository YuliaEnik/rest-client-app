import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './firebase';
import { SignInFormData, SignUpFormData } from './validation-auth';

export const signUpWithEmail = async (data: SignUpFormData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  await updateProfile(userCredential.user, { displayName: data.displayName });
  return userCredential;
};

export const signInWithEmail = async (data: SignInFormData) => {
  return await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
