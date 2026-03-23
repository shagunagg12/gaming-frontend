import { useEffect, useState } from "react";
import ToggleTableComponent from "../../LandingPageComponents/ToggleTableComponent";

const Other = () => {
    interface toggleOption {
        title: string;
        key: string;

    }
     const [isLoading, setIsLoading] = useState(true); // For shimmer effect
        const Shimmer = ({ className }: { className: string }) => (
            <div className={`shimmer-effect rounded-md ${className}`}></div>
        );
    
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    const toggleOption: toggleOption[] = [
        { title: "All", key: 'all' },
        { title: "Bonus", key: 'bonus' },
        { title: "Drop", key: 'drop' },
        { title: "Campaign Withdrawal", key: 'campaign_withdrawal' },
        { title: "Reload Claim", key: 'reload_claim' },
        { title: "Race Payout", key: 'race_payout' },
        { title: "Rains Received", key: 'rains_received' },
        { title: "Rains Sent", key: 'rains_sent' },
        { title: "Rakeback Received", key: 'rakeback_received' },
        { title: "Sportsbook Promotion Payout", key: 'sportsbook_promotion_payout' },
        { title: "Tips Received", key: 'tips_received' },
        { title: "Vault Deposite", key: 'vault_deposite' },
        { title: "Vault Withdrawal", key: 'vault_withdrawal' },
    ];
    return (
        <>
        {isLoading?
        
        (<div className="w-full mb-5 max-w-[90%] sm:max-w-[80%]">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {Array.from({ length: 3 }).map(() => (
                <>
                  {Array.from({ length: 4 }).map((_, colIndex) => (
                    <Shimmer
                      key={colIndex}
                      className="h-4 sm:h-5 lg:h-6 w-full"
                    />
                  ))}
                </>
              ))}
            </div>
          </div>
          
          
          )
                   :
        <div className="w-full items-start sm:mt-4 overflow-auto mt-2 md:mt-0">
            <ToggleTableComponent defaultTable="all" toggleOption={toggleOption} />
        </div>}
        </>
    )
}
export default Other;