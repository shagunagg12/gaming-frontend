import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { AiFillTwitch } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { useDialog } from "../../../context/DialogContext";
import LoadingAnimation from "./LoadingAnimation";

interface FormData {
  emailOrUsername: string;
  password: string;
}
interface Props {
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  EmailOrUsernameHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailOrUsername: string;
  emailOrUsernameErr: string;
  PwdHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pwd: string;
  TogglePassword: () => void;
  formData: {
    emailOrUsername: string;
    password: string;
  };
  formErr: boolean;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  pwdErr: string;
  showPassword: boolean;
  setFormErr: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailOrUsernameErr: React.Dispatch<React.SetStateAction<string>>;
  setPwdErr: React.Dispatch<React.SetStateAction<string>>;
}

// register step one
export default function SignInDialog({
  setFormErr,
  isLoading,
  handleSubmit,
  EmailOrUsernameHandler,
  emailOrUsername,
  emailOrUsernameErr,
  PwdHandler,
  pwd,
  TogglePassword,
  formData,
  formErr,
  setFormData,
  pwdErr,
  showPassword,
  setPwdErr,
  setEmailOrUsernameErr,
}: Props) {
  const { isSigninDialogOpen, closeSigninDialog, openSignupDialog } = useDialog();

  const handleClickClose = () => {
    closeSigninDialog();
    setTimeout(() => {
      setFormData({ emailOrUsername: "", password: "" });
      setEmailOrUsernameErr("");
      setPwdErr("");
      formErr && setFormErr(false);
    }, 300);
  };

  const handleRegister = () => {
    closeSigninDialog();
    openSignupDialog();
    setTimeout(() => {
      setFormData({ emailOrUsername: "", password: "" });
      setEmailOrUsernameErr("");
      setPwdErr("");
      formErr && setFormErr(false);
    }, 300);
  }
  return (
    <Dialog
      open={isSigninDialogOpen}
      onClose={closeSigninDialog}
      className="relative z-50 select-none"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black min-h-screen bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-[#0f212e] h-full px-4   sm:p-4 sm:pb-4">
              <div className="flex  text-center  ">
                <div className="w-full mb-8 font-bold justify-self-center ml-5">
             
                </div>
                <div className="flex ">
                  <IoClose
                    onClick={handleClickClose}
                    className="cursor-pointer"
                    size={20}
                  />
                </div>
              </div>

              {/* email field */}
              <form onSubmit={handleSubmit}></form>
              <div className="text-[0.9rem] text-[#b0b9d1] font-bold">
                Email or Username <span className="text-red-500">*</span>
              </div>
              <input
                onChange={EmailOrUsernameHandler}
                value={emailOrUsername}
                className="  bg-[#142b3c]  px-3 text-sm/6 text-white'
            '      data-[focus]:-outline-offset-2 focus:border-[#4a6c84] focus:outline-none  w-full rounded h-10 border-[2px] hover:border-[#4a6c84] border-[#374f5e] ease-in-out duration-300 transition-all"
                type="email"
              />
              <span className="text-[.71rem] font-bold text-red-400">
                {emailOrUsernameErr}
              </span>

              {/* password field */}
              <div className="text-[0.9rem] text-[#b0b9d1] font-semibold pt-3 ">
                Password <span className="text-red-500">*</span>
              </div>
              <span className="relative">
                {" "}
                <input
                  onChange={PwdHandler}
                  value={pwd}
                  className={` relative bg-[#142b3c]  px-3  text-sm/6 text-white focus:border-[#4a6c84]
                             hover:border-[#4a6c84] border-[#374f5e] ease-in-out duration-300 transition-all data-[focus]:-outline-offset-2  focus:outline-none  w-full rounded h-10 border-[2px]  `}
                  type={!showPassword ? "password" : "text"}
                />
                {showPassword ? (
                  <IoEyeOff
                    className="absolute  right-4 top-0   cursor-pointer text-gray-500 hover:text-gray-300 "
                    onClick={TogglePassword}
                  />
                ) : (
                  <IoEye
                    className="absolute  right-4 top-0   cursor-pointer text-gray-500 hover:text-gray-300 "
                    onClick={TogglePassword}
                  />
                )}
              </span>
              <span className="text-[.7rem] text-red-400">{pwdErr}</span>

              {/* submit button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className={` ${
                  formErr
                    ? "bg-red-100 text-red-900"
                    : "bg-[#04d001] hover:bg-[#059213fe] text-slate-900"
                } text-sm my-10 font-bold text-center px-4  h-12 rounded-sm w-full `}
              >
                {formErr ? "Check For Errors" : isLoading ? <><div className="loaderDots" /></>: "Login"}
               
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

              <div className="w-full flex justify-center mt-5"><label className="text-[0.9rem] text-[#b0b9d1] font-semibold pt-3 ">Don’t have an account? </label><span onClick={handleRegister} className="text-[0.9rem] cursor-pointer text-[#fbfcfd] font-bold pt-3 ml-2">  Register an Account</span></div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
