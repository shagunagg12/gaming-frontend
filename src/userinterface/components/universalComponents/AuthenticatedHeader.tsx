import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gamblegrid from "../../../assets/images/gamblegrid.png"; // Your logo
import { IoSearchSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoIosChatboxes } from "react-icons/io";
import { FaCodeBranch } from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"; // Importing Dialog component from Headless UI
import walletBg from "../../../assets/images/wallet-boost-desktop.WSJiRqQH.jpg";
import { BiWallet } from "react-icons/bi";
import ToggleTableComponent from "../LandingPageComponents/ToggleTableComponent";
import { BsPersonFill } from "react-icons/bs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CgLogOut } from "react-icons/cg";
import { useAuth } from "../../../context/authContext";
import { useUserInfo } from "../../../context/UserInfoContext";
import { MdAccountBalanceWallet, MdCurrencyFranc, MdCurrencyPound, MdCurrencyRupee } from "react-icons/md";
import { HiTrophy } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { TbListCheck } from "react-icons/tb";
import { RiFileList3Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import Notification from "./Notifications/Notification";
import StatisticsMain from "./StatisticsModel/StatisticsMain";
import ChatSupportMainScreen from "./ChatSupportModel/ChatSupportMainScreen";



const rupeeSign = "\u20B9";



interface Props {
  isOpen: boolean;
  username: string; // Username (personalization)
  notificationsCount: number; // Notification count
  messagesCount: number; // Messages count
}

const AuthenticatedHeader: React.FC<Props> = ({
  isOpen,
  username,
  notificationsCount,
  messagesCount,
}) => {
  const [isOpenWallet, setIsOpenWallet] = useState(false); // Modal state for wallet
  const [isDepositMode, setIsDepositMode] = useState(false);
  const [openProfile, setIsOpenProfile] = useState(false);
  const [notification, setNotification] = useState(false)
  const { userWalletBalance } = useUserInfo();
  interface BreadcrumbItem {
    label: string;
    path: string;
  }

  interface BreadcrumbProps {
    items: BreadcrumbItem[];
  }


  interface DecodedToken {
    exp: number;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout } = useAuth();
  const handleLogoutClick = () => {
    logout();
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      const decoded: DecodedToken = jwtDecode(token);


      // Check if token has expired
      if (decoded.exp * 1000 < Date.now()) {
        if (refreshToken) {
          try {
            // Call API to get new token
            const res = await axios.post("/api/refresh-token", { refreshToken });
            localStorage.setItem("token", res.data.accessToken);

            setIsLoggedIn(true);
          } catch (err) {
            console.error("Refresh token invalid");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        } else {
          console.warn("No refresh token available");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } else {
        setIsLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const [title, setTitle] = useState("")
  const handleSetTitle = (title: string) => {
    setTitle(title)
    if(title==="Logout"){
      handleLogoutClick()
    }
  }
  
  const handleNotification = () => {
    setNotification(prev => !prev)
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const handleProfile = () => {
    setIsOpenProfile(prev => !prev)
  }
  interface MenuItem {
    title: string;
    image?: any; // Optional image
  }
  const menuItems: MenuItem[] = [

    { title: "Wallet", image: MdAccountBalanceWallet },
    { title: "VIP", image: HiTrophy },
    { title: "Affiliate", image: FaCodeBranch },
    { title: "Statistics", image: GoGraph },
    { title: "Transactions", image: TbListCheck },
    { title: "My Bets", image: RiFileList3Fill },
    { title: "Settings", image: IoMdSettings },
    { title: "Live Support", image: BiSupport },
    { title: "Logout", image: HiOutlineLogout },
  ]

  // Function to open the wallet modal
  const handleClick = () => {
    setIsOpenWallet(true);
  };

  // Function to close the wallet modal
  const handleCloseWallet = () => {
    setIsOpenWallet(false);
    setTimeout(() => {
      setIsDepositMode(false);
    }, 300);
  };

  const { getUserWallet } = useUserInfo();
  const handleWalletTest = () => {
    getUserWallet();

  }
  const depositToggleOptions = [
    { title: "Crypto", key: 'crypto' },
    { title: "Local Currency", key: 'local-currency' },
  ]
  return (
    <header
      className={` ${isOpen
        ? "xl:ml-[0px] xl:w-[100%] lg:ml-[0px] lg:w-[100%]"
        : "md:ml-[0px]"
        } transition-all duration-300 select-none justify-evenly h-[60px] flex bg-[rgb(24,61,61)] w-full shadow-md shadow-[#0f0e0e8a] z-20 py-4 items-center`}
    >
      {/* Logo */}
      <Link to={"/casino/home"}>
        <img className="w-32 mr-4" src={gamblegrid} alt="Logo" />
      </Link>

      {/* Wallet Balance */}
      <div className="flex items-center">
        <span className="w-28 h-12 bg-[#092420] rounded flex items-center justify-center font-bold gap-2 text-sm">
          {rupeeSign}
          {userWalletBalance && userWalletBalance.toFixed(2)}
          <span className='w-4 h-4 bg-[#eaff2a] rounded-full mr-2 text-[#5e626a] text-md font-extrabold flex justify-center items-center'>{rupeeSign}</span>

        </span>

        <button
          onClick={handleClick}
          className="bg-[#04d0018c] hover:bg-[#059213b2] text-sm text-white font-bold text-center h-12 rounded-sm w-16 max-md:hidden"
        >
          Wallet
        </button>
      </div>

      {/* User Information & Notifications */}
      <div className="flex flex-row justify-center items-center gap-6">
        <span className="items-center flex font-bold gap-1 text-sm cursor-pointer max-md:hidden">
          <IoSearchSharp className="text-lg cursor-pointer" /> search
        </span>

        {/* <span className="text-white font-bold text-sm">{username}</span> */}

        {/* Account */}
        <div onClick={handleWalletTest} className="relative">
          <BsPersonFill onClick={handleProfile} className="cursor-pointer" />
          {openProfile && (
            <div className="absolute w-[150px] top-7 -left-4 bg-red-400">
              {/* Arrow */}
              <div className="absolute top-3 left-4  transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 z-10"></div>

              {/* Dropdown Menu */}
              <div
                className="absolute left-0 mt-2 max-h-[380px] w-full overflow-auto scrollbar-thin scrollbar-thumb-[#339742] scrollbar-track-[#99ffa8] bg-white shadow-lg rounded-md z-10"
              >
                <ul className="py-2 text-sm text-blue-950 font-semibold">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSetTitle(item.title)}
                    >
                      {/* Handle optional image */}
                      {item.image && (

                        <item.image size={17} />

                      )}
                      <span className="text-left font-bold">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {notificationsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationsCount}
            </span>
          )}
        </div>

        <div className="relative">
          <IoNotifications onClick={handleNotification} className="cursor-pointer" />
          
          {notification &&<div className="absolute w-[200px]  top-7 right-10"><Notification setNotification={setNotification}/></div>}
          {notificationsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationsCount}
            </span>
          )}
        </div>

        <div className="relative">
          <IoIosChatboxes className="cursor-pointer max-md:hidden" />
          {messagesCount > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {messagesCount}
            </span>
          )}
        </div>
        {title==="Statistics" &&
        <StatisticsMain/>
        }
        


        {/* <div onClick={handleLogoutClick} className="relative">
          <CgLogOut className="cursor-pointer max-md:hidden" />
          {messagesCount > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {messagesCount}
            </span>
          )}
        </div> */}
      </div>

      {/* Wallet Modal */}
      <Dialog open={isOpenWallet} onClose={() => { }}>
        <DialogBackdrop
          transition
          className="fixed w-screen h-screen inset-0 bg-black min-h-screen bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-0 data-[leave]:duration-0 data-[enter]:ease-[cubic-bezier(0.7,0,0.3,1)]  data-[leave]:ease-in]:  data-[leave]:ease-in"
        />
        <DialogPanel className="backdrop-blur-lg  scrollbar-thin scrollbar-thumb-[#415c69] scrollbar-track-[#192e38] overflow-y-auto max-h-[80%] fixed top-1/2 left-1/2 duration-0 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a2c38] pt-5 rounded-lg shadow-xl w-[100%] sm:w-[500px]">
          <div className="text-sm font-bold mb-4 mx-4 flex items-center gap-2">
            <BiWallet size={18} />
            {isDepositMode ? "Deposit" : "Wallet"}
          </div>
          <button
            onClick={handleCloseWallet}
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          {!isDepositMode ? (
            <>
              <img src={walletBg} alt="" />
              <div className="text-xl  my-4 mx-4 font-bold">
                {userWalletBalance > 0 ? (
                  <>Your wallet: {userWalletBalance.toFixed(2)}</>
                ) : (
                  <>
                    <p className="my-2">Your wallet is currently empty.</p>
                    <p className="text-sm font-semibold secondaryTextColor">
                      Make a deposit via crypto or local currency if it's
                      available in your region. Alternatively, you can buy
                      crypto via Moonpay.
                    </p>
                  </>
                )}
              </div>

              {/* Additional Wallet Info */}
              <div className="flex  mt-6">
                <button
                  onClick={() => setIsDepositMode(true)}
                  className="w-full mx-4 bg-[#1475e1] text-[#ffffff] py-2 rounded"
                >
                  Deposit
                </button>
                {userWalletBalance < 10 && (
                  <button
                    onClick={() => alert("Withdraw functionality")}
                    className="w-full mr-4 bg-[#2f4553] text-[#ffffff] py-2  rounded"
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsDepositMode(false)}
                className="bg-[#2f4553] text-[#ffffff] text-[11px] py-1 px-4 rounded mx-4"
              >
                Back
              </button>
              <div className="  mx-7  mt-7">
                <ToggleTableComponent toggleOption={depositToggleOptions} defaultTable="local-currency" ClassName="w-[210px]" />
              </div>
            </>
          )}

          <div className="mt-6 bg-[#0f212e]   py-5 flex flex-col">
            <p className="primaryTextColor text-sm mb-4 flex justify-center">
              Improve your account security with Two-Factor Authentication
            </p>
            <Link
              to={"/settings/security"}
              onClick={() => alert("Withdraw functionality")}
              className=" mx-4 bg-[#2f4553] text-[#ffffff] py-2  rounded flex justify-center items-center"
            >
              Enable 2FA
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
      {title==="Live Support" &&
        <div className="mb-7 right-10 -top-5 absolute">
        <ChatSupportMainScreen/>
        </div>
        }
    </header>
  );
};

export default AuthenticatedHeader;
