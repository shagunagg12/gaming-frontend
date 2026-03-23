import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitch } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import React, {  useEffect, useState } from "react";
import DialogBoxFirst from '../universalComponents/SignupDialogFirst'
import DialogboxstepTwo from "./SignupDialogSecond";
import {  useDialog } from "../../../context/DialogContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import api from "../../../utils/api/api";
import Cookies from "js-cookie";

interface IsOpenProp {
  openRegisterDialog: boolean;
  setOpenRegisterDialog: (value: boolean) => void;
}

export default function SignupComponent({
  openRegisterDialog,
  setOpenRegisterDialog,
}: IsOpenProp) {
  //   const months = [
  //     'January', 'February', 'March', 'April', 'May', 'June',
  //     'July', 'August', 'September', 'October', 'November', 'December'
  // ];

  // const handleChangeYear=(e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const value= parseInt(e.target.value)
  //   if (!isNaN(value) && value >= 1900 && value <= 2024) {
  //     setYear(value);
  //   }
  //   }

  // form validations
  const [showInstrction, setShowInstruction] = useState<boolean>(false);
  // const [year ,setYear]=useState<number>()

  const [isAgreeToTerms, setIsAgreeToTerms] = useState(false);
  // const [isAgreeToTermsErr, setIsAgreeToTermsErr] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [dob, setDob] = useState<Date>(new Date());
  const [emailErr, setEmailErr] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [pwdErr, setPwdErr] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [usernameErr, setUsernameErr] = useState<string>("");
  // const [success, setSuccess] = useState<boolean>(false)
  const [formErr, setFormErr] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [seletedMonth,setSelectedMonth]=useState<string>('Month');
  const [openRegisterDialogStepTwo, setOpenRegisterDialogStepTwo] =
    useState<boolean>(false);



    const {openSignupDialog,closeSignupDialog} = useDialog() 
    const navigate = useNavigate()
  // for dialog step 2
  const handleStepTwoDialog = (e: React.FormEvent) => {
    // Validate fields
    const emailError = getEmailError(formData.email);
    const pwdError = getPwdError(formData.password);
    const usernameError = getUsernameError(formData.username);
    const dobError = getDateOfBirthError(formData.dateOfBirth);
    // Set error states
    setEmailErr(emailError);
    setPwdErr(pwdError);
    setUsernameErr(usernameError);
    setDobErr(dobError);
    if (!emailError && !pwdError && !usernameError && !dobErr) {
      setOpenRegisterDialogStepTwo(true);
      closeSignupDialog()
    } else {
      setOpenRegisterDialogStepTwo(false);
    }
  };

  // month selector
  // const monthSelector=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  //   setSelectedMonth(e.target.value)
  // }

  // Show Password Button
  const TooglePassword = () => {
    setShowPassword(!showPassword);
  };

  // form data
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
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    dateOfBirth: new Date(),
    phone: "",
    countryCode: "+91",
    referralCode: "",
    agreeToTerms: false,
  });

  // Password Validation
  const isPwdCapital = (pwd: string): boolean => /[A-Z]/.test(pwd);
  const isPwdSmall = (pwd: string): boolean => /[a-z]/.test(pwd);
  const isPwdNum = (pwd: string): boolean => /[0-9]/.test(pwd);

  const getPwdError = (pwd: string): string => {
    if (!pwd) return "Password is required";
    if (pwd.length < 8) return "Password must contain at least 8 characters";
    if (!isPwdCapital(pwd)) return "Password must include an uppercase letter";
    if (!isPwdSmall(pwd)) return "Password must include a lowercase letter";
    if (!isPwdNum(pwd)) return "Password must include a number";

    return "";
  };

  // Email Validation
  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getEmailError = (email: string): string => {
    if (!email) return "Email is required";
    if (!isValidEmail(email)) return "Please enter a valid email address";
    if (email.length < 5) return "Email is too short";
    if (email.length > 100) return "Email is too long";
    return "";
  };

  // Username Validation
  const getUsernameError = (username: string): string => {
    if (!username) return "Username is required";
    if (username.length < 3)
      return "Username must be at least 3 characters long";
    if (username.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return "Username can only contain letters, numbers, and underscores";
    return "";
  };

  // terms validation
  const getTermsError = (isAgreeToTerms: boolean): boolean => {
    if (!isAgreeToTerms) return false;

    return true;
  };

  // handlers
  const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
    const errorMessage = getEmailError(value);
    setEmailErr(errorMessage);
  };

  const PwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
    const errorMsg = getPwdError(value);
    setPwdErr(errorMsg);
  };

  const UsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setFormData((prev) => ({
      ...prev,
      username: value,
    }));
    const errorMessage = getUsernameError(value);
    setUsernameErr(errorMessage);
  };

  const PhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      phone: String(value),
    }));
  };

  // react-query
  // const {} = useQuery({queryKey:['register'],queryFn:reginterUser})



 const {isLoggedIn,setIsLoggedIn} = useAuth()
 console.log('is logged in:',isLoggedIn)  ;

 const baseUrl = import.meta.env.VITE_API_URL
 
  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    if (formData.phone === "") {
      delete formData.phone;
    }
    
    e.preventDefault();
  
    if (isAgreeToTerms) {
      console.log("no error");
      try {
        const response = await api.post(
          `${baseUrl}/api/v1/auth/register`,
          formData 
        );
  
        console.log("Form submitted successfully:", response.data);
        setIsLoggedIn(true);
        Cookies.set("access_token", response.data.data.access_token,{ expires: 30, secure: process.env.NODE_ENV === 'production' });
        navigate('/casino/home');
      } catch (error: any) {
        console.error("Error submitting form:", error.response?.data || error.message);
      }
    } else {
      console.log("form has error");
      return "form has errors";
    }
  };
  
  const [dobErr, setDobErr] = useState("");

  const getDateOfBirthError = (date: Date): string => {
    const currentDate = new Date();

    let age = currentDate.getFullYear() - date.getFullYear();
    const month = currentDate.getMonth() - date.getMonth();
    const currentYear = new Date().getFullYear();
    const selectedYear = date.getFullYear();

    // Check if the year is within a valid range
    if (selectedYear < 1900 || selectedYear > currentYear) {
      return "Please enter a year between 1900 and the current year";
    }
    if (month < 0 || (month === 0 && currentDate.getDate() < date.getDate())) {
      age--;
    }

    if (age < 18) {
      return "You must be at least 18 years old";
    }
    if (!date || isNaN(date.getTime())) {
      return "Date is required";
    }

    if (isNaN(date.getTime())) {
      return "Please enter a valid date";
    }

    return "";
  };

  const DateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = new Date(e.target.value);
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: value,
    }));
    const errorMsg = getDateOfBirthError(value);
    setDobErr(errorMsg);
  };

  useEffect(() => {
    const hasErrors = emailErr || usernameErr || pwdErr || dobErr;
    setFormErr(!!hasErrors); // true if there are any errors, false if no errors
  }, [formData, handleSubmit, dob, username, pwd, email]);

  
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked; // Use 'checked' to get the boolean value
    setIsAgreeToTerms(value); // Set 'isChecked' to the current checkbox value
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: value, // Update the 'agreeToTerms' field with the checkbox value
    }));
  };


  return (
    <>
      {/* register instantly component */}
      <div className="md:grid-cols-1 grid my-2 min-h-64 bgImage select-none z-50">
        {/* first grid */}

        <div className="  flex   items-center  ">
          <div className="w-[85%] h-3/4 flex items-center justify-end max-sm:w-full max-sm:justify-center">
            <div className="w-80  ">
              <div className="font-bold text-lg text-white  p-2 text-center z-1 ">
                Play Better
              </div>
              <button
                onClick={openSignupDialog}
                className="bg-[#04d0018c] hover:bg-[#059213b2] text-sm text-white font-bold text-center px-4  h-10 rounded-full w-full"
              >
                Register Instantly
              </button>
              <div className="flex justify-center items-center p-2 text-gray-400">
                <hr className="w-20 bg-[#2f4553] border-none h-px " />
                <span className=" py-1 px-1">OR</span>
                <hr className="w-20  bg-[#2f4553] border-none h-px" />
              </div>

              <div className="justify-evenly flex items-center self-center ">
                <button className="bg-[#2f4553] hover:bg-[#2f4553] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                  <FcGoogle />
                </button>
                <button className="bg-[#2f4553] hover:bg-[#2f4553] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                  <BsFacebook color="skyBlue" />
                </button>
                <button className="bg-[#2f4553] hover:bg-[#2f4553] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                  <AiFillTwitch color="lightGreen" />
                </button>
                <button className="bg-[#2f4553] hover:bg-[#2f4553] border-none  text-white font-bold py-2 px-4 w-12 rounded">
                  <FaGithub />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* second grid */}
        {/* <div className="z-10 opacity-60 ">
                        <img src={Casinobg} alt="" />
                    </div> */}
      </div>
      {openRegisterDialogStepTwo ? setOpenRegisterDialog(false) : null}
          <DialogBoxFirst 
            DateHandler={DateHandler}
            EmailHandler={EmailHandler}
            PwdHandler={PwdHandler}
            UsernameHandler={UsernameHandler}
            PhoneHandler={PhoneHandler}
            TogglePassword={TooglePassword}
            dob={dob}
            email={email}
            pwd={pwd}
            username={username}
            formErr={formErr}
            dobErr={dobErr}
            emailErr={emailErr}
            pwdErr={pwdErr}
            usernameErr={usernameErr}
            showPassword={showPassword}
            formData={formData}
            handleStepTwoDialog={handleStepTwoDialog}
            handleSubmit={handleSubmit}
            openRegisterDialog={openRegisterDialog}
            setFormData={setFormData}
            setOpenRegisterDialog={setOpenRegisterDialog}

           />
      <DialogboxstepTwo
        openRegisterDialogStepTwo={openRegisterDialogStepTwo}
        setOpenRegisterDialogStepTwo={setOpenRegisterDialogStepTwo}
        agreement="agreement"
        handleCheckboxChange={handleCheckboxChange}
        isAgreeToTerms={isAgreeToTerms}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
