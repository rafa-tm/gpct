import { db } from '..';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from '@src/models/User';
import { Scripts, Script } from '@src/models/Scripts';

export async function createUser(userId: string, email: string) {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, {
    id: userId,
    email: email,
    created_at: new Date().toLocaleString(),
    scripts: [],
  });
}

export async function getUser(userId: string): Promise<User> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await docRef.get();
  return docSnap.data() as User;
}

// Save local Script to User
export async function saveScript(userId: string, script: Script) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data();
  const scripts = docSnap.data()?.scripts;
  await setDoc(docRef, {
    ...user,
    // scripts: [...scripts, { id: scripts.length, ...script, shared: false }],
    scripts: [{ id: scripts.length, ...script, shared: false }],
  });
}

// Update Script to User
export async function updateScript(userId: string, script: Script) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data();
  const scripts = docSnap.data()?.scripts;
  const newScripts = scripts.map((s: Script) => {
    if (s.id === script.id) {
      return script;
    }
    return s;
  });
  await setDoc(docRef, {
    ...user,
    scripts: newScripts,
  });
}

// Get All Scripts from User
export async function getAllScriptsFromUser(userId: string): Promise<Scripts> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.scripts;
}

// Get Script from User
export async function getScript(userId: string, scriptId: string): Promise<Script> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await docRef.get();
  return docSnap.data()?.scripts.find((script: Script) => script.id === scriptId);
}

export async function removeScript(userId: string, scriptId: number) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await docRef.get();
  const scripts = docSnap.data()?.scripts;
  const newScripts = scripts.filter((script: Script) => script.id !== scriptId);
  await setDoc(docRef, {
    scripts: newScripts,
  });
}
