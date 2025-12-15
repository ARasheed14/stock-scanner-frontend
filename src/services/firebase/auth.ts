import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as userSignOut, updateProfile } from "firebase/auth";
import { auth } from "./config";

export async function signUp(email: string, password: string, displayName?: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Set display name on firebase record.
    if (displayName && cred.user) {
        await updateProfile(cred.user, { displayName });
    }

    return cred.user;
}

export async function signIn(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

export function signOut() {
    return userSignOut(auth);
}