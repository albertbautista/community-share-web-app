"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    isHydrated: boolean;
    isAuthenticated: boolean;
    token: string | null;
  }>({
    isHydrated: false,
    isAuthenticated: false,
    token: null,
  });

  // Initialize auth state from localStorage after hydration
  // This is necessary for server-side rendering to avoid hydration mismatches
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("communityShareToken");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({
        isHydrated: true,
        isAuthenticated: !!storedToken,
        token: storedToken,
      });
    } catch {
      setState({
        isHydrated: true,
        isAuthenticated: false,
        token: null,
      });
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("communityShareToken", newToken);
    setState({
      isHydrated: true,
      isAuthenticated: true,
      token: newToken,
    });
  };

  const logout = () => {
    localStorage.removeItem("communityShareToken");
    setState({
      isHydrated: true,
      isAuthenticated: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}