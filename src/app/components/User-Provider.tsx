"use client";

import { User } from "@/types/User";
import { createContext, useContext, useState } from "react";

interface ContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<ContextProps>({
  user: {} as User,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// useUser returns the current Context's value
export const useUser = () => useContext(UserContext);
