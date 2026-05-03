"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  login: (token: string, username?: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    isHydrated: boolean;
    isAuthenticated: boolean;
    token: string | null;
    username: string | null;
  }>({
    isHydrated: false,
    isAuthenticated: false,
    token: null,
    username: null,
  });

  // Initialize auth state from localStorage after hydration
  // This is necessary for server-side rendering to avoid hydration mismatches
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("communityShareToken");
      const storedUsername = localStorage.getItem("communityShareUsername");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({
        isHydrated: true,
        isAuthenticated: !!storedToken,
        token: storedToken,
        username: storedUsername,
      });
    } catch {
      setState({
        isHydrated: true,
        isAuthenticated: false,
        token: null,
        username: null,
      });
    }
  }, []);

  const login = (newToken: string, newUsername: string | null = null) => {
    localStorage.setItem("communityShareToken", newToken);
    if (newUsername) {
      localStorage.setItem("communityShareUsername", newUsername);
    }
    setState({
      isHydrated: true,
      isAuthenticated: true,
      token: newToken,
      username: newUsername,
    });
  };

  const logout = () => {
    localStorage.removeItem("communityShareToken");
    localStorage.removeItem("communityShareUsername");
    setState({
      isHydrated: true,
      isAuthenticated: false,
      token: null,
      username: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        username: state.username,
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