import NoData from "../../../../assets/images/NoData.png"
const Crypto=()=>{
return(
    <div className="flex flex-col justify-between mt-5 sm:mt-0 items-center w-full gap-4">
            <div className="flex flex-col w-full justify-center items-center px-5 mt-5 py-5 rounded-md bg-[#0f1c2bda]">
        <img className="md:w-[100px] w-[50px]" src={NoData}/>
        <div className="text-blue-100 text-[15px] mt-5 md:text-[18px] font-semibold">No Deposits</div>
    </div>
    </div>
)
}
export default Crypto;