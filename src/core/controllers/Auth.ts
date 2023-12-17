import { auth } from '@src/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { User, Error } from '@src/core/models';
import { createUser } from '@src/core/controllers/User';

export async function registerUser(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    //const user = {} as User;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        createUser(user.uid, user.email as string)
          .then(user => {
            resolve(user);
          })
          .catch(error => {
            //console.log('ERRO CREATE USER:', error);
            reject(error as Error);
          });
      })
      .catch(error => {
        //console.log('ERRO REGISTER:', error);
        reject(error as Error);
      });
  });
}

export async function loginUser(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        resolve({
          id: user.uid,
          email: user.email as string,
          created_at: '',
        } as User);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export function logoutUser(): Promise<void> {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}
