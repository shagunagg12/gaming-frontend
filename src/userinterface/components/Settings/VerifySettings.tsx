"use client";

import type React from "react";
import { useState } from "react";
import useApi from "../../../hooks/useApi";
import { useUserInfo } from "../../../context/UserInfoContext";
import { LevelOne } from "../../../utils/types/UserSettingsTypes";
import { countryNames } from "../../../constants/countryNames";
import { occupationIndustries } from "../../../constants/occupationIndustries";
import { occupationList } from "../../../constants/occupationList";

interface LevelState {
  level1: boolean;
  level2: boolean;
  level3: boolean;
  level4: boolean;
}

export default function VerificationPage() {
  const { useFetchData, usePostData } = useApi();
  const { userId } = useUserInfo();

  //  const {data,isLoading, refetch} = useFetchData("")
  const { isLoading, mutate: submitVerification } = usePostData(
    `user_settings/${userId}/verification`
  );
  const [levelOneData, setLevelOneData] = useState<LevelOne>({
    firstname: "",
    lastname: "",
    country: "",
    placeOfBirth: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    occupationIndustry: "",
    occupation: "",
    experience: "",
  });
  const handleChange = (field: keyof LevelOne, value: string) => {
    setLevelOneData((prev) => ({ ...prev, [field]: value }));
  };

  const [errors, setErrors] = useState<{ [key in keyof LevelOne]?: string }>(
    {}
  );

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    Object.entries(levelOneData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof LevelOne] = "Please fill this field";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      submitVerification(levelOneData);
    }
  };

  const [openLevels, setOpenLevels] = useState<LevelState>({
    level1: true,
    level2: false,
    level3: false,
    level4: false,
  });

  const toggleLevel = (level: keyof LevelState) => {
    setOpenLevels((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`w-5 h-5 text-gray-400 transform transition-transform ${
        isOpen ? "" : "rotate-180"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 15l7-7 7 7"
      ></path>
    </svg>
  );

  const SearchIcon = () => (
    <svg
      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      ></path>
    </svg>
  );

  const WarningIcon = () => (
    <svg
      className="w-5 h-5 text-orange-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
      ></path>
    </svg>
  );

  const UserIcon = ({ size = "normal" }: { size?: "normal" | "large" }) => (
    <svg
      className={`${
        size === "large" ? "w-16 h-16" : "w-12 h-12"
      } text-gray-500`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      ></path>
    </svg>
  );

  const DocumentIcon = () => (
    <svg
      className="w-12 h-12 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      ></path>
    </svg>
  );

  const PlusIcon = ({ size = "normal" }: { size?: "normal" | "large" }) => (
    <svg
      className={`${size === "large" ? "w-4 h-4" : "w-3 h-3"} text-white`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
      ></path>
    </svg>
  );

  const UploadArea = ({
    title,
    icon,
    size = "normal",
  }: {
    title: string;
    icon: React.ReactNode;
    size?: "normal" | "large";
  }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log("Selected file:", file);
        // TODO: store the file or upload it as needed
      }
    };

    return (
      <label
        className={`border-2 border-dashed border-gray-600 rounded-lg ${
          size === "large" ? "p-12" : "p-8"
        } text-center hover:border-gray-500 transition-colors cursor-pointer block relative`}
      >
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            {icon}
            <div
              className={`absolute ${
                size === "large" ? "-bottom-2 -right-2" : "-bottom-1 -right-1"
              } bg-green-500 rounded-full p-1`}
            >
              <PlusIcon size={size} />
            </div>
          </div>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </label>
    );
  };

  return (
    <div className="bg-[#0f212e]  p-4 w-full">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Level 1 */}
        <div className="bg-[#213743] rounded-lg ">
          <button
            onClick={() => toggleLevel("level1")}
            className="w-full flex justify-between items-center p-2 text-left"
          >
            <h2 className="text-lg font-medium text-gray-300 ">Level 1</h2>
            <ChevronIcon isOpen={openLevels.level1} />
          </button>

          {openLevels.level1 && (
            <div className="px-6 pb-6 ">
              <div className="space-y-6">
                <div>
                   <hr className="mt-2 mb-4 border-t-2 border-gray-600" />
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Confirm Your Details
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Please fill in your details & confirm your identity to
                    unlock additional services.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2 ">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={levelOneData.firstname}
                      onChange={(e) =>
                        handleChange("firstname", e.target.value)
                      }
                      type="text"
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    />
                    {/* Error message (conditionally rendered) */}
                    {errors.firstname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstname}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={levelOneData.lastname}
                      onChange={(e) => handleChange("lastname", e.target.value)}
                      type="text"
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastname}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={levelOneData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    >
                      <option value="">Select Country</option>
                      {countryNames.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  {/* Place of Birth */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Place of Birth <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={levelOneData.placeOfBirth}
                      onChange={(e) =>
                        handleChange("placeOfBirth", e.target.value)
                      }
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    >
                      <option value="">Select Place of Birth</option>
                      {countryNames.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.placeOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.placeOfBirth}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={levelOneData.dateOfBirth}
                        onChange={(e) =>
                          handleChange("dateOfBirth", e.target.value)
                        }
                        className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                      />
                      <CalendarIcon />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Residential Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        value={levelOneData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        type="text"
                        placeholder="Enter your address"
                        className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-12 py-2 text-white placeholder-gray-500"
                      />
                      <SearchIcon />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City & Postal Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={levelOneData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        type="text"
                        className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                      />
                      {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city}
                      </p>
                    )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={levelOneData.postalCode}
                        onChange={(e) =>
                          handleChange("postalCode", e.target.value)
                        }
                        type="text"
                        className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                      />
                      {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                    </div>
                    
                  </div>

                  {/* Occupation Industry */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Occupation Industry{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={levelOneData.occupationIndustry}
                      onChange={(e) =>
                        handleChange("occupationIndustry", e.target.value)
                      }
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    >
                      <option value="">Select your occupation industry</option>
                      {occupationIndustries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.occupationIndustry && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.occupationIndustry}
                      </p>
                    )}
                  </div>

                  {/* Occupation */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Occupation <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={levelOneData.occupation}
                      onChange={(e) =>
                        handleChange("occupation", e.target.value)
                      }
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    >
                      <option value="">Select your occupation</option>
                      occupationList
                      {occupationList.map((list) => (
                        <option key={list} value={list}>
                          {list}
                        </option>
                      ))}
                    </select>
                    {errors.occupation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.occupation}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Occupation Experience{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={levelOneData.experience}
                      onChange={(e) =>
                        handleChange("experience", e.target.value)
                      }
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    >
                      <option value="">
                        Select your occupation experience
                      </option>
                      <option value="0-1">Director</option>
                      <option value="2-5">Junior</option>
                      <option value="5+">Management</option>
                      <option value="0-1">Owner</option>
                      <option value="2-5">Senior</option>
                      <option value="5+">Trainee</option>
                    </select>
                    {errors.experience && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Level 2 */}
        <div className="bg-[#213743] rounded-lg">
          <button
            onClick={() => toggleLevel("level2")}
            className="w-full flex justify-between items-center p-2 text-left"
          >
            <h2 className="text-lg font-medium text-gray-300">Level 2</h2>
            <ChevronIcon isOpen={openLevels.level2} />
          </button>

          {openLevels.level2 && (
            <div className="px-6 pb-6">
              <div className="space-y-6">
                <div>
                   <hr className="mt-2 mb-4 border-t-2 border-gray-600" />
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Upload Identification
                  </h3>
                  <p className="text-orange-400 text-sm mb-4">
                    Please complete level one verification first.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Please upload your identification. This step will unlock
                    more capabilities such as higher betting limits and enhanced
                    account security.
                  </p>
                </div>
                 <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Document Type{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={levelOneData.experience}
                      onChange={(e) =>
                        handleChange("experience", e.target.value)
                      }
                      className="w-full bg-[#0f212e] border border-gray-600 rounded-md px-4 py-2 text-white"
                    >
                      <option value="0-1">Driver linence</option>
                      <option value="2-5">National ID card</option>
                      <option value="5+">International passport</option>
                      <option value="0-1">other</option>
                    </select>
                    {errors.experience && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Front Side <span className="text-red-500">*</span>
                    </label>
                    <UploadArea title="Upload Front Side" icon={<UserIcon />} />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Back Side <span className="text-red-500">*</span>
                    </label>
                    <UploadArea
                      title="Upload Back Side"
                      icon={<DocumentIcon />}
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Level 3 */}
        <div className="bg-[#213743] rounded-lg">
          <button
            onClick={() => toggleLevel("level3")}
            className="w-full flex justify-between items-center p-2 text-left"
          >
            <h2 className="text-lg font-medium text-gray-300">Level 3</h2>
            <ChevronIcon isOpen={openLevels.level3} />
          </button>

          {openLevels.level3 && (
            <div className="px-6 pb-6">
              <div className="space-y-6">
                <div>
                   <hr className="mt-2 mb-4 border-t-2 border-gray-600" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Verification
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Please upload your proof of address. All documents must be
                    laying on a flat surface with all 4 corners inside the
                    frame. All information should be clear and identifiable.
                  </p>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <WarningIcon />
                      <p className="text-orange-400 text-sm">
                        Please complete level two verification first.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Proof of Address <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-sm mb-4">
                    Following file types are accepted: .png, .jpg, .pdf
                  </p>

                  <UploadArea
                    title="Upload Proof of Address"
                    icon={<UserIcon size="large" />}
                    size="large"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Level 4 */}
        <div className="bg-[#213743] rounded-lg">
          <button
            onClick={() => toggleLevel("level4")}
            className="w-full flex justify-between items-center p-2 text-left"
          >
            <h2 className="text-lg font-medium text-gray-300">Level 4</h2>
            <ChevronIcon isOpen={openLevels.level4} />
          </button>

          {openLevels.level4 && (
            <div className="px-6 pb-6">
              <div className="space-y-6">
                <div>
                   <hr className="mt-2 mb-4 border-t-2 border-gray-600" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Verification
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Please upload supporting documentation for your Source of
                    Funds. Document laying on a flat surface must show all 4
                    corners and all information should be clear and
                    identifiable.
                  </p>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <WarningIcon />
                      <p className="text-orange-400 text-sm">
                        Please complete level three verification first.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Source of Funds <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-[#0f212e] rounded-lg p-3 mb-4">
                    <p className="text-gray-400 text-sm">
                      Following file types are accepted: .png, .jpg, .pdf
                    </p>
                  </div>

                  <UploadArea
                    title="Upload Source of Funds"
                    icon={<UserIcon size="large" />}
                    size="large"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
