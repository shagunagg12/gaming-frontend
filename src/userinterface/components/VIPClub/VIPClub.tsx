import VIPClubBenifits from "./VIPClubBenifits";
import VIPClubHeader from "./VIPClubHeader";
import VIPClubQuestions from "./VIPClubQuestions";
import VIPClubRanking from "./VIPClubRanking";
import VIPSupport from "./VIPSupport";

const VIPClub=()=>{
    return(
        <div className="flex flex-col bg-[#4c785c75]">
           <VIPClubHeader/>
           <VIPClubRanking/>
           <VIPClubBenifits/>
           <VIPClubQuestions/>
           <VIPSupport/>
        </div>
    )
}
export default VIPClub;