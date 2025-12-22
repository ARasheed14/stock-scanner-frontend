import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as userSignOut, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

export async function signUp(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    await updateProfile(user, { displayName: email });

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: email,
        accountType: "basic", // default
        createdAt: serverTimestamp(),
    });

    return user;
}

export async function signIn(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

export function signOut() {
    return userSignOut(auth);
}