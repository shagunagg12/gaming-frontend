import { useState } from "react";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

const PreferencesSettings = () => {
  const [toggleStates, setToggleStates] = useState<{ [category: string]: { [id: number]: boolean } }>({});
  console.log(toggleStates);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_ENDPOINT = `/admin`;
  const { usePostData } = useApi(API_BASE_URL);
  const { mutate: createSecuritySettings } = usePostData(`${API_ENDPOINT}/preferencesettings`); //to create
  // Items object
  const Items = {
    Privacy: {
      MainItems: {
        mainHeading:
          "User privacy is one of the core values of Stake. These settings allow you to be completely anonymous from the rest of the players.",
        SaveHeading: "Please allow up to 30 seconds for update to take effect.",
      },
      ToggleItems: [
        {
          id: 1,
          heading: "Enable Ghost Mode",
          description: "Your username will not appear in public bet feed and bet preview",
        },
        {
          id: 2,
          heading: "Hide all your statistics",
          description: "Other users won't be able to view your wins, losses, and wagered statistics",
        },
        {
          id: 3,
          heading: "Hide all your race statistics",
          description: "Other users won't be able to view your race statistics",
        },
      ],
    },
    Marketing: {
      MainItems: {
        mainHeading: "",
        SaveHeading: "",
      },
      ToggleItems: [
        {
          id: 5,
          heading: "Receive email offers from us",
          description: "Choose if you wish to hear from us via email",
        },
        {
          id: 6,
          heading: "Receive SMS offers from us",
          description: "Choose if you wish to hear from us via SMS",
        },
      ],
    },
  };

  const CheckBoxItems = [
    { id: 1, text: "123,456.78" },
    { id: 2, text: "١٢٣٤٥٦٫٧٨" },
    { id: 3, text: "123.456,78" },
  ];

  const handleToggle = (item: string, id: number) => {
    setToggleStates((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        [id]: !prev[item]?.[id],
      },
    }));
  };
   const handleSubmit = (categoryKey: string, e: React.FormEvent, ) => {
          alert("Save for"+ categoryKey)
          e.preventDefault();
          // Validation check
          if (!toggleStates[categoryKey]) {
              toast.warn('Toggles changes required to save');
              return;
          }
  
          const newSecuritySettings = {
  
              toggleStates
          };
  
          createSecuritySettings(newSecuritySettings, {
              onSuccess: () => {
                 setToggleStates({});
                  toast.success('General Settings Created Successfully');
  
              },
              onError: (error: any) => {
                  console.error('Error creating category:', error);
                  toast.error(error.response.data.message);
              }
          });
  
  
      };

  return (
    <div className="text-white flex flex-col min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-8 rounded-lg bg-[#0f1c2bda] w-full">
      {Object.entries(Items).map(([categoryKey, category]) => (
        <div key={categoryKey} className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
          <div className="px-6 w-full text-start font-bold text-[18px] mb-4">{categoryKey}</div>
          <div className={`text-[14px] font-medium w-full text-start px-6 ${category.MainItems.SaveHeading && "pb-1.5 md:pb-3"} text-blue-100`}>
            {category.MainItems.mainHeading}
          </div>
          <div className="w-[95%] border-t border-[#6e8190]"></div>
          <div className="flex flex-col gap-y-4 items-start py-2 w-full px-2 md:px-6">
            {category.ToggleItems.map((item) => (
              <div key={item.id} className="flex flex-row gap-x-4 items-center w-full">
                <input
                  type="checkbox"
                  id={`toggle-${item.id}`}
                  className="sr-only peer"
                  checked={!!toggleStates[item.heading]?.[item.id] ||false}
                  onChange={() => handleToggle(item.heading, item.id)}
                />
                <label
                  htmlFor={`toggle-${item.id}`}
                  className="relative flex-shrink-0 w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 cursor-pointer"
                ></label>
                <div className="flex flex-col">
                  <div className="text-[15px] font-medium text-start text-blue-100">{item.heading}</div>
                  <div className="text-sm text-[#809ab4] font-medium">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-[#6e8190] mb-5"></div>
          <div className="w-full flex items-center justify-between">
            <div className={`text-[14px] font-medium text-start px-6 pb-3 text-blue-100`}>{category.MainItems.SaveHeading}</div>
            <button
              type="button"
              className="focus:outline-none text-black bg-[#28db2e] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-4"
              onClick={(e) => handleSubmit(categoryKey, e)}
            >
              Save
            </button>
          </div>
        </div>
      ))}

      {/* Flat Number Formatting Section */}
      <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
        <div className="px-6 w-full text-start font-bold text-[18px] mb-4">Flat Number Formatting</div>
        <div className="w-[95%] border-t border-[#6e8190]"></div>
        <div className="flex flex-col gap-y-4 items-start py-2 w-full px-2 md:px-6">
          {CheckBoxItems.map((item) => (
            <label htmlFor={`${item.id}`} key={item.id} className="flex flex-row gap-x-4 items-center w-full">
              <input id={`${item.id}`} type="radio" name="format" value={item.text} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
              <div className="flex flex-col">
                <div className="text-[15px] font-medium text-start text-blue-100">{item.text}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="w-full border-t border-[#6e8190] mb-5"></div>
        <div className="w-full flex items-center justify-between">
          <div className="text-[14px] font-medium text-start px-6 pb-3 text-blue-100"></div>
          <button
            type="button"
            className="focus:outline-none text-black bg-[#28db2e] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;
