import ToggleComponent from "../ToggleComponent";

const Deposits=()=>{
    interface toggleOption {
            title: string;
            key: string;
           
          }
          const toggleOption: toggleOption[] = [
        
            { title: "Crypto", key: 'crypto' },
            { title: "Local Currrency", key: 'localcurrency' },
            
          ];
        return (
            <div className="w-full flex items-start sm:mt-4 mt-2 md:mt-0 flex-col">
                  <ToggleComponent defaultToggleOption="crypto" toggleOptions={toggleOption} />
            </div>
        )
}
export default Deposits;