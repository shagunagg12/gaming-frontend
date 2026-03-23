import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const NotificationHeader: React.FC<Props> = ({ setIsModalOpen }) => {
  const [isSM, setIsSM] = useState(false);
  const [isMD, setIsMD] = useState(false);
  useEffect(() => {
    const updateScreenSize = () => {
      setIsSM(window.innerWidth <= 639);
      setIsMD(window.innerWidth <= 767)
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center md:gap-x-3 gap-x-2">
          <IoMdNotifications color="#c8e1ea" size={isSM ? 12 : isMD ? 15 : 20} />
          <div className="md:text-[15px] text-[10px] sm:text-[12px] font-bold text-white tracking-wide">Notifications</div>
        </div>
        <div>
          <ImCross onClick={(e) => { setIsModalOpen(false), e.stopPropagation() }} color="white" size={isSM ? 8 : isMD ? 10 : 15} />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-6 items-center">
        <div className="md:text-[12px] text-[8px] sm:text-[10px] text-blue-100 font-medium">New</div>
        <div className="md:text-[12px] text-[8px] sm:text-[10px] text-white font-semibold">Mark all as read</div>
      </div>
    </div>
  )
}
export default NotificationHeader;