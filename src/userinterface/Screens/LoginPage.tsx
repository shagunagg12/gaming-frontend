
import SignupComponent from "../components/LandingPageComponents/SignupComponent";
import CardComponent from "../components/LandingPageComponents/CardComponent";
import BannerLoginPageComponent from "../components/LandingPageComponents/BannerLoginPageComponent";
import ToogleComponent from "../components/LandingPageComponents/ToggleTableComponent";
import InformationComponent from "../components/LandingPageComponents/InformationComponent";
import FooterComponent from "../components/LandingPageComponents/FooterComponent";
import SideMenuComponent from "../components/LandingPageComponents/SideMenuComponent";
import { useEffect,useState } from "react";
import UnAuthorizedHeader from "../components/LandingPageComponents/UnAuthorizedHeader";
import SigninComponent from "../components/LandingPageComponents/SignInComponent";

export default function LoginPage(): React.JSX.Element {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
   // to manages register dialog
   const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false)

      // to manage register dialog
      
    //  const handleClickRagisterButton = () => {
    //     setOpenRegisterDialog(!openRegisterDialog)
    //   }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    console.log('main page:', isSidebarOpen)

   
    const toggleOption:toggleOptionProp[] = [
        
        { title: "Casino Bets", key: 'casino-bets'},
        { title: "Sports Bets", key: 'sports-bets'},
        { title: "Race Leaderboard", key: 'race-leaderboard' },
      ];
      interface toggleOptionProp {
        title:string;
        key:string;
      }
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
    return (
  // lg:grid md:grid-cols-[auto_1fr] max-sm:grid-cols-2 sm:grid h-screen
        <div className=" max-lg:flex flex ">


            {/* side menu     */}

            <div   className={` h-screen  max-lg:fixed z-50 `}>
            <SideMenuComponent toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className=" flex-1 h-screen overflow-y-auto lg:ml-0  md:ml-0">
                <div className=" h-[72px] fixed w-full  z-30 right-0">
                    <UnAuthorizedHeader isOpen={isSidebarOpen} />
                </div>
                <div className="mt-[81px]">

                    <SignupComponent openRegisterDialog={openRegisterDialog} setOpenRegisterDialog={setOpenRegisterDialog} />
                    <SigninComponent />
                  

                    {/* container for welcome cards and small banners */}
                    <div className=" bg-[#183D3D] md:grid justify-start md:p-12 p-4 ">
                        <CardComponent />
                        <BannerLoginPageComponent />
                        <ToogleComponent toggleOption={toggleOption} />

                        <InformationComponent />
                    </div>

                    <FooterComponent />
                </div>
            </div>


        </div>



    )
}