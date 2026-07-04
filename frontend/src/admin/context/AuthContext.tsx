import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import type { AdminUser } from "../types";

import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../../api/authApi";

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  loginError: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Restore session on page refresh
  useEffect(() => {
    async function restoreSession() {
      try {
        const data = await getCurrentAdmin();
        setUser(data.admin);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const data = await loginAdmin(username, password);

      setUser(data.admin);
      setLoginError(null);

      return true;
    } catch (err: any) {
      setLoginError(err.message);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}