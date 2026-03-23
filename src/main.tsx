import * as React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
import {
 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,

} from "react-router-dom";
import Layout from "./Layout.tsx";
import CasinoHome from "./userinterface/Screens/casino/CasinoHome.tsx";
import SlotsGroupScreen from "./userinterface/Screens/casino/groups/SlotsGroupScreen.tsx";
import GameShowGroupScreen from "./userinterface/Screens/casino/groups/GameShowsGroupScreen.tsx";
import ExclusiveGamesGroup from "./userinterface/Screens/casino/groups/ExclusiveGroupScreen.tsx";
import LiveCasinoGroupScreen from "./userinterface/Screens/casino/groups/LiveCasinoGroupScreen.tsx";
import OriginalGamesGroupScreen from "./userinterface/Screens/casino/groups/OriginalGamesGroupScreen.tsx";
// import AllProvider from './userinterface/components/universalComponents/AllProvider.tsx'
import ProviderCollectionScreen from "./userinterface/Screens/casino/groups/ProviderCollectionScreen.tsx";
// import ScrollToTop from './userinterface/components/universalComponents/ScrollToTop.tsx'
import PageError from "./userinterface/components/universalComponents/pageError.tsx";
// import NewRelease from './userinterface/components/CasinoComponents/NewRelease.tsx'
import NewReleaseGroupScreen from "./userinterface/Screens/casino/groups/NewReleaseGroupScreen.tsx";
// import GroupScreenBanner from './userinterface/components/universalComponents/GroupScreenBanner.tsx'
import ConquerTheCasinoGroupScreen from './userinterface/Screens/casino/groups/ConquerTheCasinoGroupScreen.tsx'
import MultiplierRaceGroupScreen from './userinterface/Screens/casino/groups/MultiPlierRaceGroupScreen.tsx'
import BonusBuyGroupScreen from './userinterface/Screens/casino/groups/MultiPlierRaceGroupScreen.tsx'
import EnhancedRtpGroupScreen from './userinterface/Screens/casino/groups/EnhancedRtpGroupScreen.tsx'
import TableGamesGroupScreen from './userinterface/Screens/casino/groups/TableGamesGroupScreen.tsx'
import BaccaratGroupScreen from './userinterface/Screens/casino/groups/BaccaratGroupScreen.tsx'
import RouletteGroupScreen from './userinterface/Screens/casino/groups/RouletteGroupScreen.tsx'
import BlackJackGroupScreen from './userinterface/Screens/casino/groups/BlackJackGroupSceen.tsx'
import PromotionsHome from './userinterface/Screens/promotion/PromotionsHome.tsx'
import CasinoCategory from './userinterface/Screens/promotion/CasinoCategory.tsx'
import SportsCategory from './userinterface/Screens/promotion/SportsCategory.tsx'
import CardDetailsPage from './userinterface/Screens/promotion/CardDetailsPage.tsx'
import PlayGamePage from './userinterface/Screens/casino/PlayGamesPage.tsx'
import SportsHome from './userinterface/Screens/sports/SportsHome.tsx'
import UserContextProvider from './context/UserContextProvider.tsx'
import LiveEvents from './userinterface/Screens/sports/LiveEvents.tsx'
import UpcomingEvents from './userinterface/Screens/sports/UpcomingEvents.tsx'
import IndivisualSportData from './userinterface/Screens/sports/IndivisualSportPage.tsx'
import MainBetPage from './userinterface/Screens/sports/MainBetPage.tsx'
import LoginPage from './userinterface/Screens/LoginPage.tsx'
import { AuthProvider } from './context/authContext.tsx'
import BetSlip from './userinterface/components/SportsComponents/BetComponent/BetSlip/BetSlip.tsx'
import Affiliate from './userinterface/components/universalComponents/AffiliateComponent/Affiliate.tsx'
import Transactions from './userinterface/components/universalComponents/TransactionComponent/Transactions.tsx'
import Home from './userinterface/Screens/Home.tsx'
import VIPClub from './userinterface/components/VIPClub/VIPClub.tsx'
import Settings from './userinterface/Screens/Settings.tsx'
import StatisticsMain from './userinterface/components/universalComponents/StatisticsModel/StatisticsMain.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingProvider } from "./context/loadingContext.tsx";
import LoadingOverlay from "./userinterface/components/universalComponents/LoadingOverlay.tsx";
import { UserProvider } from "./context/UserInfoContext.tsx";
import { DialogProvider } from "./context/DialogContext.tsx";
import { ToastContainer } from "react-toastify";
import Notification from "./userinterface/components/universalComponents/Notifications/Notification.tsx";
import ChatSupportMainScreen from "./userinterface/components/universalComponents/ChatSupportModel/ChatSupportMainScreen.tsx";
import Blackjack from "./games/BlackJackGame/GameBoard.tsx";
import KenoMain from "./games/Keno/KenoMain.tsx";
import { PlinkoGame } from "./games/PlinkoNew/Plinko/components/Game/index.tsx";
import SlotGame from "./games/slot/slot.tsx";
import WheelMain from "./games/WheelGame/WheelMain.tsx";
import { Aviator } from "./userinterface/components/AviatorComponents/Aviator.tsx";
import { UserDataProvider } from "./userinterface/components/AviatorComponents/UserDataContext.tsx";
import WebSocketComponent from "./context/testSocket.tsx";
import ChatComponent from "./context/chatComponent.tsx";
import ChatSocket from "./context/testSocket.tsx";
import { SportsProvider } from "./context/sportsContext.tsx";
import { BetProvider } from "./context/betContext.tsx";
import Test from "./userinterface/components/SportsComponents/heel.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import CoinFlip3D from "./games/coinFlip/app.tsx"; 
import Pump from "./games/pump"; //pumpgame route 
// import ChatRoom from "./context/chatUI.tsx";
// import { UserDataProvider } from "./userinterface/components/AviatorComponents/store/UserDataContext.tsx";
// import AdminLogin from './assets/administrator/AdminLogin/adminLoginInterface.tsx'
// import AdminSignup from './assets/administrator/AdminLogin/adminSignUpInterface.tsx'
// import PlinkoGame from './games/plinko.tsx'

// const router = createBrowserRouter([
//   {
//       path:'/',
//       element:<Layout/>,

//   },
//   {
//     path:'/casino',
//     element:<Layout/>,
//     children:[
//       {
//         path:"home",
//         element:<CasinoHome/>,
//       },
//       {
//         path:"group",
//         children:[
//           {
//            path:"slots",
//            element:<SlotsGroupScreen/>
//       },
//         {
//           path:"game-show",
//           element:<GameShowGroupScreen/>
//         },
//         {
//           path:"exclusive",
//           element:<ExclusiveGamesGroup/>
//         },
//         {
//           path:"live-casino",
//           element:<LiveCasinoGroupScreen/>
//         },
//         {
//           path:"original-game",
//           element:<OriginalGamesGroupScreen/>
//           }
//           ]
//       },
//       {
//         path:"collection",
//        children:[
//         {
//           path:'provider',
//           element:<ProviderCollectionScreen />
//       }]
//       },

//     ],
//   }
// ])

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
     <Route path='login' element={<LoginPage/>}/> 
   
      <Route path='*' element={<PageError />} />

      {/* Manish Components */}
      <Route path='testbet' element={<BetSlip  betProps={undefined}/>}/>
      <Route path='home' element={<Home />}/>
      <Route path='vip_club' element={<VIPClub />}/>
      <Route path='affiliate' element={<Affiliate />}/>
      <Route path='transactions' element={<Transactions />}/>
      <Route path='settings' element={<Settings />}/>
      <Route path='statistics' element={<StatisticsMain />}/>
      <Route path='notifications' element={<Notification />}/>
      <Route path='chatsupport' element={<ChatSupportMainScreen />}/>
      <Route path='blackjack' element={<Blackjack />}/>
      <Route path='keno' element={<KenoMain />}/>
      <Route path='plinko' element={<PlinkoGame />}/>
      <Route path='slot' element={<SlotGame />}/>
      <Route path='wheel' element={<WheelMain />}/>
  
  
  

      {/* <-----> */}


      {/* <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminlogin" element={<PlinkoGame />} /> */}
      <Route path='/' element={<Layout />}>
        <Route path='promotions' >
          <Route path='' element={<PromotionsHome />} />
          <Route path='Promotion'>
            <Route path='weekly-giveaway' element={<CardDetailsPage />} />
          </Route>

          <Route path="category">
            <Route path="casino" element={<CasinoCategory />} />
            <Route path="sports" element={<SportsCategory />} />
            <Route path="stake-races" element={<PageError />} />
          </Route>
        </Route>
      </Route>

      {/* sports home */}

      <Route path="sports" element={<Layout />}>
      <Route path=":sport" element={<IndivisualSportData />} />
        {/* <Route path=":sportName" element={<IndivisualSportData />} /> */}
        <Route path="scoreboard" element={<MainBetPage />} />

        <Route path="upcoming" element={<UpcomingEvents />}>
          <Route path=":sportName" element={<UpcomingEvents />} />
        </Route>

        <Route path="home" element={<SportsHome />}>
   
        </Route>

        <Route path="live" element={<LiveEvents />}>
          <Route path=":sportName" element={<LiveEvents />} />
        </Route>

        <Route path="sports" element={<UpcomingEvents />}>
          {/* <Route path=":sportName" element={<UpcomingEvents />} /> */}
        </Route>
      </Route>
         {/* CasinoHome */}
      <Route path='casino' element={<Layout />}>
        {/* Game Page */}
        <Route path="games">
          <Route path=":game" element={<PlayGamePage />} />
          <Route path="coin" element={<CoinFlip3D />} />

           <Route path="pump" element={<Pump />} /> //trying to add pump game route here
     
        </Route>
  
        {/* casino home */}
        <Route path="home" element={<CasinoHome />}></Route>

        {/* casino groups */}
        <Route path="group">
          <Route path="slots" element={<SlotsGroupScreen />} />
          <Route path="game-show" element={<GameShowGroupScreen />} />
          <Route path="exclusive" element={<ExclusiveGamesGroup />} />
          <Route path="live-casino" element={<LiveCasinoGroupScreen />} />
          <Route path="original-game" element={<OriginalGamesGroupScreen />} />
          <Route path="new-release" element={<NewReleaseGroupScreen />} />
          <Route
            path="conquer-the-casino"
            element={<ConquerTheCasinoGroupScreen />}
          />
          <Route
            path="multiplier-race"
            element={<MultiplierRaceGroupScreen />}
          />
          <Route path="bonus-buy" element={<BonusBuyGroupScreen />} />
          <Route path="enhanced-rtp" element={<EnhancedRtpGroupScreen />} />
          <Route path="table-games" element={<TableGamesGroupScreen />} />
          <Route path="blackjack" element={<BlackJackGroupScreen />} />


          <Route path="baccarat" element={<BaccaratGroupScreen />} />
          <Route path="roulette" element={<RouletteGroupScreen />} />
        </Route>

        {/* casino collection */}
        <Route path="collection">
          <Route path="providers" element={<ProviderCollectionScreen />} />
        </Route>
      </Route>


 
      <Route path="/aviator" element={<Aviator />} />
 


    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <LoadingOverlay />
      <QueryClientProvider client={queryClient}>
         <SocketProvider>
       <SportsProvider>
        <UserDataProvider>
         <UserProvider>
          <DialogProvider>
          <BetProvider>
           <AuthProvider>
            <UserContextProvider>
              <ToastContainer />
              <RouterProvider router={router} />
            </UserContextProvider>
           </AuthProvider>
           </BetProvider>
          </DialogProvider>
         </UserProvider>
        </UserDataProvider>
       </SportsProvider>
       </SocketProvider>
      </QueryClientProvider>
    </LoadingProvider>
  </React.StrictMode>
);
