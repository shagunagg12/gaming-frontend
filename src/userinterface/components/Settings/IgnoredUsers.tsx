import GlobeIcon from "../../../assets/images/GlobeIcon.png"
const IgnoredUsers=()=>{
    return(
        <div className="text-white  flex-col min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-4 rounded-lg bg-[#0f1c2bda] w-full">
        <div className="text-white  flex-col min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-4 rounded-lg bg-[#1a2c38] w-full">
          <div className="mb-8 pb-6 border-b border-slate-600/50">
          <h1 className="text-3xl font-bold mb-3 text-white">Ignored Users</h1>
          <p className="text-slate-400 text-base">View and manage Stake users that you have ignored.</p>
        </div> 
         <div className="grid grid-cols-2 mb-8">
          <div className="text-slate-300 font-medium text-base">Action</div>
          <div className="text-slate-300 font-medium text-base text-right">User</div>
        </div> 
         <div className="flex flex-col items-center justify-center py-16 space-y-6">
           <img className="w-20 " src={GlobeIcon}/>
            <div className="text-[15px] font-medium text-blue-100">
            No ignored users to show
            </div>
        </div>
        </div>
        </div>
    )
}
export default IgnoredUsers;