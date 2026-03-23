import React, { createContext, useContext, useState } from "react";
interface dialogContextType {
  isSignupDialogOpen: boolean;
  openSignupDialog: () => void;
  closeSignupDialog: () => void;
  isSigninDialogOpen: boolean;
  openSigninDialog: () => void;
  closeSigninDialog: () => void;
}
const DialogContext = createContext<dialogContextType | undefined>(undefined);

interface props{
    children:React.ReactNode
}
// Dialog context provider
export const DialogProvider: React.FC<props> = ({ children }) => {
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [isSigninDialogOpen, setIsSigninDialogOpen] = useState(false);

  // Function to open the dialog
  const openSignupDialog = () => setIsSignupDialogOpen(true);
  const openSigninDialog = () => setIsSigninDialogOpen(true);

  // Function to close the dialog
  const closeSignupDialog = () => setIsSignupDialogOpen(false);
  const closeSigninDialog = () => setIsSigninDialogOpen(false);

  return (
    <DialogContext.Provider value={{ isSignupDialogOpen, openSignupDialog, closeSignupDialog ,isSigninDialogOpen, openSigninDialog, closeSigninDialog}}>
      {children}
    </DialogContext.Provider>
  );
};

// Custom hook to use the dialog context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
};
