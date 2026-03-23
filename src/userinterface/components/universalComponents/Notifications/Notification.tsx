import { useEffect, useState } from "react";
import NotificationHeader from "./NotificationHeader";
import NotificationBar from "./NotificationBar";

interface NotificationProps{
  setNotification:React.Dispatch<React.SetStateAction<boolean>>;
}
const Notification:React.FC<NotificationProps>=({setNotification})=>{
  const [isSM, setIsSM] = useState(false);
       useEffect(() => {
              const updateScreenSize = () => {
                  setIsSM(window.innerWidth <= 639);
              };
      
              updateScreenSize();
              window.addEventListener('resize', updateScreenSize);
      
              return () => window.removeEventListener('resize', updateScreenSize);
          }, []);
    return (
      <div>
        {/* Small Modal */}
          <div
            className={`${!isSM?"fixed":""}  overflow-y-auto w-auto h-fit max-h-full`}
            tabIndex={-1}
          >
            <div className="relative w-full sm:max-w-md max-h-full">
              <div className="relative bg-[#34495e] space-y-2 p-4 sm:rounded-lg shadow">
                {/* Modal header */}
                <NotificationHeader setIsModalOpen={setNotification}/>
                <NotificationBar/>
              </div>
              
            </div>
          </div>
      </div>
    );
}
export default Notification;