import React, { useEffect, useState } from "react";
import RevolvingDots from "./LoadingAnimation";
import LoadingAnimation from "./LoadingAnimation";
import netBanking from "../../../assets/images/bank-netbanking_100365001.png";
import upi from "../../../assets/images/bank-upi_100365001.png";
import { useUserInfo } from "../../../context/UserInfoContext";
export default function LocalCurrency() {
  type currencyInfoType = {
    currency_id: string;
    currency_name: string;
    currency_symbol: string;
    currency_shortname: string;
    country: string;
    exchange_rate_to_usd: number;
    status: string;
    decimal_places: number;
    country_code: string;
  }[];

  const currencyInfo: currencyInfoType = [
    {
      currency_id: "USD",
      currency_name: "United States Dollar",
      currency_symbol: "$",
      currency_shortname: "USD",
      country: "United States",
      exchange_rate_to_usd: 1.0,
      status: "Active",
      decimal_places: 2,
      country_code: "US",
    },
    {
      currency_id: "EUR",
      currency_name: "Euro",
      currency_symbol: "€",
      currency_shortname: "EUR",
      country: "European Union",
      exchange_rate_to_usd: 1.06,
      status: "Active",
      decimal_places: 2,
      country_code: "EU",
    },
    {
      currency_id: "GBP",
      currency_name: "British Pound Sterling",
      currency_symbol: "£",
      currency_shortname: "GBP",
      country: "United Kingdom",
      exchange_rate_to_usd: 1.21,
      status: "Active",
      decimal_places: 2,
      country_code: "GB",
    },
    {
      currency_id: "INR",
      currency_name: "Indian Rupee",
      currency_symbol: "₹",
      currency_shortname: "INR",
      country: "India",
      exchange_rate_to_usd: 0.012,
      status: "Active",
      decimal_places: 2,
      country_code: "IN",
    },
    {
      currency_id: "JPY",
      currency_name: "Japanese Yen",
      currency_symbol: "¥",
      currency_shortname: "JPY",
      country: "Japan",
      exchange_rate_to_usd: 0.007,
      status: "Active",
      decimal_places: 0,
      country_code: "JP",
    },
    {
      currency_id: "AUD",
      currency_name: "Australian Dollar",
      currency_symbol: "$",
      currency_shortname: "AUD",
      country: "Australia",
      exchange_rate_to_usd: 0.63,
      status: "Active",
      decimal_places: 2,
      country_code: "AU",
    },
    {
      currency_id: "CAD",
      currency_name: "Canadian Dollar",
      currency_symbol: "$",
      currency_shortname: "CAD",
      country: "Canada",
      exchange_rate_to_usd: 0.74,
      status: "Active",
      decimal_places: 2,
      country_code: "CA",
    },
    {
      currency_id: "CNY",
      currency_name: "Chinese Yuan",
      currency_symbol: "¥",
      currency_shortname: "CNY",
      country: "China",
      exchange_rate_to_usd: 0.14,
      status: "Active",
      decimal_places: 2,
      country_code: "CN",
    },
    {
      currency_id: "MXN",
      currency_name: "Mexican Peso",
      currency_symbol: "$",
      currency_shortname: "MXN",
      country: "Mexico",
      exchange_rate_to_usd: 0.056,
      status: "Active",
      decimal_places: 2,
      country_code: "MX",
    },
    {
      currency_id: "BRL",
      currency_name: "Brazilian Real",
      currency_symbol: "R$",
      currency_shortname: "BRL",
      country: "Brazil",
      exchange_rate_to_usd: 0.19,
      status: "Active",
      decimal_places: 2,
      country_code: "BR",
    },
  ];

  const handleClick = (currency_id: string) => {
    setSelectedCurrency(currency_id);
  };

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  // const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [loadingDeposit, setLoadingDeposit] = useState<boolean>(false);
  const [paymentOption, setPaymentOption] = useState<boolean>(false);
  const [loadingDepositAmount, setLoadingDepositAmount] =
    useState<boolean>(false);
  const [errorDeposit, setErrorDeposit] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Track payment method selection
  const [upiId, setUpiId] = useState<string>(""); // Track UPI ID input
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const {country, refetchCountry, countryLoading, countryError} = useUserInfo(); 


const handleClickDeposit = () => {
  setLoading(true);
  setLoadingDeposit(true);
  setPaymentOption(true);
  refetchCountry();

  setTimeout(() => {
    setLoading(false);
  }, 300);
};

useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 200);
}, []);

  if (loading || countryLoading) {
    return <LoadingAnimation />;
  }

  if (countryError) {
    return <div>Something went wrong: {countryError.message}</div>;
  }
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleAmtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only update the amount if it's not empty, else use the selected button
    const newAmount = event.target.value;
    setAmount(newAmount);
  };

  return (
    <>
      <div className="flex flex-col gap-3 overflow-y-auto min-h-[210px] mb-5   scrollbar-thin scrollbar-thumb-[#415c69] scrollbar-track-[#192e38] ">
        {paymentOption ? (
          <>
            <div className="mt-5 h-auto">
              <div className="mt-3">
                <div
                  className="bg-[#192e38] p-5 hover:bg-[#1f3944] flex items-center justify-between cursor-pointer"
                  onClick={() => handlePaymentMethodChange("UPI")}
                >
                  <img className="w-20 float-right" src={upi} alt="upi" />
                  <img
                    className="w-20 float-right"
                    src={netBanking}
                    alt="upi"
                  />
                </div>

                <div className="my-5 ">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setAmount("500")}
                      className={`${
                        amount === "500" ? "bg-blue-600 " : "bg-[#293e4b] "
                      } text-sm text-white font-bold text-center px-4  h-10 rounded `}
                    >
                      500
                    </button>
                    <button
                      onClick={() => setAmount("5000")}
                      className={`${
                        amount === "5000" ? "bg-blue-600 " : "bg-[#293e4b] "
                      }  text-sm text-white font-bold text-center px-4  h-10 rounded `}
                    >
                      5000
                    </button>
                    <button
                      onClick={() => setAmount("30000")}
                      className={`${
                        amount === "30000" ? "bg-blue-600 " : "bg-[#293e4b] "
                      } text-sm text-white font-bold text-center px-4  h-10 rounded `}
                    >
                      30000
                    </button>
                  </div>
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmtChange}
                    placeholder="Amount"
                    className="w-full p-2 border bg-[#0f1c22] border-gray-300 rounded mt-5 font-bold text-white"
                  />
                  {amount && amount !== "0" && (
                    <p className="text-[#fff] font-extrabold text-sm mt-10 flex items-center justify-between">
                      Total{" "}
                      <span>
                        {" "}
                        ₹{amount} {selectedCurrency}
                      </span>
                    </p>
                  )}

                  <button
                    onClick={() => setLoadingDepositAmount(true)}
                    className={`w-full mt-5 bg-[#1475e1]  text-[#ffffff] h-12 text-sm flex font-bold justify-center items-center rounded ${
                      amount !== "" ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {loadingDepositAmount && (
                      <>
                        <div className="loader-spinner"></div>
                      </>
                    )}
                    {amount !== "" ? "Deposit" : "Set Deposit"}
                  </button>
                </div>

                <hr className=" border-[#161d20] " />
                {/* <div className='bg-[#192e38] p-5 hover:bg-[#1f3944]  flex items-center justify-between cursor-pointer'
            onClick={() => handlePaymentMethodChange('Net Banking')}
        >
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Net Banking"
            checked={paymentMethod === 'Net Banking'}
            onChange={() => handlePaymentMethodChange('Net Banking')}
            className='mr-2 size-4'
          />
          Net Banking
        </label>
        <img className='w-20 float-right' src={netBanking} alt="netBanking" />
        </div>
       <hr className=' border-[#161d20] '/>
      */}
              </div>

              {/* {paymentMethod === 'Net Banking' && (
        <div className="my-5 ">
          <div className='grid grid-cols-3 gap-2'>
        <button onClick={() => setAmount('500')} className={`${amount === '500' ? 'bg-blue-600 ': 'bg-[#293e4b] '} text-sm text-white font-bold text-center px-4  h-10 rounded `}>500</button>
        <button onClick={() => setAmount('5000')} className={`${amount === '5000' ? 'bg-blue-600 ': 'bg-[#293e4b] '}  text-sm text-white font-bold text-center px-4  h-10 rounded `}>5000</button>
        <button onClick={() => setAmount('30000')} className={`${amount === '30000' ? 'bg-blue-600 ': 'bg-[#293e4b] '} text-sm text-white font-bold text-center px-4  h-10 rounded `}>30000</button>
        </div>
          <input
            type="text"
            value={ amount }
            onChange={handleAmtChange}
            placeholder="Amount"
            className="w-full p-2 border bg-[#0f1c22] border-gray-300 rounded mt-5 font-bold text-white"
          />
         {amount && amount !== '0' && (
          <p className='text-[#fff] font-extrabold text-sm mt-10 flex items-center justify-between'>Total <span> ₹{amount} {selectedCurrency}</span></p>
           
         )}
        
          <button onClick={handleClickDeposit}
      className={`w-full mt-5 bg-[#1475e1]  text-[#ffffff] h-12 text-sm flex font-bold justify-center items-center rounded ${ amount !== '' ? 'opacity-100':'opacity-50'}`}
    >
      {loadingDeposit && <>    
        <div className="loader"></div>
     </>
      }
      {
        amount !== '' ? 'Deposit':'Set Deposit'
      }

    </button>
        </div>
      )} */}
            </div>
          </>
        ) : (
          <>
            {currencyInfo.map((item, index) => (
              <>
                {currencyInfo[index].country_code === country && (
                  <div
                    key={index}
                    onClick={() => handleClick(item.currency_id)}
                    className=" bg-[#2f4553] text-[#ffffff] px-4 py-3 w-full  rounded flex  items-center"
                  >
                    <span className="w-7 h-7 bg-[#eaff2a] rounded-full mr-2 text-[#5e626a] text-lg font-extrabold flex justify-center items-center">
                      {item.currency_symbol}
                    </span>

                    <span className="flex flex-col">
                      <span className="text-sm font-bold">
                        {item.currency_shortname}
                      </span>
                      <span className="text-[11px] font-semibold primaryTextColor">
                        {item.currency_name}
                      </span>
                    </span>
                  </div>
                )}
              </>
            ))}
            <button
              onClick={handleClickDeposit}
              className="w-full  bg-[#1475e1] mt-auto text-[#ffffff] h-12 flex justify-center items-center rounded"
            >
              {loadingDeposit ? (
                <>
                  <div className="loader"></div>
                </>
              ) : (
                "Deposit"
              )}
            </button>
          </>
        )}
      </div>
    </>
  );
}
