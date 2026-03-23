import { useEffect, useRef, useState } from "react";
import AuthenticatedHeader from "./userinterface/components/universalComponents/AuthenticatedHeader";
import FooterComponent from "./userinterface/components/LandingPageComponents/FooterComponent";
import { Outlet, ScrollRestoration } from "react-router-dom";
import CasinoSideBar from "./userinterface/components/CasinoComponents/CasinoSideBar";
import GroupScreenBanner from "./userinterface/components/universalComponents/GroupScreenBanner";
import ScrollToTop from "./userinterface/components/universalComponents/ScrollToTop";
import { useAuth } from "./context/authContext";
import LandingPageHeaderComponent from "./userinterface/components/LandingPageComponents/UnAuthorizedHeader";
import UnAuthorizedHeader from "./userinterface/components/LandingPageComponents/UnAuthorizedHeader";
import SideMenuComponent from "./userinterface/components/LandingPageComponents/SideMenuComponent";
import LoadingAnimation from "./userinterface/components/universalComponents/LoadingAnimation";
import BetSlip from "./userinterface/components/SportsComponents/BetComponent/BetSlip/BetSlip";
// import triple7 from "./assets/images/triple7.png"

export default function Layout() {
  const { isLoggedIn, isBetSlipOpen, isSidebarOpen, setIsSidebarOpen } = useAuth();




  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1030px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Check the initial screen size
    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // const toggleOption:toggleOptionProp[] = [
  //   { title: "My Bets", key: 'my-bets' },
  //   { title: "All Bets", key: 'all-bets'},
  //   { title: "High Rollers", key: 'high-rollers'},
  //   { title: "Race Leaderboard", key: 'race-leaderboard' },
  // ];
  // interface toggleOptionProp {
  //   title:string;
  //   key:string;
  // }
  // const height = document.documentElement.clientHeight
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

  // to manage register dialog
  //  const handleClickRagisterButton = () => {
  //     setOpenRegisterDialog(!openRegisterDialog)
  //   }
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 2000);
  // })
  return (
//     <div className="grid grid-cols-10 ">
//       <div className="flex bg-[#1a2c38] relative col-span-8 ">
//         <div className={` h-screen  max-lg:fixed z-50 w-20`}>
//           {isLoggedIn ? (
//             <CasinoSideBar
//               toggleSidebar={toggleSidebar}
//               isOpen={isSidebarOpen}
//             />
//           ) : (
//             <SideMenuComponent
//               toggleSidebar={toggleSidebar}
//               isOpen={isSidebarOpen}
//             />
//           )}
//         </div>

     

//         {/* <div className='flex justify-center items-center h-screen w-screen '> 
//     <LoadingAnimation/>
//     </div>: */}
//         <div
//           ref={scrollableContainerRef}
//           className={`overflow-y-scroll h-screen scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38] mt-[60px] flex-grow ${
//             isSidebarOpen ? "lg:ml-[200px]" : "max-lg:ml-[80px]"
//           } max-md:ml-0 overflow-y-auto select-none`}
//         >
//           {/* Main content here */}
//                <div className=" top-0  h-[72px] absolute w-full  z-30 right-0 ">
//           {isLoggedIn ? (
//             <AuthenticatedHeader
//               messagesCount={0}
//               notificationsCount={0}
//               username="dss"
//               isOpen={isSidebarOpen}
//             />
//           ) : (
//             <UnAuthorizedHeader isOpen={isSidebarOpen} />
//           )}
//         </div>
//           <ScrollToTop containerRef={scrollableContainerRef}>
//             <Outlet />
//           </ScrollToTop>
//           <FooterComponent />
//         </div>
//       </div>

// {
//   isBetSlipOpen && (
//   <div className="col-span-2 h-screen  z-50 ">
//         <BetSlip betProps={undefined} />
//       </div>
//   )
 
// }
      
//     </div>

<>
 <div className="relative flex h-screen w-full overflow-hidden bg-[#1a2c38]">

      {/* Left Sidebar */}
      <div className={`transition-all duration-500 ease-in-out max-md:hidden  shrink-0 ${isSidebarOpen ? "lg:w-[235px]  z-50" : "w-[80px] "} z-50  w-[80px] `}>
        {isLoggedIn ? (
          <CasinoSideBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        ) : (
          <SideMenuComponent toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        )}
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col flex-1 min-w-0 transition-all duration-1000 ease-in-out ">

        {/* Top Navbar */}
        <div className="z-30">
          {isLoggedIn ? (
            <AuthenticatedHeader messagesCount={0} notificationsCount={0} username="dss" isOpen={isSidebarOpen} />
          ) : (
            <UnAuthorizedHeader isOpen={isSidebarOpen} />
          )}
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollableContainerRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38]"
        >
          <ScrollToTop containerRef={scrollableContainerRef}>
            <Outlet />
          </ScrollToTop>
          <FooterComponent />
        </div>
      </div>

      {/* Right BetSlip Panel */}
     <div
    className={`bg-blue-400 shrink-0 h-full transition-all duration-500 ease-in-out max-md:hidden ${
      isBetSlipOpen
        ? "w-[310px] 1170px:w-[370px] translate-x-0"
        : "w-0 translate-x-full overflow-hidden"
    }`}
  >
   <BetSlip betProps={undefined} />
  </div>
    </div>
 
</>
  );
}
