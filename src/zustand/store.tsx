import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the store's state
interface AuthState {
  authUser: string | null;
  balance: number;
  games: any[]; // Replace `any` with a proper type if available
  setAuthUser: (user: string) => void;
  logout: () => void;
  setBalance: (balance: number) => void;
  setGames: (games: any[]) => void;
}

// Get user from localStorage
const storedUser = localStorage.getItem("userInfo");

// Create initial state
const initialState: AuthState = {
  authUser: storedUser ? JSON.parse(storedUser) : null,
  balance: 0,
  games: [],
  setAuthUser: () => {},
  logout: () => {},
  setBalance: () => {},
  setGames: () => {},
};

// Create Context
const AuthContext = createContext<AuthState>(initialState);

// Custom Hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);

// Context Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUserState] = useState<string | null>(initialState.authUser);
  const [balance, setBalanceState] = useState<number>(0);
  const [games, setGamesState] = useState<any[]>([]);

  // Define functions
  const setAuthUser = (user: string) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    setAuthUserState(user);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setAuthUserState(null);
  };

  const setBalance = (balance: number) => setBalanceState(balance);
  const setGames = (games: any[]) => setGamesState(games);

  return (
    <AuthContext.Provider value={{ authUser, balance, games, setAuthUser, logout, setBalance, setGames }}>
      {children}
    </AuthContext.Provider>
  );
};
