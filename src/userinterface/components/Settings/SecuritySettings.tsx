import { useEffect, useState } from "react";
import TextField from "./Textfield";
import QRCodeGenerator from "../../QRCode";
import { IoCheckbox, IoCopySharp } from "react-icons/io5";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";

const SecuritySettings = () => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
    const Shimmer = ({ className }: { className: string }) => (
        <div className={`shimmer-effect rounded-md ${className}`}></div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
        return () => clearTimeout(timer);
    }, []);
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passWord, setPassword] = useState("")
    const [factorCode, setFactorCode] = useState("")
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_ENDPOINT = `/admin`;

    const { usePostData } = useApi(API_BASE_URL);
    const { mutate: createSecuritySettings } = usePostData(`${API_ENDPOINT}/securitysettings`); //to create
    const { mutate: createSecuritySettings2 } = usePostData(`${API_ENDPOINT}/securitysettings`); //to create
    interface CopyInputProps {
        value: string; // Text to copy
        width?: string; // Optional: Width of the input field
    }

    const CopyInput: React.FC<CopyInputProps> = ({ value, width = "w-full" }) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(value).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            });
        };


        return (
            <div className={`relative ${width} max-w-[20rem]`}>
                {/* Input Field */}
                <input
                    type="text"
                    value={value}
                    readOnly
                    className="bg-[#314755] text-white border border-gray-400 rounded-lg text-sm p-2.5 pr-10 overflow-hidden whitespace-nowrap text-ellipsis focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title={value} // Tooltip for full text
                />
                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-200 hover:bg-gray-600 hover:text-white p-1 rounded transition duration-300"
                >
                    {copied ? (
                        /* Success Icon */
                        <IoCheckbox />
                    ) : (
                        /* Default Copy Icon */
                        <IoCopySharp />
                    )}
                </button>
            </div>
        );
    };
    const handleSave = (e: React.FormEvent) => {
        alert("Save")
        e.preventDefault();
        // Validation check
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.warn('All fields are required');
            return;
        }

        const newSecuritySettings = {

            oldPassword,
            newPassword,
            confirmPassword
        };

        createSecuritySettings(newSecuritySettings, {
            onSuccess: () => {
                setOldPassword("");
                setConfirmPassword("");
                setNewPassword("");
                toast.success('General Settings Created Successfully');

            },
            onError: (error: any) => {
                console.error('Error creating category:', error);
                toast.error(error.response.data.message);
            }
        });


    };
    const handlSubmitTwoFactor = (e: React.FormEvent) => {
        alert("Submit two factoe")
        e.preventDefault();
        // Validation check
        if (!passWord || factorCode) {
            toast.warn('All fields are required');
            return;
        }

        const newSecuritySettings2 = {
            passWord,
            factorCode
        };
        createSecuritySettings2(newSecuritySettings2, {
            onSuccess: () => {
                setPassword("");
                setFactorCode("");
                toast.success('Security Settings Save Successfully');
            },
            onError: (error: any) => {
                console.error('Error creating category:', error);
                toast.error(error.response.data.message);
            }
        });
    };
    return (
        <div className="text-white flex flex-col min-h-fit mt-4 sm:mt-0 md:p-6 sm:p-4 p-2 space-y-8 rounded-lg bg-[#0f1c2bda] w-full">
            <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
                <div className="px-6 w-full text-start font-bold text-[18px] mb-4">Password</div>
                <div className="w-full flex flex-col mb-4 items-start px-6">
                    <div className="text-[14px] font-medium text-blue-100">Old Password</div>
                    <div className="md:w-[50%] w-full">
                        <TextField value={oldPassword} onChange={setOldPassword} placeholder="Old Password" />
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4 items-start px-6">
                    <div className="text-[14px] font-medium text-blue-100">New Password</div>
                    <div className="md:w-[50%] w-full">
                        <TextField value={newPassword} onChange={setNewPassword} placeholder="New Password" />
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4 items-start px-6">
                    <div className="text-[14px] font-medium text-blue-100">Confirm Password</div>
                    <div className="md:w-[50%] w-full">
                        <TextField value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirm Password" />
                    </div>
                </div>
                {/* Horizontal Line */}
                <div className="w-full border-t border-[#6e8190] mb-5"></div>
                <div className="w-full flex items-center justify-end">
                    <button onClick={handleSave} type="button" className="focus:outline-none text-black bg-[#28db2e] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-4">Save</button>
                </div>
            </div>
            {/*  */}
            <div className="w-full rounded-lg flex bg-[#273849] pt-6 py-4 items-center justify-center flex-col">
                <div className="px-6 w-full text-start font-bold text-[18px] mb-3">Two Factor</div>
                <div className="text-[14px] w-full flex items-start px-6 font-medium mb-3 text-blue-100">
                    To keep your account extra secure leave a two factor authentication enabled.
                </div>

                {/* Horizontal Line */}
                <div className="w-[95%] border-t border-[#6e8190]"></div>
                <div className="flex flex-col w-full items-start px-6 mt-4 mb-5 justify-start">
                    <div className="text-[14px] font-medium text-blue-100">
                        Copy this code to your authenticator app
                    </div>
                    {/* Copy */}
                    {isLoading ? <Shimmer className="w-[30%] h-7"></Shimmer> :
                        <div className="flex justify-center items-center bg-gray-800">
                            <CopyInput value="MF4GCIZTLJYFM7JUGNXUSPDFMZZFWXJFKROSSWT5" />
                        </div>}
                </div>
                <div className="flex flex-col w-full items-start px-6 mb-5 justify-start">
                    <div className="text-[14px] font-medium text-blue-100">
                        Don't let anyone see this!
                    </div>
                    {isLoading ?
                        <Shimmer className="w-[100px] h-[100px]"></Shimmer> :
                        <QRCodeGenerator />}
                </div>
                <div className="w-full flex flex-col mb-4 items-start px-6">
                    <div className="text-[14px] font-medium text-blue-100">Password <span className="text-red-500">*</span></div>
                    <div className="md:w-[50%] w-full">
                    <TextField value={passWord} onChange={setPassword} placeholder="Password" />
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4 items-start px-6">
                    <div className="text-[14px] font-medium text-blue-100">Two Factor Code <span className="text-red-500">*</span></div>
                    <div className="md:w-[50%] w-full">
                        <div>
                            <input type="text" value={factorCode} onChange={(e) => setFactorCode(e.target.value)} id="first_name" className="bg-[#102636] hover:bg-[#1b3648] focus:ring-2 focus:ring-[#6e8190] border-[#6e8190] shadow-md text-sm rounded-md focus:border-blue-500 block w-full p-2.5" placeholder="Two Factor Code" required />
                        </div>
                    </div>
                </div>
                {/* Horizontal Line */}
                <div className="w-full border-t border-[#6e8190] mb-5"></div>
                <div className="w-full flex items-center justify-end">
                    <button onClick={handlSubmitTwoFactor} type="button" className="focus:outline-none text-black bg-[#28db2e9f] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-4">Submit</button>
                </div>
            </div>
        </div>
    )
}
export default SecuritySettings;