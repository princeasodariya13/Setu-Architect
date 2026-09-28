'use client';

import { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const { data: session, status } = useSession();

  const isAdmin = status === 'authenticated';
  const isLoading = status === 'loading';

  const loginWithCredentials = async (email, password) => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    return res; // returns { error, status, ok, url }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    window.location.href = '/';
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, isLoading, loginWithCredentials, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}

