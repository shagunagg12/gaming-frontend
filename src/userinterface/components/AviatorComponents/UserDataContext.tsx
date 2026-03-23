import { createContext, useEffect, useRef, useState, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { baseURL } from "./config";
import { useUserInfo } from "../../../context/UserInfoContext";
// Define the shape of user data
interface UserData {
  name: string;
  email: string;
  _id?: string;
  [key: string]: any; // to allow extra properties like _id, etc.

}

// Define the context value type
interface UserDataContextType {
  GETUSER: any;
  userData: { name: string; email: string };
  setUserData: React.Dispatch<React.SetStateAction<{ name: string; email: string }>>;
  socketRef: React.MutableRefObject<Socket | null>;
  socket: Socket | null; // ✅ Add this
  time: any;
  setTime: React.Dispatch<React.SetStateAction<any>>;
  socketuserData: any;
  setSocketUserData: React.Dispatch<React.SetStateAction<any>>;
  loaderShow: boolean;
  setLoaderShow: React.Dispatch<React.SetStateAction<boolean>>;
  loaderShowMain: boolean;
  setLoaderShowMain: React.Dispatch<React.SetStateAction<boolean>>;
  amountMain: any;
  betCrash: any;
  setBetCrash: React.Dispatch<React.SetStateAction<any>>;
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Get user from session
const GETUSER: UserData | null = JSON.parse(sessionStorage.getItem("user") || "null");

// Export userId
export const userId = GETUSER?._id;

// Provider props
interface Props {
  children: ReactNode;
}

export const UserDataProvider = ({ children }: Props) => {

  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const socketRef = useRef<Socket | null>(null);

  const [socketuserData, setSocketUserData] = useState<any>();
  const [betCrash, setBetCrash] = useState<any>();
  const [loaderShow, setLoaderShow] = useState<boolean>(true);
  const [loaderShowMain, setLoaderShowMain] = useState<boolean>(false);
  const [time, setTime] = useState<any>();
  const [amountMain, setAmountMain] = useState<any>(0);

 
  
  useEffect(() => {
    if (!GETUSER) {
      const socket = io(baseURL, {
        transports: ["websocket", "polling", "flashsocket"],
        query: { globalRoom: '67de9ff37e2836d75a5f2afe' },
      });

      socketRef.current = socket;

      socketRef.current.on("connect", () => {
        if (socket.connected) {
          setTimeout(() => {
            socket.emit("startGame", {});
            socket.on("start", (data) => {
              setLoaderShow(false);
              setSocketUserData(data);
            });
            socket.on("time", (time) => {
              setTime(time);
            });
            socket.on("amount", (data) => {
              console.log("data", data?.diamond);
              setAmountMain(data);
            });
          }, 1000);
        }
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        GETUSER,
        userData,
        setUserData,
        socketRef,
        socket: socketRef.current, // ✅ Must match the type
        time,
        setTime,
        socketuserData,
        setSocketUserData,
        loaderShow,
        setLoaderShow,
        loaderShowMain,
        setLoaderShowMain,
        amountMain,
        betCrash,
        setBetCrash,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
