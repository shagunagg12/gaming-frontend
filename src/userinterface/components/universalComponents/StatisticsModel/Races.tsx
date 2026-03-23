import NoRacesData from "../../../../assets/images/NoDataRaces.png"
const Races = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center px-5 mt-5 py-5 rounded-md">
            <img className="md:w-[100px] w-[50px]" src={NoRacesData} />
            <div className="text-blue-100 text-[15px] mt-5 md:text-[18px] font-semibold">
                This user has no visible statistics.
            </div>
        </div>
    )
}
export default Races;