import { Link } from "react-router-dom";
import gamblegrid from "../../../assets/images/gamblegrid.png";
import SignupComponent from "./SignupComponent";
import DialogBoxFirst from "../universalComponents/SignupDialogFirst";
import DialogboxstepTwo from "./SignupDialogSecond";
import { useEffect, useState } from "react";
import { useDialog } from "../../../context/DialogContext";
import SigninComponent from "./SignInComponent";

interface IsOpenProp {
  isOpen: boolean;
}
function UnAuthorizedHeader({ isOpen }: IsOpenProp) {
  const {
    isSignupDialogOpen,
    openSignupDialog,
    isSigninDialogOpen,
    openSigninDialog,
  } = useDialog();
  const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

  // to manage register dialog

  // to manage register dialog
  const handleClickRagisterButton = () => {
    openSignupDialog();
  };
  const handleOpenSigninDialog = () => {
    openSigninDialog();
  };

  return (
    <div className=" w-full ">
      <header
        className={` select-none  h-[72px] flex bg-[rgb(24,61,61)] w-full shadow-md  z-40  shadow-black   py-4  justify-around  items-center`}
      >
        <div >
          <img className="w-32    mr-4   " src={gamblegrid} alt="Logo" />
        </div>

        <div className="flex items-center gap-4">
          {/* User account info */}
          <span>
            <h2
              onClick={handleOpenSigninDialog}
              className="text-white font-bold p-2 cursor-pointer text-sm"
            >
              Sign In
            </h2>
          </span>
          <button
            onClick={handleClickRagisterButton}
            className="bg-[#04d0018c] hover:bg-[#059213b2] text-sm text-white font-bold text-center px-4  h-10  w-30 "
          >
            Register
          </button>
          {/* Add user avatar or balance here */}

          <SigninComponent />
          <div className="hidden">
            <SignupComponent
              openRegisterDialog={openRegisterDialog}
              setOpenRegisterDialog={setOpenRegisterDialog}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default UnAuthorizedHeader;
