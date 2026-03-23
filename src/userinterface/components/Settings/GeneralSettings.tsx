import { Fragment, useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../../context/UserInfoContext";
import { UserSettingsTypes } from "../../../utils/types/UserSettingsTypes";
import {  Dialog, TransitionChild} from "@headlessui/react";

import TextField from "./Textfield";
import { IoMdClose } from "react-icons/io";
import api from "../../../utils/api/api";

import SectionOverlapLoader from "../universalComponents/SectionOverlapLoader";
import { countryDialCodes } from "../../../constants/countryWithCode";
import { toast } from "react-toastify";

const GeneralSettings = () => {
  const {
    userSettings,
    userId,
  } = useUserInfo();

  const [isLoading, setIsLoading] = useState(true); // For shimmer effect
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(userSettings?.email);
  const [phone, setPhone] = useState("");  
  const [countryCode, setCountryCode] = useState("+91 India");
  const {refetchUserSettings} = useUserInfo();
  const Shimmer = ({ className }: { className: string }) => (
    <div className={`shimmer-effect rounded-md ${className}`}></div>
  );

  const handleDialog = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOpen(true);
    }, 500); // Only control loading state
  };

  useEffect(() => {
    if (userSettings?.countryCode) {
      setCountryCode(userSettings.countryCode);
    }
    if (userSettings?.phoneNumber) {
      setPhone(userSettings.phoneNumber);
    }
  }, [userSettings]);
//api
  const handlePhoneNumber = async () => {
    if (!phone || !countryCode || !userId) return;
    console.log("Updating phone number:", phone, countryCode, userId);

    try {
      const response = await api.post(
        "user_settings/update-phone",
        {
          phone,
          countryCode,
        },
        { withCredentials: true }
      );
      console.log("Phone number updated successfully:", response.data);
      toast.success("Phone number updated successfully!");
      refetchUserSettings();
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
    return () => clearTimeout(timer);
  }, []);
  const DropDown = ({dropdownValues}:{dropdownValues:string[]}) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const closeDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", closeDropdown);
      return () => document.removeEventListener("click", closeDropdown);
    }, []);

    return (
      <div
        className="relative inline-block w-full md:w-[50%]"
        ref={dropdownRef}
      >
        <button
          className="flex items-center justify-between text-white bg-[#102636] hover:bg-[#1b3648] focus:ring-2 focus:ring-[#6e8190] font-medium rounded text-sm px-4 py-2 w-full border border-[#6e8190] shadow-md"
          onClick={toggleDropdown}
        >
         {countryCode || "Select Country Code"}
          <svg
            className="w-4 h-4 ml-2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 bg-[#102636] divide-y divide-[#6e8190] rounded shadow-md w-full max-h-[185px] overflow-y-auto">
            <ul className="py-2 text-sm text-white">
              {dropdownValues.map((value, index) => (
                <li key={index}>
                  <a 
                    onClick={() => {
                      setCountryCode(value);
                      setIsOpen(false);
                    }}
                    href="#"
                    className="block px-4 py-2 hover:bg-[#1b3648] hover:text-[#6e8190] rounded"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const EmailVerificationDialog = ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) => {
    const [email, setEmail] = useState(userSettings?.user?.email);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleSendOtp = async () => {
      if (!email || !userId) return;
      console.log("Sending OTP to:", email, userId);

      try {
        setOtpSent(true);
        const response = await api.post("user_settings/send-email-otp", {
          email,
          userId,
        },
        {withCredentials: true}  
      );
        console.log("OTP sent successfully:", response.data);
        
      } catch (error) {
        console.error("Error sending OTP:", error);
        setOtpSent(false);
      }
    };

    const handleOtpChange = (index: number, value: string) => {
      if (/^\d?$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if a digit is entered
        if (value && index < otp.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        // Move back if backspace is pressed and the input is empty
        inputRefs.current[index - 1]?.focus();
      }
    };


    const handleConfirmOtp = async () => {
      if (!email || !userId) return;
      const otpString = otp.join("");
      console.log("Confirming OTP:", otpString, email, userId);

      try {
        const response = await api.post("user_settings/verify-email-otp", {
          email,
          userId,
          otp: otpString,
        });
        console.log("OTP confirmed successfully:", response.data);
        refetchUserSettings()
        onClose();
      } catch (error) {
        console.error("Error confirming OTP:", error);
      }
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  transition-all ease-in-out duration-1000"
      >
       
          <TransitionChild
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
         
              <div className="bg-[#1a2c38] p-6 rounded-[5px] shadow-lg w-[90%] max-w-lg relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                  <IoMdClose size={22} />
                </button>

                {/* Title */}
                <h3 className="text-xl font-semibold">Email Verification</h3>
                <div className="w-full border-t border-[#6e8190] mt-3"></div>

                {!otpSent ? (
                  // Email Input
                  <div className="mt-4 flex flex-col">
                    <h3 className="text-sm font-semibold mb-1 text-gray-300">
                      Email
                    </h3>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-[#102636] px-4 py-2 text-lg border border-gray-500 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSendOtp}
                      className="text-white font-semibold py-3 mt-4"
                    >
                      Send OTP
                    </button>
                  </div>
                ) : (
                  // OTP Input
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-400 text-sm text-center">
                      OTP sent to{" "}
                      <span className="font-semibold text-white">{email}</span>
                    </p>
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          value={digit}
                          maxLength={1}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-10 h-12 text-center bg-[#102636] text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      ))}
                    </div>
                    <button onClick={handleConfirmOtp} className="w-full bg-[#28db2e] text-black opacity-80 font-bold py-3 rounded hover:bg-green-600 transition">
                      Confirm OTP
                    </button>
                  </div>
                )}
              </div>
         
          </TransitionChild>
       
      </Dialog>
    );
  };

  return (
    <>
      <div className="text-white flex flex-col  relative mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-8 rounded-lg bg-[#0f1c2bda] w-full transition-all duration-300 ease-in-out">
        <SectionOverlapLoader
          show={isLoading}
          size="lg"
          className="rounded-lg "
        />
        <div
          className={` w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col`}
        >
          <div className="px-6  flex items-center  gap-1  w-full font-bold text-[20px] mb-4">
            Email{" "}
            <div
              className={`${
                userSettings?.emailVerified
                  ? "bg-[#28db2e]  text-black   rounded-full text-[12px]"
                  : "bg-red-700 h-fit w-fit  rounded-full text-[12px]"
              } flex items-center  h-fit text-center self-center px-2 py-[1px] scale-90`}
            >
              {userSettings?.emailVerified === true
                ? "Verified"
                : "Not Verified"}
            </div>
          </div>
          {/* Horizontal Line */}
          <div className="w-[95%] border-t border-[#6e8190]"></div>
          <div className="flex flex-col w-full items-start px-6 mt-7 mb-5 justify-start">
            <div className="text-[14px] font-medium text-blue-100">Email</div>
            <div className="w-full rounded-md font-semibold px-4 bg-[#435565] py-2 border-2 border-[#435565] hover:border-[#6e8190]">
              {userSettings?.user?.email}
            </div>
          </div>
          {/* Horizontal Line */}
          <div className="w-full border-t border-[#6e8190] mb-5"></div>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={handleDialog}
              disabled={userSettings?.emailVerified}  
              type="button"
              className={`focus:outline-none text-black bg-[#28db2e]   font-bold rounded text-sm px-5 py-2.5 me-4 ${
                userSettings?.emailVerified ? "opacity-50 " : "hover:bg-[#28db2ea8]"
              }`}
            >
              Confirm Email
            </button>
          </div>
        </div>
        {/*  */}
        <div
          className={` w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col`}
        >
          <div className="px-6 w-full text-start font-bold text-[18px] mb-3">
            Phone Number
          </div>
          <div className="text-[14px] w-full flex items-start px-6 font-medium mb-3 text-blue-100">
            We only service areas that are listed in the available country code
            list.
          </div>

          {/* Horizontal Line */}
          <div className="w-[95%] border-t border-[#6e8190]"></div>
          <div className="flex flex-col w-full items-start px-6 mt-4 mb-5 justify-start">
            <div className="text-[14px] font-medium text-blue-100">
              Country Code <span className="text-red-400">*</span>
            </div>
            {/* <select onChange={(e) => setCountryCode(e.target.value)} className="flex items-center w-[50%] justify-between text-white bg-[#102636] hover:bg-[#1b3648] font-medium text-sm px-2 py-2 border border-[#6e8190] shadow-md">
                {dropdownValues.map((value, _) => (
                  <option value={value}>{value}</option>
                ))}
              </select> */}
            <DropDown dropdownValues={countryDialCodes}/>
          </div>
          <div className="flex flex-col w-full items-start px-6 mb-5 justify-start">
            <div className="text-[14px] font-medium text-blue-100">
              Phone Number <span className="text-red-400">*</span>
            </div>
            <input 
              value={phone} 
              pattern="[0-9]{10}" 
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); 
                setPhone(numericValue.slice(0, 10));
              }}
                maxLength={10} 
                type="tel" 
                className="rounded flex items-center w-[50%] justify-between text-white bg-[#102636] hover:bg-[#1b3648] font-medium text-sm px-4 py-2 border border-[#6e8190] shadow-md" />

          
          </div>
          {/* Horizontal Line */}
          <div className="w-full border-t border-[#6e8190] mb-5"></div>
          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              className="focus:outline-none text-black bg-[#28db2e] hover:bg-[#28db2ea8]   font-bold rounded text-sm px-5 py-2.5 me-4"
              onClick={handlePhoneNumber}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <EmailVerificationDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default GeneralSettings;
