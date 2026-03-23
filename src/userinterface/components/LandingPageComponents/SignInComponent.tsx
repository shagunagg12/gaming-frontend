
import React, {  useEffect, useState } from "react";
import {  useDialog } from "../../../context/DialogContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import SignInDialog from "../universalComponents/SignInDialog";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../../utils/api/api";

interface IsOpenProp {
}

export default function SigninComponent({

}: IsOpenProp) {
 

  // form validations
 

  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [emailOrUsernameErr, setEmailOrUsernameErr] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pwdErr, setPwdErr] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formErr, setFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  const navigate = useNavigate()
  const { setIsLoggedIn,setAccessToken, } = useAuth();



  // Show Password Button
  const TooglePassword = () => {
    setShowPassword(!showPassword);
  };

  // form data
  interface FormData {
    emailOrUsername: string;
    password: string;
  }
  const [formData, setFormData] = useState<FormData>({
    emailOrUsername: "",
    password: "",
  });



  const getPwdError = (pwd: string): string => {
    if (!pwd) return "Password is required";
    if (pwd.length < 8) return "Password must contain at least 8 characters";

    return "";
  };

  // Email Validation
  const getEmailOrUsernameError = (emailOrUsername: string): string => {
    if (!emailOrUsername) return "Minimum character length is 3";
    return "";
  };



  // handlers
  const EmailOrUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailOrUsername(value);
    setFormData((prev) => ({
      ...prev,
      emailOrUsername: value,
    }));
    const errorMessage = getEmailOrUsernameError(value);
    setEmailOrUsernameErr(errorMessage);
  };

  const PwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
    const errorMsg = getPwdError(value);
    setPwdErr(errorMsg);
  };

    useEffect(() => {
      const hasErrors = emailOrUsernameErr  || pwdErr 
      setFormErr(!!hasErrors); // true if there are any errors, false if no errors
    }, [formData,  password, emailOrUsername]);
  
  

      // const handleLogin = async (e: React.FormEvent) => {
      //   e.preventDefault();
      //   try {
      //     const response = await axios.post("http://localhost:3000/api/v1/auth/login", { emailOrUsername, password });
      //     localStorage.setItem("access_token", response.data.access_token);
      //     setIsLoggedIn(true);
      //     console.log("token",response.data);
          
      //     navigate("/casino/home");
      //   } catch (error) {
      //     console.error("Login failed", error);
      //   }
      // };

      const extractErrorMessage = (html: string) => {
        const regex = /Error:\s*(.*?)<br>/
        const match = html.match(regex);
        if (match) {
          return match[1].trim();
        } else {
          return "An unknown error occurred";
        }
      };

      const handleErrors = (error: any) => {

        const errorMessage = extractErrorMessage(error.response.data);        
         toast.error(errorMessage, {
          position: "top-left", 
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: "bg-[#142b3c] h-20 mt-14 text-white",
        });
      
      };
      const { closeSigninDialog } = useDialog();
      const URL = import.meta.env.VITE_API_URL;
  // Use react-query's useMutation to handle login
 
  const mutation = useMutation({
    mutationFn: (credentials: { emailOrUsername: string, password: string }) => {
      return api.post("/auth/login", credentials, {
        withCredentials: true, // Send cookies with the request
      });
    },
    onMutate: () => {
      setIsLoading(true); // Set loading to true when mutation starts
      setIsButtonDisabled(true);
    },
    onSuccess: (data) => {
      const {  user } = data.data.data;

      Cookies.set("access_token", data.data.data.access_token,{ expires: 30, secure: process.env.NODE_ENV === 'production' });
      const access_token = Cookies.get("access_token");
      setIsLoggedIn(true);
      if (access_token) {
        setAccessToken(access_token);
      }
        setFormData({ emailOrUsername: "", password: "" });
        setEmailOrUsernameErr("");
        setPwdErr("");
        formErr && setFormErr(false);
      closeSigninDialog()
      navigate("/casino/home");
      setIsLoading(false)
      resetButtonState();
    },
    onError: (error) => {
      console.error("Login failed:", error);
      handleErrors(error);
      setIsLoading(false);
      resetButtonState();
    },
    onSettled: () => {
      setIsLoading(false);
      resetButtonState();
    },
  
  });

  const resetButtonState = () => {
    setTimeout(() => {
      setIsButtonDisabled(false); // Enable button after the timeout
    }, 3000); // 3-second cooldown period, adjust as needed
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs before making the API call
    const emailOrUsernameError = getEmailOrUsernameError(emailOrUsername);
    const passwordError = getPwdError(password);

    setEmailOrUsernameErr(emailOrUsernameError);
    setPwdErr(passwordError);

    // If there are errors, don't proceed
    if (emailOrUsernameError || passwordError) {
      setFormErr(true);
      return;
    }

    setFormErr(false);

    // Call the mutation to trigger the login API call
    mutation.mutate({ emailOrUsername, password });
  };

  return (
    <>
          
          <SignInDialog 
            EmailOrUsernameHandler={EmailOrUsernameHandler}
            PwdHandler={PwdHandler}
            TogglePassword={TooglePassword}
            emailOrUsername={emailOrUsername}
            pwd={password}
            formErr={formErr}
            setFormErr={setFormErr}
            emailOrUsernameErr={emailOrUsernameErr}
            pwdErr={pwdErr}
            setPwdErr={setPwdErr}
            setEmailOrUsernameErr={setEmailOrUsernameErr}
            showPassword={showPassword}
            formData={formData}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            isLoading={isLoading}
           />

    </>
  );
}
