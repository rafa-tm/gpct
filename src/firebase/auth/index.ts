import { auth } from '..';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { User } from '@src/models/User';
import { createUser } from '@src/firebase/db/User';

export async function registerUser(
  email: string,
  password: string,
): Promise<{ user?: User; error?: { code: string; message: string } }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await createUser(user.uid, user.email);
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ user?: User; error?: { code: string; message: string } }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user };
  } catch (error) {
    return { error };
  }
}

export function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch(error => {
      console.log(error);
    });
}
