"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AUTH_STORAGE_KEY = "erp_auth_user";

export type UserRole = "admin" | "team-lead" | "sales-associate";

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Mock credentials - accept these for demo
const MOCK_CREDENTIALS = [
  {
    email: "admin@holidaypanda.com",
    password: "password123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    email: "teamlead@holidaypanda.com",
    password: "password123",
    name: "Team Lead User",
    role: "team-lead" as const,
  },
  { email: "demo@example.com", password: "password123", name: "Demo User", role: "admin" as const },
  { email: "renjith@example.com", password: "password123", name: "Renjith", role: "admin" as const },
  // Accept any email with password "password123" for convenience
];

function mockLogin(email: string, password: string): User | null {
  const normalizedEmail = email.trim().toLowerCase();
  const credential = MOCK_CREDENTIALS.find(
    (c) => c.email === normalizedEmail && c.password === password
  );
  if (credential) {
    return {
      email: credential.email,
      name: credential.name,
      role: credential.role,
    };
  }
  // Fallback: accept any email + "password123"
  if (password === "password123") {
    return {
      email: normalizedEmail || "user@example.com",
      name: normalizedEmail.split("@")[0] || "User",
      role: "sales-associate",
    };
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const found = mockLogin(email, password);
      if (found) {
        setUser(found);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found));
        } catch {
          // ignore
        }
        return { success: true };
      }
      return { success: false, error: "Invalid email or password" };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
