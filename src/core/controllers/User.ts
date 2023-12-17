import { db } from '@src/firebase';
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { User, Error, Script } from '@src/core/models';
import { v4 as uuidv4 } from 'uuid';

export async function createUser(userId: string, email: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'users', userId);
    const user = {
      id: userId,
      email: email,
      created_at: new Date().toISOString(),
    } as User;
    setDoc(docRef, {
      ...user,
    })
      .then(() => {
        resolve(user);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function getUser(userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const user = {} as User;
    const docRef = doc(db, 'users', userId);
    const collectionRef = collection(db, 'users', userId, 'scripts');
    getDoc(docRef)
      .then(docSnap => {
        user.id = docSnap.data()?.id;
        user.email = docSnap.data()?.email;
        user.created_at = docSnap.data()?.created_at;
        user.scripts = [];
        getDocs(collectionRef).then(querySnapshot => {
          querySnapshot.forEach(doc => {
            user.scripts.push(doc.data() as Script);
          });
          resolve(user);
        });
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function getNumberOfScriptsFromUser(userId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const collectionRef = collection(db, 'users', userId, 'scripts');
    getDocs(collectionRef)
      .then(querySnapshot => {
        resolve(querySnapshot.size);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function createScriptFromUser(userId: string, script: Script): Promise<Script> {
  return new Promise((resolve, reject) => {
    const scriptId = uuidv4();
    const docRef = doc(db, 'users', userId, 'scripts', scriptId);
    setDoc(docRef, {
      id: scriptId,
      ...script,
    })
      .then(() => {
        resolve({
          id: scriptId,
          ...script,
        } as Script);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function getScriptFromUser(userId: string, scriptId: string): Promise<Script> {
  console.log('userId', userId, 'scriptId', scriptId);
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'users', userId, 'scripts', scriptId);
    getDoc(docRef)
      .then(docSnap => {
        resolve(docSnap.data() as Script);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function getLastUpdatedScriptFromUser(userId: string): Promise<Script> {
  return new Promise((resolve, reject) => {
    const collectionRef = collection(db, 'users', userId, 'scripts');
    getDocs(collectionRef)
      .then(querySnapshot => {
        const scripts: Script[] = [];
        querySnapshot.forEach(doc => {
          scripts.push(doc.data() as Script);
        });
        scripts.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);
          return dateB.getTime() - dateA.getTime();
        });
        resolve(scripts[0]);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function getScriptsFromUser(userId: string): Promise<Script[]> {
  return new Promise((resolve, reject) => {
    const collectionRef = collection(db, 'users', userId, 'scripts');
    getDocs(collectionRef)
      .then(querySnapshot => {
        const scripts: Script[] = [];
        querySnapshot.forEach(doc => {
          scripts.push(doc.data() as Script);
        });
        scripts.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);
          return dateB.getTime() - dateA.getTime();
        });
        resolve(scripts);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function updateScriptFromUser(userId: string, script: Script): Promise<Script> {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'users', userId, 'scripts', script.id);
    setDoc(docRef, {
      ...script,
    })
      .then(() => {
        resolve(script);
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export async function deleteScriptFromUser(userId: string, scriptId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, 'users', userId, 'scripts', scriptId);
    deleteDoc(docRef)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error as Error);
      });
  });
}

export function transformDateToShowFormat(stringDate: string): string {
  const date = new Date(stringDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
