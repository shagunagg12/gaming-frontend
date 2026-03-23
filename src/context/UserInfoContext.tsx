import React, { createContext, useContext,  useEffect,  useState } from "react";
import api from "../utils/api/api";
import useApi from "../hooks/useApi";
import { UserSettingsTypes } from "../utils/types/UserSettingsTypes";
import Cookies from "js-cookie";

// Create the context

interface UserContextType {
       userWalletBalance: number;
        setUserWalletBalance: React.Dispatch<React.SetStateAction<number>>;
        userBonusBalance : number;
        setuserBonusBalance: React.Dispatch<React.SetStateAction<number>>;
        userTotalBalance: number;
        setuserTotalBalance: React.Dispatch<React.SetStateAction<number>>;
        userTotalBet: number;
        setuserTotalBet: React.Dispatch<React.SetStateAction<number>>;
        userTotalWin: number;
        setuserTotalWin: React.Dispatch<React.SetStateAction<number>>;
        userTotalLoss: number;
        setuserTotalLoss: React.Dispatch<React.SetStateAction<number>>;
        userTotalProfit : number;
        setuserTotalProfit: React.Dispatch<React.SetStateAction<number>>;
        userTotalDeposit: number;
        setuserTotalDeposit : React.Dispatch<React.SetStateAction<number>>;
        userTotalWithdraw: number;
        setuserTotalWithdraw: React.Dispatch<React.SetStateAction<number>>;
        userTotalReferral: number;
        setuserTotalReferral: React.Dispatch<React.SetStateAction<number>>;
        betAmt: number;
        setBetAmt: React.Dispatch<React.SetStateAction<number>>;
        getUserWallet: () => Promise<void>;
        betAmtHilo: number;
        setBetAmtHilo: React.Dispatch<React.SetStateAction<number>>;
        betAmtMines: number;
        setBetAmtMines: React.Dispatch<React.SetStateAction<number>>;
        betAmtCoinFlip: number;
        setBetAmtCoinFlip: React.Dispatch<React.SetStateAction<number>>;
        betAmtDice: number;
        setBetAmtDice: React.Dispatch<React.SetStateAction<number>>;
        betAmtCrash: number;
        setBetAmtCrash: React.Dispatch<React.SetStateAction<number>>;
        userId: string;
        userSettings: UserSettingsTypes | undefined;
        refetchUserSettings: () => void;
        country: string | null;
        countryLoading: boolean;
        selectedCurrency: string;
        countryError: Error  | null;
        setCountry: React.Dispatch<React.SetStateAction<string | null>>;
        setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
        refetchCountry: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface props {
  children: React.ReactNode;
}
// Dialog context provider
export const UserProvider: React.FC<props> = ({ children }) => {
  const [userWalletBalance, setUserWalletBalance] = useState<number>(0);
  const [userBonusBalance, setuserBonusBalance] = useState<number>(0);
  const [userTotalBalance, setuserTotalBalance] = useState<number>(0);
  const [userTotalBet, setuserTotalBet] = useState<number>(0);
  const [userTotalWin, setuserTotalWin] = useState<number>(0);
  const [userTotalLoss, setuserTotalLoss] = useState<number>(0);
  const [userTotalProfit, setuserTotalProfit] = useState<number>(0);
  const [userTotalDeposit, setuserTotalDeposit] = useState<number>(0);
  const [userTotalWithdraw, setuserTotalWithdraw] = useState<number>(0);
  const [userTotalReferral, setuserTotalReferral] = useState<number>(0);
  const [betAmt , setBetAmt] = useState<number>(0.00);
  const [betAmtHilo , setBetAmtHilo] = useState<number>(0.00);
  const [betAmtMines , setBetAmtMines] = useState<number>(0.00);
  const [betAmtCoinFlip , setBetAmtCoinFlip] = useState<number>(0.00);
  const [betAmtDice , setBetAmtDice] = useState<number>(0.00);
  const [betAmtCrash , setBetAmtCrash] = useState<number>(0.00);
  const [userId , setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')

  // const [userSettings, setUserSettings] = useState<any>({});

  const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_ACCESS_TOKEN
  const {useFetchData, useFetchWithoutBaseUrl} = useApi();

  const {data: userSettings , error, isPending, refetch:refetchUserSettings} = useFetchData<UserSettingsTypes>(`user_settings/${userId}`,Boolean(userId));
 const {
  data: countryData,
  error: countryError,
  isPending: countryLoading,
  refetch: refetchCountry,
  } = useFetchWithoutBaseUrl<any>(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`);


  useEffect(() => {
    setCountry(countryData?.country || null);
    setSelectedCurrency(countryData?.country || '');
  },[countryData]);

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
  };

 const getUserWallet = async () => {
    try {
      const response = await api.get(`/wallet/my_wallet`, { withCredentials: true });
      console.log('wallet data',response.data);
      setUserWalletBalance(response.data.data.balance);
      setUserId(response.data.data.user._id);
      Cookies.set('userId', response.data.data.user._id, { expires: 7 }); // Store userId in cookies for 7 days
    } catch (error) {
      console.error("Failed to get wallet:", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const updateBetAmt= async () => {
    try {
      const response = await api.post(`/wallets/my_wallet`, betAmt,
        { 
          withCredentials: true 
        }
      );
      console.log('wallet data',response.data);
      setUserWalletBalance(response.data.data.balance);
      
    } catch (error) {
      console.error("Failed to get wallet:", error);
    }
    finally{
      setIsLoading(false) 
      getUserWallet();
    }
  };

  

  

  return (
    <UserContext.Provider
      value={{
        userWalletBalance,
        setUserWalletBalance,
        userBonusBalance,
        setuserBonusBalance,
        userTotalBalance,
        setuserTotalBalance,
        userTotalBet,
        setuserTotalBet,
        userTotalWin,
        setuserTotalWin,
        userTotalLoss,
        setuserTotalLoss,
        userTotalProfit,
        setuserTotalProfit,
        userTotalDeposit,
        setuserTotalDeposit,
        userTotalWithdraw,
        setuserTotalWithdraw,
        userTotalReferral,
        setuserTotalReferral,
        betAmt,
        setBetAmt,
        getUserWallet,
        betAmtHilo,
        setBetAmtHilo,
        betAmtMines,
        setBetAmtMines,
        betAmtCoinFlip,
        setBetAmtCoinFlip,
        betAmtDice,
        setBetAmtDice,
        betAmtCrash,
        setBetAmtCrash,
        userId,
        userSettings,
        refetchUserSettings,
        country,
        countryLoading,
        selectedCurrency,
        setCountry,
        setSelectedCurrency,
        countryError,
        refetchCountry
      }}
    >
      {children}
    </UserContext.Provider>
  );
 
};
export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserProvider");
  }
  return context;
};
