// src/sockets/socketClient.ts
import { io, Socket } from "socket.io-client";

declare global {
  interface Window { __SOCKET__?: Socket; }
}


function getAuthToken(): string | null {
 
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);

  return localStorage.getItem("access_token");
}

const SOCKET_URL = import.meta.env.VITE_API_URL  as string; 

// Socket options
const socketOptions = {
  path: "/socket.io",
  transports: ["websocket", "polling"], 
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000, // 1s
  reconnectionDelayMax: 10_000, // 10s
  timeout: 20_000,
};

let socketInstance: Socket | null = window.__SOCKET__ || null;

export function createSocket(): Socket {
  if (socketInstance) return socketInstance; 

  const token = getAuthToken();

  socketInstance = io(SOCKET_URL, {
    ...socketOptions,
    auth: { token },
    secure: SOCKET_URL?.startsWith("wss://") || SOCKET_URL?.startsWith("https://"),
  });

  if (import.meta.env.MODE !== "production") {
    socketInstance.on("connect", () => {
      console.debug("[socket] connected", socketInstance?.id);
    });
    socketInstance.on("disconnect", (reason) => {
      console.debug("[socket] disconnected", reason);
    });
    socketInstance.on("connect_error", (err) => {
      console.debug("[socket] connect_error", err);
    });
  }

  if (import.meta.env.MODE !== "production") {
    (window as any).__SOCKET__ = socketInstance;
  }

  return socketInstance;
}


export function connectSocket(): Promise<Socket> {
  const socket = createSocket();
  
  if (socket.connected) return Promise.resolve(socket);

  return new Promise((resolve, reject) => {
    const onConnect = () => {
      cleanup();
      resolve(socket);
    };
    const onError = (err: any) => {
      cleanup();
      reject(err);
    };

    function cleanup() {
      socket.off("connect", onConnect);
      socket.off("connect_error", onError);
      socket.off("connect_timeout", onError);
    }

    socket.on("connect", onConnect);
    socket.on("connect_error", onError);
    socket.on("connect_timeout", onError);

    // start the connection
    socket.connect();
    console.log(socket.connected);

  });
}


export async function safeEmit<T = any>(event: string, payload?: T): Promise<void> {
  const sock = socketInstance || createSocket();
  if (!sock.connected) {
    try {
      await connectSocket();
    } catch (err) {
      console.error("[socket] emit failed - cannot connect", err);
      return;
    }
  }
  sock.emit(event, payload);
}



export function disconnectSocket() {
  if (!socketInstance) return;
  try {
    socketInstance.disconnect();
  } catch (err) {
       console.error("[socket] emit failed - cannot connect", err);

   
  }
  socketInstance = null;
  if (import.meta.env.MODE !== "production") {
    delete (window as any).__SOCKET__;
  }
}
