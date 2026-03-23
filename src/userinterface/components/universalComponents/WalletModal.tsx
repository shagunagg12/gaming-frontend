import  { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel,  } from '@headlessui/react';
import { IoClose } from "react-icons/io5";

interface WalletProps {
  userId: string;
  openModalDialog:boolean
  setOpenModalDialog: (value: boolean) => void;
  
}

const Wallet: React.FC<WalletProps> = ({ userId ,openModalDialog, setOpenModalDialog }) => {
  const [balance, setBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   // Fetch wallet balance from the backend
  //   const fetchWalletBalance = async () => {
  //     // Replace with your backend API
  //     try {
  //       const response = await fetch(`/api/wallet/balance?userId=${userId}`);
  //       const data = await response.json();
  //       setBalance(data.balance);
  //     } catch (err) {
  //       setError("Failed to load balance");
  //     }
  //   };

  //   fetchWalletBalance();
  // }, [userId]);

  const handleDeposit = async () => {
    if (depositAmount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }

    setLoading(true);
    try {
      // Call the API to deposit funds
      const response = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: depositAmount,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setBalance(data.newBalance);
        setDepositAmount(0); // Reset deposit field
        setError(null);
      } else {
        setError(data.message || "Deposit failed.");
      }
    } catch (err) {
      setError("Something went wrong during deposit.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (withdrawAmount <= 0 || withdrawAmount > balance) {
      setError("Invalid withdraw amount.");
      return;
    }

    setLoading(true);
    try {
      // Call the API to withdraw funds
      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: withdrawAmount,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setBalance(data.newBalance);
        setWithdrawAmount(0); // Reset withdraw field
        setError(null);
      } else {
        setError(data.message || "Withdrawal failed.");
      }
    } catch (err) {
      setError("Something went wrong during withdrawal.");
    } finally {
      setLoading(false);
    }
  };


// register step one
function DialogBox(): React.JSX.Element {
    // const [date, setDate] = useState<number>(0)
    // const [dateErr, setDateErr] = useState<number>(0)
    // const [isChecked, setIsChecked] = useState(false);

    return <Dialog open={openModalDialog}  onClose={()=>setOpenModalDialog(false)} className="relative z-10 select-none">
      <DialogBackdrop
        transition
        className="fixed z-50 inset-0 bg-gray-500 min-h-screen bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
           
              <div className="bg-slate-700 h-full px-4   sm:p-4 sm:pb-4">
                <div className="flex  text-center  ">
                  <div className="w-full  font-bold justify-self-center ml-5">Create an Account</div>
                  <div className="flex "><IoClose onClick={() => setOpenModalDialog(false)} className="cursor-pointer" size={20} /></div>
                </div>

           

          
               
                {/* <button type="submit" onClick={handleStepTwoDialog} className={` ${formErr?'bg-red-100 text-red-900':'bg-[#04d0018c] hover:bg-[#059213b2] text-slate-900'} text-sm my-10 font-bold text-center px-4  h-12 rounded-sm w-full mb-10`}>
                {formErr ?'Check For Errors':'Continue'}
                </button> */}
                <div className="flex justify-center items-center p-2 text-gray-400"><hr className="w-20 bg-slate-400 border-none h-px " /><span className=" py-1 px-1">OR</span><hr className="w-20  bg-slate-400 border-none h-px" /></div>

          
            
              </div>
              
       
          </DialogPanel>
        </div>
      </div>
    </Dialog>


  }

  
  return (<>
    {/* <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-[500px] absolute">
      <h2 className="text-2xl font-bold text-center mb-4">Wallet</h2>
      <div className="text-center mb-4">
        <h3 className="text-lg">Current Balance: ${balance.toFixed(2)}</h3>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="mb-4">
        <label htmlFor="depositAmount" className="block text-gray-700 mb-2">
          Deposit Amount
        </label>
        <input
          type="number"
          id="depositAmount"
          className="w-full p-2 border border-gray-300 rounded"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
        />
        <button
          onClick={handleDeposit}
          className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="withdrawAmount" className="block text-gray-700 mb-2">
          Withdraw Amount
        </label>
        <input
          type="number"
          id="withdrawAmount"
          className="w-full p-2 border border-gray-300 rounded"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
        />
        <button
          onClick={handleWithdraw}
          className="w-full mt-2 bg-red-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>
    </div> */}

    <>
      {/* register instantly component */}
      <div className="md:grid-cols-1 grid my-2 min-h-64  select-none" >
        {/* first grid */}


        <div className="  flex   items-center  ">

          <div className="w-[85%] h-3/4 flex items-center justify-end max-sm:w-full max-sm:justify-center">
            <div className="w-80  ">
            


            </div></div></div>


      </div>
      {/* {openRegisterDialogStepTwo?setOpenModalDialog(false):null} */}
      <DialogBox/>
      {/* {DialogboxstepTwo()} */}
      
      
 

    </>
    </>
  );
};

export default Wallet;
