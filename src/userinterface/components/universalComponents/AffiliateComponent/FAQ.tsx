import ToggleComponent from "../ToggleComponent";

const FAQ = () => {
     interface toggleOption {
        title: string;
        key: string;
       
      }
      const toggleOption: toggleOption[] = [
    
        { title: "General", key: 'generalFaq' },
        { title: "Affiliate Program", key: 'affFaq' },
        { title: "Earnings", key: 'earningFaq' },
        
      ];
    return (
        <div className="w-full flex items-start sm:mt-4 mt-2 md:mt-0 flex-col">
              <ToggleComponent defaultToggleOption="generalFaq" toggleOptions={toggleOption} />
        </div>
    )
}
export default FAQ;