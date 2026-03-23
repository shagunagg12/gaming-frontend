import { useState, useEffect } from "react";
import { GoGraph } from "react-icons/go";
import ToggleComponent from "../ToggleComponent";

const StatisticsMain = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [activeCategoryStatistics, setActiveCategoryStatistics] = useState<string>("Statistics");
  const [isLoading, setIsLoading] = useState(true);

  const UserInfo = { name: "ManishDhub", joinDate: "December 23, 2024" };

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden"; // Disable body scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable body scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalVisible]);

  interface ToggleOption {
    title: string;
    key: string;
  }

  const toggleOptions: ToggleOption[] = [
    { title: "Statistics", key: "Statistics" },
    { title: "Trophies", key: "Trophies" },
    { title: "Races", key: "Races" },
    { title: "Raffles", key: "Raffles" },
  ];

  const Shimmer = ({ className }: { className: string }) => (
    <div className={`bg-[#aaaabcd7] rounded-md shimmer-effect ${className}`}></div>
  );

  return (
    <>
      {/* Background Overlay */}
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleModalVisibility}
        ></div>
      )}

      {/* Toggleable Content */}
      {isModalVisible && (
        <div
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
          tabIndex={-1}
          role="dialog"
          aria-hidden={!isModalVisible}
        >
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative bg-[#203044] rounded-lg shadow-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 md:px-5 md:pt-5 pt-5 rounded-t">
                <div className="flex items-center gap-x-2">
                  <GoGraph size={20} color="#aad1fa" />
                  {isLoading ? (
                    <Shimmer className="w-24 h-4" />
                  ) : (
                    <div className="text-[16px] font-bold text-white">
                      {activeCategoryStatistics}
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleModalVisibility}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal Body */}
              <div className="p-4 md:py-4 md:px-5">
                {isLoading ? (
                  <>
                    <Shimmer className="w-32 h-6 mb-2" />
                    <Shimmer className="w-48 h-4" />
                  </>
                ) : (
                  <>
                    <div className="text-[18px] font-bold text-blue-100">
                      {UserInfo.name}
                    </div>
                    <div className="text-blue-100 text-[12px] font-medium">
                      Joined on {UserInfo.joinDate}
                    </div>
                  </>
                )}
              </div>
              {/* Toggle Component */}
              <div className="px-4 py-4">
                {isLoading ? (
                  <Shimmer className="w-full h-12" />
                ) : (
                  <ToggleComponent
                    defaultToggleOption="Statistics"
                    toggleOptions={toggleOptions}
                    setActiveCategoryStatistics={setActiveCategoryStatistics}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsMain;
