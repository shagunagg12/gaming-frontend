import { useEffect, useRef, useState } from 'react'
import AuthenticatedHeader from '../../..//userinterface/components/universalComponents/AuthenticatedHeader'
import FooterComponent from '../../../userinterface/components/LandingPageComponents/FooterComponent';
import { Outlet} from 'react-router-dom';
import CasinoSideBar from '../../../userinterface/components/CasinoComponents/CasinoSideBar';
import ScrollToTop from '../../../userinterface/components/universalComponents/ScrollToTop';
import UnAuthorizedHeader from '../../components/LandingPageComponents/UnAuthorizedHeader';
import { useAuth } from '../../../context/authContext';



export default function SportsLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1030px)');

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setIsSidebarOpen(false);
            }
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Check the initial screen size
        if (mediaQuery.matches) {
            setIsSidebarOpen(false);
        }

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
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
    const height = document.documentElement.clientHeight
    const scrollableContainerRef = useRef<HTMLDivElement>(null);
       const { isLoggedIn } = useAuth();
    
         console.log("isLoggedIn",isLoggedIn);
       
    return (
        <>
        <div className="h-screen flex flex-col bg-[#1a2c38]">
          <CasinoSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className="h-[60px] top-0 w-full z-30">
          {isLoggedIn ?  <AuthenticatedHeader messagesCount={0} notificationsCount={0} userBalance={0} username='dss' isOpen={isSidebarOpen} />
            :
            <UnAuthorizedHeader isOpen={isSidebarOpen} />  
            }
          </div>
      
          <div ref={scrollableContainerRef} className={`overflow-y-scroll scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38] h-[90%] flex-grow ${isSidebarOpen ? 'lg:ml-[260px]' : 'md:ml-[80px]'} overflow-y-auto select-none`}>
            {/* Main content here */}
            <ScrollToTop containerRef={scrollableContainerRef}>
              <Outlet />
            </ScrollToTop>
            <FooterComponent />
          </div>
        </div>
      </>
      );
}
