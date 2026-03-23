import React, { createContext, useContext, useEffect, useState,  } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"
import api from "../utils/api/api";
import { useLoading } from "./loadingContext";
// import UserContext from "./UserContext";
import { useUserInfo } from "./UserInfoContext";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: { email: string; username: string } | null;
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  // login: (emailOrUsername: string, password: string) => void;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
  setIsBetSlipOpen: React.Dispatch<React.SetStateAction<boolean>>
  isBetSlipOpen: boolean;
  isSidebarOpen:boolean;
  setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>
  refreshAccessToken: () => void; 

}

 export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string; username: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const {getUserWallet} = useUserInfo()
  const {} = useUserInfo()
  const [isBetSlipOpen, setIsBetSlipOpen] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


  
 
  useEffect(() => {
    const tokenFromCookie = Cookies.get("access_token");
    if (tokenFromCookie) {
      setAccessToken(tokenFromCookie);
    }
  }, []);


  
  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          setIsLoading(true);
          const response = await api.get("auth/check-auth", {        
            withCredentials: true,
          });          

          if (response.data.isLoggedIn) {
            setIsLoggedIn(true);
            setUser(response.data.user);
            getUserWallet()
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (error) {
          setIsLoggedIn(false);
          setUser(null);
          console.error("Error checking auth:", error);
        }finally{
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, [accessToken,setAccessToken,setIsLoggedIn,Navigate]);  // This effect runs when accessToken changes

    // Load user from cookies or session if available
    // useEffect(() => {
    //   // Access token is stored in HttpOnly cookies
    //   // You can call an API to fetch the current user's details or validate the token.
    //   axios.get("/api/user/me", { withCredentials: true }) // WithCredentials ensures cookies are sent
    //     .then(response => {
    //       setUser(response.data.user);
    //       setAccessToken(response.data.access_token); // Get access token from response
    //     })
    //     .catch(error => {
    //       console.error("Error loading user:", error);
    //     });
    // }, []);


      // plinko game
      const getPlinko = async () => {
        try {
          const response = await api.get("/games", {
          });
      
          return response.data;
        } catch (error) {
          console.error("Login failed:", error);
          throw error;  // Make sure to throw the error so React Query can handle it
        }
      };

    // Register function
    const register = async (email: string, username: string, password: string) => {
      try {
        setIsLoading(true);
        const response = await axios.post("http://your-backend-url/register", {
          email,
          username,
          password,
        }, { withCredentials: true });
  
        const { access_token, refresh_token, user } = response.data;
        
        // Set access token and user state
        setAccessToken(access_token);
        setUser(user);
        getUserWallet()
      } catch (error) {
        console.error("Registration failed:", error);
      }finally{
        setIsLoading(false);
      }
    };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSidebarOpen(false);
        setIsBetSlipOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Check the initial screen size
    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
      setIsBetSlipOpen(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
      // Function to refresh the access token using the refresh token
      useEffect(() => {
        const interceptor = axios.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error.response && error.response.status === 401) {
              // Token expired, try to refresh it
              await refreshAccessToken();
              return axios(error.config); // Retry the failed request with the new token
            }
            return Promise.reject(error); // Reject if it's not a 401 error
          }
        );
    
        // Cleanup interceptor on component unmount
        return () => axios.interceptors.response.eject(interceptor);
      }, []);
    
      const refreshAccessToken = async () => {
        try {
          setIsLoading(true);
          const response = await axios.post("http://localhost:3000/api/v1/auth/refresh-token", { withCredentials: true });
          const newAccessToken = response.data.access_token;
    
          // Store the new access token in cookies
          Cookies.set("access_token", newAccessToken, { expires: 30 , secure: process.env.NODE_ENV === 'production' });
          getUserWallet()
          setAccessToken(newAccessToken);
        } catch (error) {
          console.error("Failed to refresh access token:", error);
        }
        finally{
          setIsLoading(false);
        }
      };
    

    // Logout function
    const logout = () => {
      setIsLoading(true);
      setUser(null);
      setAccessToken(null);
      setIsLoggedIn(false);
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      
      localStorage.clear();
      sessionStorage.clear();
  
      // Clear localStorage and cookies
      api.post("/logout", {}, { withCredentials: true }) // Send request to logout from backend and invalidate session
        .then(() => {
          console.log("Logged out successfully");
          window.location.href = "/login"; 
        })
        .catch(err => {
          console.error("Logout failed:", err);
        })
        .finally(() => {
          setIsLoading(false);  
        })
    };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, accessToken,setAccessToken, register, logout, refreshAccessToken,  isBetSlipOpen, setIsBetSlipOpen, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
