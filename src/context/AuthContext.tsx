import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type userRole = "admin" | "organizer" | "participant";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  role: userRole;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  signup: (data: Omit<User, "id">) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const signup = async (data: Omit<User, "id">) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    if (users.some((u) => u.email === data.email)) {
      throw new Error("Email already exists");
    }

    const newUser: User = { id: uuidv4(), ...data };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) throw new Error("Invalid email or password");

    setUser(foundUser);
    localStorage.setItem("auth_user", JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
