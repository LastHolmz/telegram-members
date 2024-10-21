"use client";

import { UserSession } from "@/types";
import React, { createContext, useContext } from "react";

/**
 * Defines the shape of the authentication context.
 * @property {UserSession | null} user - The user session object or null if no session exists.
 */
interface AuthContextType {
  user: UserSession | null;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  user: UserSession | null;
}> = ({ children, user }) => {
  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
