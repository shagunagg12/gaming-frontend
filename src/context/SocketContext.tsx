import React, { createContext, useContext, useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import { createSocket, connectSocket, safeEmit, disconnectSocket } from "../sockets/socketClient";

// --- Types ---
export type ServerToClientEvents = {
  matchesSnapshot: (payload: any) => void;
  matchSnapshot: (payload: any) => void;
  matchesUpdate: (payload: any) => void;
  matchUpdate: (payload: any) => void;

  betPlaced: (payload: any) => void;
  betError: (payload: any) => void;
  bombClicked: (payload: any) => void;
  gemClicked: (payload: any) => void;
  gameError: (payload: any) => void;
  cashoutSuccess: (payload: any) => void;
  joinedRoom: (data: { room: string }) => void;



  [event: string]: (...args: any[]) => void;
};

export type ClientToServerEvents = {
  joinSports: (room: string) => void;
  joinGame: (gameType: "hilo" | "mines" | "blackjack" | "coinflip") => void;
  leaveRoom: (room: string) => void;
  placeBet: (payload: { amount: number; game: string }) => void;
  
  [event: string]: (...args: any[]) => void;

};

// --- Context Type ---
interface SocketContextType {
  socket: Socket | null;
  on: <T = any>(event: keyof ServerToClientEvents, handler: (data: T) => void) => () => void;
  once: <T = any>(event: keyof ServerToClientEvents, handler: (data: T) => void) => () => void;
  emit: (event: keyof ClientToServerEvents, payload?: any) => void;
  joinSportsRoom: (room: string) => void;
  joinCasinoRoom: (gameType: "hilo" | "mines" | "blackjack" | "coinflip") => void;
  leaveRoom: (room: string) => void;
  close: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// --- Provider ---
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = createSocket();
    connectSocket().catch(console.error);

    return () => {
      disconnectSocket();
    };
  }, []);

  const emit = React.useCallback(
    (event: keyof ClientToServerEvents, payload?: any) => {
      safeEmit(event as string, payload);
    },
    []
  );

  const on = React.useCallback(
    <T = any>(event: keyof ServerToClientEvents, handler: (data: T) => void) => {
      const s = socketRef.current;
      if (!s) return () => {};
      s.on(event as string, handler);
      return () => s.off(event as string, handler);
    },
    []
  );

  const once = React.useCallback(
    <T = any>(event: keyof ServerToClientEvents, handler: (data: T) => void) => {
      const s = socketRef.current;
      if (!s) return () => {};
      s.once(event as string, handler);
      return () => s.off(event as string, handler);
    },
    []
  );

  const joinSportsRoom = React.useCallback(
    (room: string) => emit("joinSports", room),
    [emit]
  );
  const joinCasinoRoom = React.useCallback(
    (gameType: "hilo" | "mines" | "blackjack" | "coinflip") => emit("joinGame", gameType),
    [emit]
  );
  const leaveRoom = React.useCallback((room: string) => emit("leaveRoom", room), [emit]);
  const close = React.useCallback(() => disconnectSocket(), []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        on,
        once,
        emit,
        joinSportsRoom,
        joinCasinoRoom,
        leaveRoom,
        close,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within a SocketProvider");
  return ctx;
};
