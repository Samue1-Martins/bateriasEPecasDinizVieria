"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const tokenResult = await firebaseUser.getIdTokenResult(true);
        const hasAdminClaim = tokenResult.claims.admin === true;

        setUser(firebaseUser);
        setIsAdmin(hasAdminClaim);
      } catch {
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const tokenResult = await credential.user.getIdTokenResult(true);

    if (tokenResult.claims.admin !== true) {
      await signOut(auth);
      throw new Error(
        "Acesso negado: esta conta não possui permissão administrativa."
      );
    }

    setUser(credential.user);
    setIsAdmin(true);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider.");
  }
  return ctx;
}
