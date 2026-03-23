import { useState, useEffect, useRef } from "react";
import { FaHistory, FaRobot } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import ChatHistory from "./ChatHistory";

interface Props {
  setOpenMainScreen: React.Dispatch<React.SetStateAction<boolean>>
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>
  isChatOpen: boolean
}
const ChatSupport: React.FC<Props> = ({ setOpenMainScreen, isChatOpen, setChatOpen }) => {
  interface Message {
    text: string;
    type: 'user' | 'assistant';
    timestamp: Date;
  }
  const [isSM, setIsSM] = useState(false);
  useEffect(() => {
    const updateScreenSize = () => {
      setIsSM(window.innerWidth <= 415);
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages, (key, value) => {
      return key === "timestamp" ? new Date(value) : value;
    }) : [];
  });
  const [isThisOpen, setThisOpen]=useState<boolean>(
    () => JSON.parse(localStorage.getItem("isThisOpen") || "true")
  );
  const [showHistory, setShowHistory] = useState<boolean>(
    () => JSON.parse(localStorage.getItem("showHistory") || "false")
  );
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
    localStorage.setItem("showHistory", JSON.stringify(showHistory));
    localStorage.setItem("isThisOpen", JSON.stringify(isThisOpen));
  }, [messages, showHistory, isThisOpen]);

  // const [selectedPath, setSelectedPath] = useState<string[]>([]);
  // const [currentTopic, setCurrentTopic] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  interface ChatOption {
    text: string;
    next?: number;
    final?: boolean;
    response?: string;
  }

  const chatOptions: { [key: number]: ChatOption[] } = {
    0: [
      { text: "Technical Support", next: 1 },
      { text: "Billing Inquiries", next: 2 },
      { text: "Product Information", next: 3 },
      { text: "General Questions", next: 4 },
    ],
    1: [
      { text: "Login Issues", next: 5 },
      { text: "App Performance", next: 6 },
      { text: "Account Settings", next: 7 },
    ],
    2: [
      { text: "Payment Methods", final: true, response: "We accept all major credit cards, PayPal, and bank transfers. For detailed information about payment methods, please visit our billing portal." },
      { text: "Invoice Request", final: true, response: "You can download all your invoices from the billing section of your account dashboard." },
    ],
    3: [
      { text: "Product Features", final: true, response: "Our product offers cutting-edge features including real-time analytics, custom reporting, and API integration." },
      { text: "Pricing Plans", final: true, response: "We offer flexible pricing plans starting from $29/month. Visit our pricing page for detailed information." },
    ],
    4: [
      { text: "Contact Sales", final: true, response: "Our sales team will contact you within 24 hours at your registered email address." },
      { text: "Business Hours", final: true, response: "We are available Monday to Friday, 9 AM to 6 PM EST." },
    ],
    5: [
      { text: "Reset Password", final: true, response: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions sent to your email." },
      { text: "Account Locked", final: true, response: "If your account is locked, please wait 30 minutes before trying again or contact support for immediate assistance." },
    ],
    6: [
      { text: "Slow Performance", final: true, response: "Try clearing your browser cache and cookies. If the issue persists, please check your internet connection." },
      { text: "App Crashes", final: true, response: "Please update to the latest version of the app. If the problem continues, try reinstalling the application." },
    ],
    7: [
      { text: "Profile Updates", final: true, response: "You can update your profile information from the settings page. Changes will be reflected immediately." },
      { text: "Privacy Settings", final: true, response: "Your privacy settings can be managed from the account security section of your profile." },
    ],
  };

  const handleOptionSelect = (option: ChatOption) => {
    const newMessage: Message = {
      text: option.text,
      type: "user",
      timestamp: new Date(),
    };

    // Add the user's message to the messages state
    setMessages((prev: Message[]) => [...prev, newMessage]);
    setIsLoading(true);

    if (option.final) {
      setTimeout(() => {
        const responseMessage: Message = {
          text: option.response || "",
          type: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev: Message[]) => [...prev, responseMessage]);
        setCurrentStep(0);
        setIsLoading(false);
      }, 2000);
    } else {
      // Handle intermediate steps
      setTimeout(() => {
        if (option.next !== undefined) {
          setCurrentStep(option.next);

          // Guidance message for the next step
          const aiGuidance: Message = {
            text: `I understand you're interested in ${option.text}. Please select one of the options below for more specific assistance.`,
            type: "assistant",
            timestamp: new Date(),
          };

          // Add the guidance message to the messages state
          setMessages((prev: Message[]) => [...prev, aiGuidance]);
          setIsLoading(false);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        text: "Hello! I'm your AI support assistant. How can I help you today? Please select a category below.",
        type: "assistant",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  return (
    <>
      {isChatOpen  &&
        <div className={`border rounded-2xl z-20 flex flex-col justify-between mt-16 mr-4 flex-1 ${isSM ? "w-[300px]" : "w-96"} bg-white shadow-xl relative overflow-hidden`}>
          <div className="bg-white overflow-y-auto max-h-full rounded-lg shadow-lg flex-1 flex flex-col">

            <div className='flex bg-gradient-to-r from-blue-500 to-blue-800 p-2 items-center flex-row justify-between'>
              <div onClick={() => { setOpenMainScreen(true), setChatOpen(false), setThisOpen(false), localStorage.setItem("messages", "") }} className="cursor-pointer hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg rounded-full p-2 transition-all duration-200">
                <IoIosArrowBack size={20} />
              </div>
              <div className='text-[16px] font-bold'>Gameblegrid.com</div>
              <div onClick={() => { setOpenMainScreen(false), setChatOpen(false), localStorage.setItem("messages", "") }} className="cursor-pointer hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg rounded-full p-2 transition-all duration-200">
                <HiX size={20} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-[#142936] scrollbar-thumb-[#4cb0ef] scroll-smooth" style={{ maxHeight: "calc(100vh - 240px)" }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                >
                  {message.type === "assistant" && (
                    <div className="p-2 w-fit h-fit rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <FaRobot className="text-blue-600 text-sm" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.type === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-100 text-gray-800"} shadow-sm`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <FaRobot className="text-blue-600 text-sm" />
                  </div>
                  <div className="max-w-xs lg:max-w-md px-6 py-4 rounded-lg bg-gray-100 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 flex flex-col items-end pt-2">
              <div className="flex flex-wrap flex-row-reverse px-4 gap-2">
                {chatOptions[currentStep]?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="p-1 text-[#0b448d] w-fit text-[14px] px-2 rounded-lg bg-[#daeeff] hover:bg-blue-50 flex border border-gray-200 hover:border-blue-300 shadow-sm"
                    disabled={isLoading}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              <div className="border-b-[1px] border-gray-400 w-full mt-2"></div>
              {messages.length > 0 && (
                <div onClick={() => { setShowHistory(true), setThisOpen(false) }} className="flex justify-end px-4 py-0.5 cursor-pointer hover:bg-[#df3b59] hover:border-[#f34a69] border-[1.5px] w-fit items-center bg-[#f74a6a] rounded-full space-x-2 mt-4">
                  <FaHistory />
                  <div className="text-[14px] text-white font-bold">Chat History</div>
                </div>
              )}
            </div>
          </div>
        </div>}
      {!isThisOpen && (
        <ChatHistory setOpenMainScreen={setOpenMainScreen} showHistory={showHistory} setShowHistory={setShowHistory} setChatSupportOpen={setThisOpen} messages={messages.map(message => ({ ...message, timestamp: message.timestamp.toISOString() }))} />
      )}
    </>
  );
};

export default ChatSupport;