import ToggleComponent from "../ToggleComponent";

const Withdrawals=()=>{
    interface toggleOption {
                title: string;
                key: string;
               
              }
              const toggleOption: toggleOption[] = [
            
                { title: "Crypto", key: 'cryptowithdrawal' },
                { title: "Local Currrency", key: 'localcurrencywithdrawal' },
                
              ];
            return (
                <div className="w-full flex items-start sm:mt-4 mt-2 md:mt-0 flex-col">
                      <ToggleComponent defaultToggleOption="cryptowithdrawal" toggleOptions={toggleOption} />
                </div>
            )
}
export default Withdrawals;