import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { MdDone } from "react-icons/md";


interface Props{
handleCheckboxChange:(e: React.ChangeEvent<HTMLInputElement>) => void
openRegisterDialogStepTwo:boolean
setOpenRegisterDialogStepTwo:(value:boolean) => void
isAgreeToTerms:boolean
agreement:string
handleSubmit:(e: React.FormEvent) => Promise<"form has errors" | undefined>
}

// register step two
export default function DialogboxstepTwo({
  handleCheckboxChange,
  openRegisterDialogStepTwo,
  setOpenRegisterDialogStepTwo,
  isAgreeToTerms,
  agreement,
  handleSubmit
}:Props): React.JSX.Element {

 
   return (
     <>
       <Dialog
         open={openRegisterDialogStepTwo}
         onClose={() => setOpenRegisterDialogStepTwo(false)}
         className="relative z-10 select-none"
       >
         <DialogBackdrop
           transition
           className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
         />

         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
           <div className="flex h-screen items-end justify-center p-4  text-center sm:items-center sm:p-0">
             <DialogPanel
               transition
               className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
             >
               <div className="bg-[#0f212e] h-[700px] px-4 sm:p-4 sm:pb-4">
                 <div className="flex  text-center  ">
                   <div className="w-full  font-bold justify-self-center ml-5">
                     Create an Account
                   </div>

                   <div className="flex ">
                     <IoClose
                       onClick={() => setOpenRegisterDialogStepTwo(false)}
                       className="cursor-pointer"
                       size={20}
                     />
                   </div>
                 </div>
                 <div className="font-bold text-[#b0b9d1] text-base flex justify-center py-5  w-full">
                   {" "}
                   Step 2/2: Read and accept the terms and conditions
                 </div>
                 <div className="w-full p-8 h-[65%] rounded-sm bg-slate-600  text-sm overflow-y-scroll text-slate-300">
                   {agreement}
                 </div>
                 {/* check box */}
                 <label className="inline-flex items-center py-4">
                   <span className="relative flex justify-center items-center">
                     <input
                       type="checkbox"
                       className="appearance-none w-5 h-5 border-2 border-gray-500 bg-slate-700 rounded-sm flex justify-center items-center cursor-pointer  "
                       onChange={handleCheckboxChange}
                     />
                     {isAgreeToTerms ? (
                       <MdDone className="absolute font-bold text-lg" />
                     ) : null}
                   </span>{" "}
                   <span className="font-bold text-[.8rem] text-[#b0b9d1] px-4">
                     I have read and agree to the terms and conditions
                   </span>
                 </label>
                 <button
                   onClick={handleSubmit}
                   className="bg-[#04d0018c] hover:bg-[#059213b2] text-sm text-slate-900 font-bold text-center px-4  h-12 rounded-sm w-full"
                 >
                   Continue
                 </button>
                 <span className=" flex justify-center p-5 font-bold text-sm text-[#b0b9d1]">
                   Already have an account?{" "}
                   <a href="" className="text-white">
                     Sign In
                   </a>
                 </span>
               </div>
             </DialogPanel>
           </div>
         </div>
       </Dialog>
     </>
   );
 }