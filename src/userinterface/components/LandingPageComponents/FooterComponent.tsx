import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import LiteCoin from "../../../assets/images/litecoin.RPQ1704t.png"
import BitCoinCash from "../../../assets/images/bitcoin-cash.DUaEsStO.png"
import Bitcoin from "../../../assets/images/bitcoin.DpHO7atL.png"
import Ethereum from "../../../assets/images/ethereum.yvHxjSL-.png"
import Tron from "../../../assets/images/tron.BYiII1T_.png"
import DogeCoin from "../../../assets/images/dogecoin.k8OeA1SN.png"
import Ripple from '../../../assets/images/ripple.Ct_tC16d.png'
import Tether from "../../../assets/images/tether.Cv3Qd73c.png"
import Hub from "../../../assets/images/hub88.CvKNQs2Q.png"
import ResponsibleGambling from "../../../assets/images/safe-gamble.Lrrm0l28.png"
import Betlocker from "../../../assets/images/betblocker.-t2TDIRS.png"
import gamblegrid from "../../../assets/images/gamblegrid.png"
import Evertron from "../../../assets/images/everton-logo.DjZkLatD.png"
import EightteenPlus from "../../../assets/images/18plus.DgozareE.png"
import Ufc from "../../../assets/images/ufc-partner.C8Oj708g.png"



const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

export default function FooterComponent(): React.JSX.Element {

  
// const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLanguageClick = (language: string) => {
        setSelectedLanguage(language);
        setIsOpen(false);
    };
  // const toggleDropdown = () => {
  //   setDropdownVisible(!isDropdownVisible);
  // };
  return (
    <>
    <footer className="bg-slate-900 text-gray-300 cursor-default select-none ">
      <div className="container mx-auto py-10 px-10  ">
        <div className="lg:grid-cols-6 md:grid-cols-4 max-sm:grid-cols-2 sm:grid-cols-3 grid  justify-between ">
          {/* Column 1: About Stake */}
          <div className="w-full  mb-4 md:mb-0">
            <div className="text-lg font-semibold mb-2 text-[16px] w- text-white">
              Sports
            </div>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="">Sportsbook</a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Live Sports
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Soccer
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Cricket
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Basketball
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Tennis
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                eSports
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Bet Bonuses
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Racing Rules
              </a>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-full  mb-4 md:mb-0">
            <div className="text-lg font-semibold mb-2 text-[16px] w-full text-white">
              Casino
            </div>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Casino Games
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                slots
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Live Casino
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                {" "}
                Roulette
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Blackjack
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Providers
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                VIP Club
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Promotions
              </a>
            </ul>
          </div>
          {/* Column 3: Legal */}
          <div className="w-full  mb-4 md:mb-0">
            <div className="text-lg font-semibold mb-2 text-[16px] w-full text-white">
              Support
            </div>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Fairness
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Affiliate
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Responsible Gambling
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Gamble Aware <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Live Support
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Help Center
                <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                How to Guides
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Local Currency Guide
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Supported Crypto
              </a>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="w-full  mb-4 md:mb-0">
            <div className="text-lg font-semibold mb-2 text-[16px] w-full text-white">
              Community
            </div>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Blog
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Forum
                <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Facebook
                <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Twitter <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Instagram <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Youtube
                <FaExternalLinkAlt />
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Shop <FaExternalLinkAlt />
              </a>
            </ul>
          </div>
          <div className="w-full  mb-4 md:mb-0">
            <div className="text-lg font-semibold mb-2 text-[16px] w-full text-white">
              {" "}
              About Us
            </div>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                Blog
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white ">
                Privacy Policy
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Licenses
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white">
                AML Policy{" "}
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white ">
                Terms of Serives
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white ">
                Self Exclusion
              </a>
            </ul>
            <ul className="font-semibold text-sm text-gray-400 mb-[2px] ">
              <a href="" className="hover:text-white flex items-center gap-2">
                Primedice <FaExternalLinkAlt />
              </a>
            </ul>
          </div>
          <div className="w-full  mb-4 md:mb-0">
            <div className="text-lg font-semibold mb-2 text-[16px] w-full text-white">
              Language
            </div>
           
{/* Language Dropdown Menu */}
<div className="relative inline-block text-left">
            <div
                
                className="inline-flex justify-center w-full text-white  shadow-sm px-4 py-2  text-sm font-medium "
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedLanguage} 
              
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {languages.map((language) => (
                            <a
                                key={language}
                                href="#"
                                className={`block px-4 py-2 text-sm ${
                                    selectedLanguage === language ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                }`}
                                onClick={() => handleLanguageClick(language)}
                            >
                                {language}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
      


            <ul className="font-semibold text-sm  mb-[4px] ">
              <a href="" className="hover:text-white text-white">
                English
              
              </a>
            </ul>
            <ul className="font-semibold text-sm mb-[4px] ">
              <a href="" className="hover:text-white text-white">
                Odds
              </a>
            </ul>
            <ul className="font-semibold text-sm  mb-[4px] ">
              <a
                href=""
                className="hover:text-white text-white flex items-center gap-2"
              >
                Decimal
              </a>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}

        <div className="py-10">
          <hr  className="border opacity-20 "/>  
          <div className="md:grid-cols-6 grid gap-10 py-10 sm:grid-cols-4 max-sm:grid-cols-3 items-center">
            <img src={LiteCoin} alt="" />
            <img src={BitCoinCash} alt=""  />
            <img src={Bitcoin} alt="" />
            <img src={Ethereum} alt="" />
            <img src={Tron} alt="" />
            <img src={DogeCoin} alt="" />
            <img src={Ripple} alt="" />
            <img src={Tether} alt="" />
            <img src={Hub} alt="" />
            <img src={ResponsibleGambling} alt="" />
            <img src={Betlocker} alt="" />
            <img src={EightteenPlus} alt="" className="scale-75"/>
        </div>
        
        <hr  className="border opacity-20"/>  
       
       <div className="flex flex-row items-center justify-evenly py-8"> 
        <img src={Evertron} alt="" className="w-20 h-14"/>
        <img src={Ufc} alt=""  className="w-24 h-14"/>
        
        </div>
        
        <hr  className="border opacity-20 "/>  
      
      </div>
      
        <div className=" text-center text-sm">
        <div className="font-bold text-2xl  flex justify-center  h-16 pb-5" > <img src={gamblegrid} alt="" /></div>
        <div className="opacity-50">
          &copy; {new Date().getFullYear()} GambleGrid.com | All rights
          reserved.
          </div>
          
        </div>
      </div>
    </footer>
    </>
  );
}
