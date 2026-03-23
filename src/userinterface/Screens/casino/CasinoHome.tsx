
import { useState,useEffect } from "react";
import PromoCardSlider from "../../components/universalComponents/PromoCardSlider";
import SearchComponent from "../../components/universalComponents/searchComponent";
import ToggleComponent from "../../components/universalComponents/ToggleComponent"
import ToggleTableComponent from "../../components/LandingPageComponents/ToggleTableComponent";
import { ScrollRestoration } from "react-router-dom";
import game from "../../../assets/images/originalGames/games.png"
import game1 from "../../../assets/images/originalGames/games (1).png";
import game2 from "../../../assets/images/originalGames/games (2).png";
import game3 from "../../../assets/images/originalGames/games (3).png"
import game4 from "../../../assets/images/originalGames/games (4).png";
import game5 from "../../../assets/images/originalGames/games (5).png";
import game6 from "../../../assets/images/originalGames/games (6).png";
import game7 from "../../../assets/images/originalGames/games (7).png";
import game8 from "../../../assets/images/originalGames/games (8).png";
import game9 from "../../../assets/images/originalGames/games (9).png";;
import game10 from "../../../assets/images/originalGames/games (10).png";
import game11 from "../../../assets/images/originalGames/games (11).png";
import game12 from "../../../assets/images/originalGames/games (12).png";
import game13 from "../../../assets/images/originalGames/games (13).png";
import game14 from "../../../assets/images/originalGames/games (14).png";
import game15 from "../../../assets/images/originalGames/games (15).png";
import game16 from "../../../assets/images/originalGames/games (16).png";
import game17 from "../../../assets/images/originalGames/games (17).png";


import gameSlots from "../../../assets/images/slots/games.png";
import gameSlots1 from "../../../assets/images/slots/games (1).png";
import gameSlots2 from "../../../assets/images/slots/games (2).png";
import gameSlots3 from "../../../assets/images/slots/games (3).png"
import gameSlots4 from "../../../assets/images/slots/games (4).png";
import gameSlots5 from "../../../assets/images/slots/games (5).png";
import gameSlots6 from "../../../assets/images/slots/games (6).png";
import gameSlots7 from "../../../assets/images/slots/games (7).png";
import gameSlots8 from "../../../assets/images/slots/games (8).png";
import gameSlots9 from "../../../assets/images/slots/games (9).png";;
import gameSlots10 from "../../../assets/images/slots/games (10).png";
import gameSlots11 from "../../../assets/images/slots/games (11).png";
import gameSlots12 from "../../../assets/images/slots/games (12).png";
import gameSlots13 from "../../../assets/images/slots/games (13).png";
import gameSlots14 from "../../../assets/images/slots/games (14).png";
import gameSlots15 from "../../../assets/images/slots/games (15).png";
import gameSlots16 from "../../../assets/images/slots/games (16).png";
import gameSlots17 from "../../../assets/images/slots/games (17).png";

import gameliveCasino from "../../../assets/images/liveCasino/games.png";
import gameliveCasino1 from "../../../assets/images/liveCasino/games (1).png";
import gameliveCasino2 from "../../../assets/images/liveCasino/games (2).png";
import gameliveCasino3 from "../../../assets/images/liveCasino/games (3).png"
import gameliveCasino4 from "../../../assets/images/liveCasino/games (4).png";
import gameliveCasino5 from "../../../assets/images/liveCasino/games (5).png";
import gameliveCasino6 from "../../../assets/images/liveCasino/games (6).png";
import gameliveCasino7 from "../../../assets/images/liveCasino/games (7).png";
import gameliveCasino8 from "../../../assets/images/liveCasino/games (8).png";
import gameliveCasino9 from "../../../assets/images/liveCasino/games (9).png";;
import gameliveCasino10 from "../../../assets/images/liveCasino/games (10).png";
import gameliveCasino11 from "../../../assets/images/liveCasino/games (11).png";
import gameliveCasino12 from "../../../assets/images/liveCasino/games (12).png";
import gameliveCasino13 from "../../../assets/images/liveCasino/games (13).png";
import gameliveCasino14 from "../../../assets/images/liveCasino/games (14).png";
import gameliveCasino15 from "../../../assets/images/liveCasino/games (15).png";
import gameliveCasino16 from "../../../assets/images/liveCasino/games (16).png";
import gameliveCasino17 from "../../../assets/images/liveCasino/games (17).png";

import gameshows from "../../../assets/images/gameShow/games.png";
import gameshows1 from "../../../assets/images/gameShow/games (1).png";
import gameshows2 from "../../../assets/images/gameShow/games (2).png";
import gameshows3 from "../../../assets/images/gameShow/games (3).png"
import gameshows4 from "../../../assets/images/gameShow/games (4).png";
import gameshows5 from "../../../assets/images/gameShow/games (5).png";
import gameshows6 from "../../../assets/images/gameShow/games (6).png";
import gameshows7 from "../../../assets/images/gameShow/games (7).png";
import gameshows8 from "../../../assets/images/gameShow/games (8).png";
import gameshows9 from "../../../assets/images/gameShow/games (9).png";;
import gameshows10 from "../../../assets/images/gameShow/games (10).png";
import gameshows11 from "../../../assets/images/gameShow/games (11).png";
import gameshows12 from "../../../assets/images/gameShow/games (12).png";
import gameshows13 from "../../../assets/images/gameShow/games (13).png";
import gameshows14 from "../../../assets/images/gameShow/games (14).png";
import gameshows15 from "../../../assets/images/gameShow/games (15).png";
import gameshows16 from "../../../assets/images/gameShow/games (16).png";
import gameshows17 from "../../../assets/images/gameShow/games (17).png";


import gameExclusives from "../../../assets/images/exclusiveGames/games.png";
import gameExclusives1 from "../../../assets/images/exclusiveGames/games (1).png";
import gameExclusives2 from "../../../assets/images/exclusiveGames/games (2).png";
import gameExclusives3 from "../../../assets/images/exclusiveGames/games (3).png"
import gameExclusives4 from "../../../assets/images/exclusiveGames/games (4).png";
import gameExclusives5 from "../../../assets/images/exclusiveGames/games (5).png";
import gameExclusives6 from "../../../assets/images/exclusiveGames/games (6).png";
import gameExclusives7 from "../../../assets/images/exclusiveGames/games (7).png";
import gameExclusives8 from "../../../assets/images/exclusiveGames/games (8).png";
import gameExclusives9 from "../../../assets/images/exclusiveGames/games (9).png";;
import gameExclusives10 from "../../../assets/images/exclusiveGames/games (10).png";
import gameExclusives11 from "../../../assets/images/exclusiveGames/games (11).png";
import gameExclusives12 from "../../../assets/images/exclusiveGames/games (12).png";
import gameExclusives13 from "../../../assets/images/exclusiveGames/games (13).png";
import gameExclusives14 from "../../../assets/images/exclusiveGames/games (14).png";
import gameExclusives15 from "../../../assets/images/exclusiveGames/games (15).png";
import gameExclusives16 from "../../../assets/images/exclusiveGames/games (16).png";
import gameExclusives17 from "../../../assets/images/exclusiveGames/games (17).png";

import gameNewRelease from "../../../assets/images/newRelease/games.png";
import gameNewRelease1 from "../../../assets/images/newRelease/games (1).png";
import gameNewRelease2 from "../../../assets/images/newRelease/games (2).png";
import gameNewRelease3 from "../../../assets/images/newRelease/games (3).png"
import gameNewRelease4 from "../../../assets/images/newRelease/games (4).png";
import gameNewRelease5 from "../../../assets/images/newRelease/games (5).png";
import gameNewRelease6 from "../../../assets/images/newRelease/games (6).png";
import gameNewRelease7 from "../../../assets/images/newRelease/games (7).png";
import gameNewRelease8 from "../../../assets/images/newRelease/games (8).png";
import gameNewRelease9 from "../../../assets/images/newRelease/games (9).png";;
import gameNewRelease10 from "../../../assets/images/newRelease/games (10).png";
import gameNewRelease11 from "../../../assets/images/newRelease/games (11).png";
import gameNewRelease12 from "../../../assets/images/newRelease/games (12).png";
import gameNewRelease13 from "../../../assets/images/newRelease/games (13).png";
import gameNewRelease14 from "../../../assets/images/newRelease/games (14).png";
import gameNewRelease15 from "../../../assets/images/newRelease/games (15).png";
import gameNewRelease16 from "../../../assets/images/newRelease/games (16).png";
import gameNewRelease17 from "../../../assets/images/newRelease/games (17).png";
import SeeAll from '../../../assets/images/SeeAll.png'
import { LuComponent } from "react-icons/lu";
import { FaFireFlameCurved } from "react-icons/fa6";
import { SiKdenlive } from "react-icons/si";
import { BsFillBookmarkStarFill, BsFillGiftFill } from "react-icons/bs";
import { IoRocketSharp } from "react-icons/io5";
import { MdCasino } from "react-icons/md";
import { IconType } from "react-icons";
import React from "react";

interface GameProp {
  title:string;
  description:string;
  img:string
  category:string
  link?:string

}

// Example data for the New Realease Games
const gamesNewRelease:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameNewRelease,
    category:'blue sky games'  
},
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameNewRelease1,
    category:'blue sky games'
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameNewRelease2,
    category:'blue sky games'
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameNewRelease3,
    category:'blue sky games'
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameNewRelease4,
    category:'blue sky games'
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameNewRelease5,
    category:'blue sky games'
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: gameNewRelease6,
    category:'blue sky games'
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameNewRelease7,
    category:'blue sky games'
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameNewRelease8,
    category:'blue sky games'
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameNewRelease9,
    category:'blue sky games'
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameNewRelease10,
    category:'blue sky games',
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameNewRelease11,
    category:'blue sky games',
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameNewRelease12,
    category:'blue sky games',
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameNewRelease13,
    category:'blue sky games',
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameNewRelease14,
    category:'blue sky games',
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameNewRelease15,
    category:'blue sky games',
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameNewRelease16,
    category:'blue sky games',
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameNewRelease17,
    category:'blue sky games',
  },
];
// Example data for the Live Casino Games
const gamesLiveCasino:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameliveCasino,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameliveCasino1,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameliveCasino2,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameliveCasino3,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameliveCasino4,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameliveCasino5,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: gameliveCasino6,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameliveCasino7,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameliveCasino8,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameliveCasino9,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameliveCasino10,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameliveCasino11,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameliveCasino12,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameliveCasino13,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameliveCasino14,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameliveCasino15,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameliveCasino16,
    link:'live-casino',
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameliveCasino17,
    link:'live-casinosda23',
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: SeeAll,
    link:'live-casino',
    category:'Devon Webb'
  },
];

// Example data for the ExclusiveGames
const gamesExclusives:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameExclusives,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameExclusives1,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameExclusives2,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameExclusives3,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameExclusives4,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameExclusives5,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: gameExclusives6,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameExclusives7,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameExclusives8,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameExclusives9,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameExclusives10,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameExclusives11,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameExclusives12,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameExclusives13,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameExclusives14,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameExclusives15,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameExclusives16,
    category:"red-sky-gaming"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameExclusives17,
    category:"red-sky-gaming"
  },
];

//Example data for the gameShows
const gameShows:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameshows,
    category:"avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameshows1,
    category:"avatar"
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameshows2,
    category:"avatar"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameshows3,
    category:"avatar"
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameshows4,
    category:"avatar"
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameshows5,
    category:"avatar"
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    category:"avatar",
    img: gameshows6,
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameshows7,
    category:"avatar"
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameshows8,
    category:"avatar"
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameshows9,
    category:"avatar"
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameshows10,
    category:"avatar"
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameshows11,
    category:"avatar"
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameshows12,
    category:"avatar"
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameshows13,
    category:"avatar"
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameshows14,
    category:"avatar"
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameshows15,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameshows16,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameshows17,
    category:"avatar"
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: SeeAll,
    category:'avatar',
    link:'game-show'
  }
  
];

//Example data for the OriginalsGame
const gamesOriginals:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    link:'Game 1',
    img: game,
    category:"Avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: game1,
    link:'original-game2',
    category:"Backseat Gaming"
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: game2,
    link:'original-game3',
    category:"Belatra"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:game3,
    link:'original-game4',
    category:'BGaming'
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: game4,
    link:'original-game5',
    category:'Devon Webb'
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: game5,
    link:'original-game6',
    category:'Devon Webb'
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: game6,
    link:'original-game9',
    category:'Devon Webb'
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: game7,
    link:'original-game7',
    category:'Devon Webb'
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:game8,
    link:'original-game8',
    category:'Devon Webb'
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: game9,
    link:'original-game23',
    category:'Devon Webb'
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: game10,
    link:'original-game21',
    category:'Devon Webb'
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: game11,
    link:'original-game212',
    category:'Devon Webb'
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:game12,
    link:'original-game',
    category:'Devon Webb'
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: game13,
    link:'original-game',
    category:'Devon Webb'
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:game14,
    link:'original-game32',
    category:'Devon Webb'
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:game15,
    link:'original-game54',
    category:'Devon Webb'
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: game16,
    link:'original-game453',
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: game17,
    link:'original-game',
    category:'Devon Webb'
  },
  {
    title: 'See More',
    description: 'Description for Game 2',
    img: SeeAll,
    link:'original-game',
    category:'Devon Webb'
  },
];

//Example data for the SlotsGames
const gamesSlots:GameProp[] = [
  {
    title: 'Game 1',
    description: 'Description for Game 1',
    img: gameSlots,
    link:'slots4324',
    category:"Avatar"
  },
  {
    title: 'Game 2',
    description: 'Description for Game 2',
    img: gameSlots1,
    link:'slots43434',
    category:"Backseat Gaming"
  },
  {
    title: 'Game 3',
    description: 'Description for Game 3',
    img: gameSlots2,
    link:'slots4545',
    category:"Belatra"
  },
  {
    title: 'Game 4',
    description: 'Description for Game 1',
    img:gameSlots3,
    link:'slots543',
    category:'BGaming'
  },
  {
    title: 'Game 5',
    description: 'Description for Game 2',
    img: gameSlots4,
    link:'slots5435',
    category:'Devon Webb'
  },
  {
    title: 'Game 6',
    description: 'Description for Game 3',
    img: gameSlots5,
    link:'slots543',
    category:'Devon Webb'
  },
  {
    title: 'Game 7',
    description: 'Description for Game 1',
    img: gameSlots6,
    link:'slots5435',
    category:'Devon Webb'
  },
  {
    title: 'Game 8',
    description: 'Description for Game 2',
    img: gameSlots7,
    link:'slots5435346',
    category:'Devon Webb'
  },
  {
    title: 'Game 9',
    description: 'Description for Game 3',
    img:gameSlots8,
    link:'slots565',
    category:'Devon Webb'
  },
  {
    title: 'Game 10',
    description: 'Description for Game 4',
    img: gameSlots9,
    link:'slots64',
    category:'Devon Webb'
  },
  {
    title: 'Game 111',
    description: 'Description for Game 1',
    img: gameSlots10,
    link:'slots4324',
    category:'Devon Webb'
  },
  {
    title: 'Game 12',
    description: 'Description for Game 2',
    img: gameSlots11,
    link:'slots432',
    category:'Devon Webb'
  },
  {
    title: 'Game 13',
    description: 'Description for Game 3',
    img:gameSlots12,
    link:'slots4',
    category:'Devon Webb'
  },
  {
    title: 'Game 14',
    description: 'Description for Game 1',
    img: gameSlots13,
    link:'slots4',
    category:'Devon Webb'
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameSlots14,
    link:'slots3',
    category:'Devon Webb'
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameSlots15,
    link:'slots3',
    category:'Devon Webb'
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameSlots16,
    link:'slots2',
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameSlots17,
    link:'slots43',
    category:'Devon Webb'
  },
  {
    title: 'Game 15',
    description: 'Description for Game 2',
    img:gameSlots14,
    link:'slotssds',
    category:'Devon Webb'
  },
  {
    title: 'Game 16',
    description: 'Description for Game 3',
    img:gameSlots15,
    link:'slotsfd',
    category:'Devon Webb'
  },
  {
    title: 'Game 17',
    description: 'Description for Game 1',
    img: gameSlots16,
    link:'slotsfd',
    category:'Devon Webb'
  },
  {
    title: 'Game 18',
    description: 'Description for Game 2',
    img: gameSlots17,
    link:'slotsd',
    category:'Devon Webb'
  },
  {
    title: 'See More',
    description: 'Description for Game 2',
    img: SeeAll,
    link:'slots',
    category:'Devon Webb'
  },
];
interface toggleOptionProp {
  title:string;
  key:string;
  icon: IconType; 
}
const toggleOptions:toggleOptionProp[] = [
  { title: "Lobby", key: 'lobby-casino' ,icon:LuComponent},
  { title: "Originals", key: 'originals',icon:FaFireFlameCurved },
  { title: "Slots", key: 'slots',icon:MdCasino},
  { title: "Live Casino", key: 'live-casino',icon:SiKdenlive },
  { title: "Game Shows", key: 'game-shows',icon: BsFillGiftFill},
  { title: "Exclusives", key: 'exclusives',icon:BsFillBookmarkStarFill },
  { title: "New Releases", key: 'new-releases',icon:IoRocketSharp }
];

const toggleTableOption:toggleTableOptionProp[] = [
  { title: "My Bets", key: 'my-bets' },
  { title: "All Bets", key: 'all-bets'},
  { title: "High Rollers", key: 'high-rollers'},
  { title: "Race Leaderboard", key: 'race-leaderboard' },
];
interface toggleTableOptionProp {
  title:string;
  key:string;
}

export default function CasinoHome():React.JSX.Element{
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

    

  console.log('localstorage',localStorage.getItem('token'));
    return (
      <>
       <ScrollRestoration/>
     
        {/* <div className=" h-screen bg-[#24434d] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#192e38] scrollbar-track-[#24434d]"> */}
        {/* <CasinoSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
        <div className={` flex-grow w-full justify-center flex transition-all duration-300 `}>
          {/* <div className="h-[60px] fixed top-0 w-full z-30">
            <AuthenticatedHeader isOpen={isSidebarOpen} />
          </div> */}
          
          {/* <div className={`flex-grow max-sm:w-[89%] max-md:w-[90%] w-[80%] mt-[80px] self-center ${isSidebarOpen ? 'xl:ml-[260px]  lg:ml-[260px] lg:w-[70%] ' : 'md:ml-[80px] ' }   select-none    `}> */}
            {/* main content here */} 
            <div className='md:w-[90%] w-[95%] lg:w-[80%] max-sm:w-[95%]'>
            <PromoCardSlider isOpen={isSidebarOpen}/>
   
              <SearchComponent/>
              <ToggleComponent 
              defaultToggleOption="lobby-casino"
              gameShows={gameShows} 
              gamesExclusives={gamesExclusives} 
              gamesLiveCasino={gamesLiveCasino}
              gamesNewRelease={gamesNewRelease}
              gamesOriginals={gamesOriginals}
              gamesSlots={gamesSlots}
              toggleOptions={toggleOptions}
              // data_API={[]}
              />
         
           
              <ToggleTableComponent toggleOption={toggleTableOption}/>
             
            </div>
            </div>
          

            {/* <div className={`mt-8 ${isSidebarOpen ? 'xl:ml-[260px]  lg:ml-[260px]   ' : 'md:ml-[80px] ' }   select-none    `}>
    <FooterComponent/>
    </div> */}
       
        {/* </div>  */}
        </>
      // </div>
   );
}