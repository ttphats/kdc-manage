"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Permission, ROLE_PERMISSIONS } from "../types";
import { authenticateUser } from "../data/mockUsers";

interface AuthContextType {
  user: User | null;
  permissions: Permission;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permission>(
    ROLE_PERMISSIONS.viewer
  );

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);
      setPermissions(ROLE_PERMISSIONS[parsedUser.role]);
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const authenticatedUser = authenticateUser(username, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setPermissions(ROLE_PERMISSIONS[authenticatedUser.role]);
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPermissions(ROLE_PERMISSIONS.viewer);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
