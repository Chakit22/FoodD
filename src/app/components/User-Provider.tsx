"use client";

import { createContext, useContext, useState } from "react";

interface ContextProps {
  email: string;
  setEmail: (email: string) => void;
}

const UserContext = createContext<ContextProps>({
  email: "",
  setEmail: (email: string) => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("");

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
}

// useUser returns the current Context's value
export const useUser = () => useContext(UserContext);
