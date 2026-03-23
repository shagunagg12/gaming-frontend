import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { GoDiscussionOutdated } from "react-icons/go";
import { HiX } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface Message {
  text: string;
  type: "user" | "assistant";
  timestamp: string;
}

interface Session {
  time: string;
  topic: string;
  conversation: Message[];
}

interface ChatHistoryProps {
  messages: Message[];
  setChatSupportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMainScreen: React.Dispatch<React.SetStateAction<boolean>>;
  showHistory: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  setChatSupportOpen,
  setShowHistory,
  setOpenMainScreen,
  showHistory,
}) => {
  const [isSM, setIsSM] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState<{
    time: string;
    topic: string;
  } | null>(null);

  // Define state for chat history
  const [chatHistory, setChatHistory] = useState<Record<string, Session[]>>(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    return storedHistory ? JSON.parse(storedHistory) : {};
  });

  // Detect screen size for responsiveness
  useEffect(() => {
    const updateScreenSize = () => {
      setIsSM(window.innerWidth <= 415);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Save new messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const date = new Date(messages[0].timestamp).toLocaleDateString();
      const time = new Date(messages[0].timestamp).toLocaleTimeString();
      const firstUserMessageIndex = messages.findIndex((msg) => msg.type === "user");

      if (firstUserMessageIndex !== -1) {
        const topic = messages[firstUserMessageIndex].text;

        const newSession: Session = {
          time,
          topic,
          conversation: messages,
        };

        const updatedHistory = { ...chatHistory };

        if (!updatedHistory[date]) {
          updatedHistory[date] = [];
        }

        if (
          !updatedHistory[date].some(
            (session) => session.time === time && session.topic === topic
          )
        ) {
          updatedHistory[date].push(newSession);
          setChatHistory(updatedHistory);
          localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
        }
      }
    }
  }, [messages, chatHistory]);

  const [DateOpen, setDateOpen] = useState("")
  return (
    <>
      {showHistory && (
        <div
          className={`flex items-center border z-20 rounded-2xl flex-col justify-start mt-16 mr-4 flex-1 ${isSM ? "w-[300px]" : "w-96"
            } bg-white shadow-xl`}
        >
          {/* Modal Header */}
          <div className="pl-2 py-2 pr-2 border-b bg-gradient-to-r from-blue-500 to-blue-800 rounded-t-2xl border-gray-200 w-full flex justify-between items-center">
            <span className="hover:bg-gray-100 hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg rounded-full p-2 transition-all duration-200"><IoIosArrowBack onClick={() => {setChatSupportOpen(true),setShowHistory(false)}} size={20} /></span> <div className="flex items-center gap-x-1"><div className="text-[16px] font-bold">Chat History</div><span><FaHistory size={20}/></span></div>
            <button
              onClick={() => {
                setChatSupportOpen(false);
                setOpenMainScreen(false);
                setShowHistory(false);
              }}
              className=" hover:bg-gray-100 hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg rounded-full p-2 transition-all duration-200"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div
            className="flex-1 w-full overflow-y-auto p-2 scrollbar-thin scrollbar-track-[#142936] scrollbar-thumb-[#4cb0ef] scroll-smooth"
            style={{ maxHeight: "calc(105vh - 240px)" }}
          >
            {Object.entries(chatHistory).map(([date, sessions]) => {
              // Ensure sessions is an array before attempting to map
              if (!Array.isArray(sessions)) {
                return null; // skip if it's not an array
              }
              // Function to calculate "time ago"
              const formatTimeAgo = (inputDate: string): string => {
                // Parse DD/MM/YYYY to YYYY-MM-DD
                const [day, month, year] = inputDate.split('/');
                const parsedDate = new Date(`${year}-${month}-${day}`);

                if (isNaN(parsedDate.getTime())) {
                  return "Invalid Date";
                }

                const now = new Date();
                const isToday =
                  parsedDate.getDate() === now.getDate() &&
                  parsedDate.getMonth() === now.getMonth() &&
                  parsedDate.getFullYear() === now.getFullYear();

                const isYesterday =
                  parsedDate.getDate() === now.getDate() - 1 &&
                  parsedDate.getMonth() === now.getMonth() &&
                  parsedDate.getFullYear() === now.getFullYear();

                if (isToday) {
                  return "Today";
                } else if (isYesterday) {
                  return "Yesterday";
                }

                const diffInMs = now.getTime() - parsedDate.getTime();
                const seconds = Math.floor(diffInMs / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                if (days > 7) {
                  return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
                } else if (days > 0) {
                  return `${days} day${days > 1 ? "s" : ""} ago`;
                } else if (hours > 0) {
                  return `${hours} hour${hours > 1 ? "s" : ""} ago`;
                } else if (minutes > 0) {
                  return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
                } else {
                  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
                }
              };
              const toggleDropdown = (date:string) => {
                setDateOpen((prev) => (prev === date ? "" : date)); // Toggle only the clicked item's dropdown
              };
              return (
                <div key={date} className="mb-2">
                  {/* Date Header */}
                  <div onClick={() => toggleDropdown(date)} className="bg-blue-200 flex-col text-blue-900 shadow-md shadow-gray-400 flex items-end cursor-pointer px-2 py-2 text-[14px] font-bold rounded text-sm mb-2">
                    <div className="flex flex-row w-full justify-between items-center">
                      <div> <GoDiscussionOutdated size={20} /></div>
                      <div>  Date: {date}</div>
                      {!(DateOpen==date) ?
                        <div><IoIosArrowForward size={18} /></div> :
                        <div><IoIosArrowDown size={18} /></div>}
                    </div>
                    <div className="text-[12px] font-medium flex items-center gap-x-1 text-gray-600">Gameble.com<div className="p-[2px] rounded-full bg-gray-500"></div>({formatTimeAgo(date)})</div>
                  </div>
                  <div className="flex justify-end ">
                    {DateOpen==date && (
                      <div className="bg-gray-100 bg-opacity-90 p-2 pb-0 flex w-[95%] flex-col rounded-lg shadow-md border border-gray-300">

                        {/* Sessions */}
                        {sessions.map(({ time, topic, conversation }, idx) => (
                          <>

                            <div key={idx} className="mb-2">
                              <button
                                className="bg-green-200  justify-between flex w-full shadow-md shadow-gray-400 text-green-900 px-2 py-1 text-sm font-semibold text-left sticky -top-2 overflow-y-auto"
                                onClick={() => {
                                  setExpandedTopic((prev) => {
                                    if (prev?.time === time && prev?.topic === topic) {
                                      return null;
                                    }
                                    // Otherwise, expand the topic
                                    return { time, topic };
                                  });
                                }}
                              >
                                <div>*{topic}</div>
                                <div className="text-[9px] font-semibold text-black">{time}</div>
                              </button>
                              {/* Expanded Conversation */}
                              {expandedTopic?.time === time && expandedTopic?.topic === topic && (
                                <div className="mt-2 px-2 border-gray-300">
                                  {conversation.map((message, messageIdx) => (
                                    <div
                                      key={messageIdx}
                                      className={`py-1 ${message.type === "user" ? "text-right" : "text-left"} leading-5 mt-1.5`}
                                    >
                                      <div className={`text-sm ${message.type === "user" ? "text-blue-600" : "text-gray-900"}`}>
                                        <span className="text-black font-bold text-[14px]"> {message.type === "user" ? "You:" : "Technical:"}</span> {message.text}
                                      </div>
                                      <span className="text-xs text-gray-400">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                          </>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHistory;
