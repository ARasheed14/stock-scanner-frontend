import { onAuthStateChanged, type User } from "firebase/auth";
import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { auth } from "../services/firebase/config"
import * as authService from "../services/firebase/auth";

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string, displayName?: string) => Promise<User>;
    signIn: (email: string, password: string) => Promise<User>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
        const u = await authService.signUp(email, password, displayName);
        return u;
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        const u = await authService.signIn(email, password);
        return u;
    }, []);

    const signOut = useCallback(async () => {
        await authService.signOut();
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        loading,
        signUp,
        signIn,
        signOut,
    }), [user, loading, signUp, signIn, signOut]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };