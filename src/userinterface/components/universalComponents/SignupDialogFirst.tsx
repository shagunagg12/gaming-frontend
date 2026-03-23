import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { AiFillTwitch } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { useDialog } from "../../../context/DialogContext";

interface FormData {
  email: string;
  username: string;
  password: string;
  dateOfBirth: Date;
  agreeToTerms: boolean;
  referralCode: string;
  phone?: string;
  countryCode: string;
}
interface Props{
    openRegisterDialog: boolean;
    setOpenRegisterDialog: (value: boolean) => void
    handleSubmit: (e: React.FormEvent) => void
    EmailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    email: string
    emailErr: string
    UsernameHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    username: string
    usernameErr: string
    PwdHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    pwd: string
    TogglePassword: () => void
    dob: Date
    DateHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    dobErr: string
    PhoneHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    formErr: boolean
    handleStepTwoDialog: (e: React.FormEvent) => void
    formData: {
      email: string;
      username: string;
      password: string;
      dateOfBirth: Date;
      phone?: string;
      agreeToTerms: boolean;
    };
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    pwdErr: string
    showPassword: boolean

}

 // register step one
export default function DialogBoxFirst({
    // openRegisterDialog,
    // setOpenRegisterDialog, 
    handleSubmit,
    EmailHandler,
    email,
    emailErr,
    UsernameHandler,
    username,
    usernameErr,
    PwdHandler,
    pwd,
    TogglePassword,
    dob,
    DateHandler,
    dobErr,
    PhoneHandler,
    formErr,
    handleStepTwoDialog,
    formData,
    setFormData,
    pwdErr,
    showPassword

    }:Props) {
    // const [date, setDate] = useState<number>(0)
    // const [dateErr, setDateErr] = useState<number>(0)
    const [isChecked, setIsChecked] = useState(false);
    const [showInstrction, setShowInstruction] = useState<boolean>(false);
    const {isSignupDialogOpen, closeSignupDialog , openSigninDialog} = useDialog() 

    

    // term check box
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setIsChecked(!isChecked);
      setFormData((prev) => ({
        ...prev,
        agreeToTerms: value,
      }));
    };

    // for date Increment or Decrement

    // const incrementRef = useRef<NodeJS.Timeout | null>(null);
    // const handleMouseUp = () => {
    //   if (incrementRef.current) {
    //     clearTimeout(incrementRef.current);
    //     clearInterval(incrementRef.current);
    //     incrementRef.current = null;
    //   }
    // };

    // date handler
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const value = parseInt(event.target.value, 10);

    //   if (!isNaN(value) && value >= 1 && value <= 31) {
    //     setDate(value);
    //     setFormData((prev) => ({
    //       ...prev,
    //       dateOfBirth: new Date(value),
    //     }));
    //   }

    // };

    const handleFocus = () => {
      setShowInstruction(true);
    };
    const handleBlur = () => {
      setShowInstruction(false);
    };

    const handleSignin = () => {
      closeSignupDialog()
      openSigninDialog()
     
      
    }
    return (
      <Dialog
        open={isSignupDialogOpen}
        onClose={closeSignupDialog}
        className="relative z-50 select-none  "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black min-h-screen bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10  h-full items-center justify-center">
          <div className="flex min-h-full items-end justify-center max:sm:p-4 text-center sm:items-center sm:p-0 ">
            <DialogPanel
              transition
              className="relative transform  bg-[#0f212e] h-[91vh] max-h-[680px] rounded-lg overflow-hidden  overflow-y-auto scrollbar-thin scrollbar-thumb-[#1d3947] scrollbar-track-[#192e38]    text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="  m-auto  px-4  max-sm:mt-3  sm:p-4 sm:pb-4">
                <div className="flex  text-center  ">
                  <div className="w-full font-bold justify-self-center ml-5">
                    Create an Account
                  </div>
                  <div className="flex ">
                    <IoClose
                      onClick={closeSignupDialog}
                      className="cursor-pointer"
                      size={20}
                    />
                  </div>
                </div>

                <span className="font-bold text-[#b0b9d1] text-base flex justify-center py-3 ">
                  {" "}
                  Step 1/2: Fill out your details
                </span>
                {/* email field */}
                <form onSubmit={handleSubmit}></form>
                <div className="text-[0.9rem] text-[#b0b9d1] font-bold">
                  Email <span className="text-red-500">*</span>
                </div>
                <input
                  onChange={EmailHandler}
                  value={email}
                  className="  bg-[#142b3c]  px-3 text-sm/6 text-white'
            '      data-[focus]:-outline-offset-2 focus:border-[#4a6c84] focus:outline-none  w-full rounded h-10 border-[2px] hover:border-[#4a6c84]  border-[#374f5e] ease-in-out duration-300 transition-all"
                  type="email"
                />
                <span className="text-[.71rem]  text-red-400">
                  {emailErr}
                </span>

                {/* username field */}
                <div className="text-[0.9rem] text-[#b0b9d1] font-semibold pt-3">
                  Username <span className="text-red-500">*</span>
                </div>
                <input
                  onChange={UsernameHandler}
                  value={username}
                  className={` bg-[#142b3c] focus:border-[#4a6c84]
hover:border-[#4a6c84]
border-[#374f5e]
ease-in-out duration-300 transition-all  px-3  text-sm/6 text-white  data-[focus]:-outline-offset-2  focus:outline-none  w-full rounded h-10 border-[2px] `}
                  type="text"
                />
                {/* <span className="text-[.7rem] text-[#b0b9d1]">Your username must be 3-14 charaters long.</span> */}
                <span className="text-[.7rem] text-red-400">{usernameErr}</span>
                {/* password field */}
                <div className="text-[0.9rem] text-[#b0b9d1] font-semibold pt-3 ">
                  Password <span className="text-red-500">*</span>
                </div>
                <span className="relative">
                  {" "}
                  <input
                    onChange={PwdHandler}
                    onFocus={handleFocus}
                    value={pwd}
                    onBlur={handleBlur}
                    className={` relative bg-[#142b3c]  px-3  text-sm/6 text-white focus:border-[#4a6c84]
hover:border-[#4a6c84]
border-[#374f5e]
ease-in-out duration-300 transition-all
                 data-[focus]:-outline-offset-2  focus:outline-none  w-full rounded h-10 border-[2px] 
                 `}
                    type={!showPassword ? "password" : "text"}
                  />
                  {showPassword ? (
                    <IoEyeOff
                      className="absolute  right-4 top-1   cursor-pointer text-gray-500 hover:text-gray-300 "
                      onClick={TogglePassword}
                    />
                  ) : (
                    <IoEye
                      className="absolute  right-4 top-1   cursor-pointer text-gray-500 hover:text-gray-300 "
                      onClick={TogglePassword}
                    />
                  )}
                </span>
                <span className="text-[.7rem] text-red-400">{pwdErr}</span>

                {showInstrction ? (
                  <div className="text-[.7rem]  ease-in-out text-gray-300">
                    <span className="items-center flex gap-1 py-2">
                      {" "}
                      <MdDone /> <span> Minimum 8 charaters</span>
                    </span>
                    <span className="items-center flex gap-1 pb-2">
                      {" "}
                      <MdDone /> <span>At leat 1 number</span>
                    </span>
                    <span className="items-center flex gap-1">
                      {" "}
                      <MdDone />
                      <span>Include lower and upper case</span>
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                {/* dob field */}
                <div className="text-[0.9rem]  text-[#b0b9d1] font-semibold pt-3">
                  Date of Birth <span className="text-red-500">*</span>
                </div>
                <div>
                  <input
                    className={`w-full bg-[#142b3c] select-none px-3  text-sm/6 text-white  focus:border-[#4a6c84]
hover:border-[#4a6c84]
border-[#374f5e]
ease-in-out duration-300 transition-all
                        data-[focus]:-outline-offset-2  focus:outline-none rounded h-10 border-[2px] `}
                    type="date"
                    value={
                      dob && !isNaN(formData.dateOfBirth.getTime())
                        ? formData.dateOfBirth.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={DateHandler}
                  />
                  {dobErr && (
                    <span className="text-[.7rem] text-red-400">{dobErr}</span>
                  )}
                </div>
                {/* phone field */}

                <div className="text-[0.9rem]  text-[#b0b9d1] font-semibold pt-3">
                  Phone(Optional)
                </div>
                <div className="flex justify-center items-center gap-2 ">
                  <input
                    placeholder="Country code"
                    className={`  w-1/3  px-3  text-sm/6 text-white bg-[#142b3c] focus:border-[#4a6c84]
hover:border-[#4a6c84]
border-[#374f5e]
ease-in-out duration-300 transition-all
                  data-[focus]:-outline-offset-2  focus:outline-none rounded h-10 border-[2px] `}
                    type="number"
                  />
                  <input
                    onChange={PhoneHandler}
                    placeholder="Phone number"
                    className="  w-2/3  px-3  text-sm/6 text-whit bg-[#142b3c]
                 data-[focus]:-outline-offset-2  focus:outline-none rounded h-10 border-[2px]   focus:border-[#4a6c84]
hover:border-[#4a6c84]
border-[#374f5e]
ease-in-out duration-300 transition-all"
                    type="text"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleStepTwoDialog}
                  className={` ${
                    formErr
                      ? "bg-red-100 text-red-900"
                      : "bg-[#04d001e4] hover:bg-[#059213] text-slate-900 "
                  } text-sm my-5 font-bold text-center px-4  h-12 rounded-sm w-full `}
                >
                  {formErr ? "Check For Errors" : "Continue"}
                </button>
                <div className="flex justify-center items-center p-2 text-gray-400">
                  <hr className="w-20 bg-[#2f4553] border-none h-px " />
                  <span className=" py-1 px-1">OR</span>
                  <hr className="w-20  bg-[#2f4553] border-none h-px" />
                </div>

                <div className="justify-evenly flex items-center self-center ">
                  <button className="bg-[#2f4553] hover:bg-[#395261] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                    <FcGoogle />
                  </button>
                  <button className="bg-[#2f4553] hover:bg-[#395261] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                    <BsFacebook color="skyBlue" />
                  </button>
                  <button className="bg-[#2f4553] hover:bg-[#395261] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                    <AiFillTwitch color="lightGreen" />
                  </button>
                  <button className="bg-[#2f4553] hover:bg-[#395261] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                    <FaGithub />
                  </button>
                </div>

              <div className="w-full flex justify-center mt-3"><label className="text-[0.9rem] text-[#b0b9d1] font-semibold pt-3 ">Already have an account? </label><span onClick={handleSignin} className="text-[0.9rem] cursor-pointer text-[#fbfcfd] font-bold pt-3 ml-2"> Sign in</span></div>
                
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }