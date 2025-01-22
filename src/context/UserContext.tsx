import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/User";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Replace with your API call
    const response = await fetch(
      "https://journal-app-backend-omega.vercel.app/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    // Replace with your API call
    const response = await fetch(
      "https://journal-app-backend-omega.vercel.app/users",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const data = await response.json();
    setUser(data);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
