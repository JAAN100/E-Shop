import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ChangeUserPassword } from "../../redux/actions/user.js";
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [newVisible, setNewVisible] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [confirmNewVisible, setConfirmNewVisible] = React.useState(false);
    const { passwordMessage, passwordError, passwordLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (passwordMessage) {
            toast.success(passwordMessage || "Password changed successfully!", {
                toastId: "passwordMessage",
            });
        }
        if (passwordError) {
            toast.error(passwordError || "Failed to change password!", {
                toastId: "passwordError",
            });
        }
    }, [passwordMessage, passwordError])
    const passwordChangeHandler = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match!");
            return;
        }
        dispatch(ChangeUserPassword(oldPassword, newPassword)).then(() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        });
    }
    return (
        <div className="w-full px-3 sm:px-5">
            <h1 className="block text-[20px] text-center sm:text-[25px] font-[600] text-[#000000ba]">
                Change Password
            </h1>
            <div className="w-full">
                <form aria-required onSubmit={passwordChangeHandler} className="flex flex-col items-center">
                    <div className="mt-3 w-[100%] md:w-[50%]">
                        <label htmlFor="oldPassword" className="block pb-2">
                            Old Password
                        </label>
                        <div className="relative w-full mb-4 md:mb-0">
                            <input
                                type={visible ? "text" : "password"}
                                className="w-full border p-1 pr-10 rounded-[5px]"
                                id="oldPassword"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            {!visible ? (
                                <Eye
                                    className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    size={20}
                                    onClick={() => setVisible(!visible)}
                                />
                            ) : (
                                <EyeOff
                                    className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    size={20}
                                    onClick={() => setVisible(!visible)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mt-3 w-[100%] md:w-[50%]">
                        <label htmlFor="newPassword" className="block pb-2">
                            New Password
                        </label>
                        <div className="relative w-full mb-4 md:mb-0">
                            <input
                                type={newVisible ? "text" : "password"}
                                className="w-full border p-1 pr-10 rounded-[5px]"
                                id="newPassword"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {!newVisible ? (
                                <Eye
                                    className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    size={20}
                                    onClick={() => setNewVisible(!newVisible)}
                                />
                            ) : (
                                <EyeOff
                                    className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    size={20}
                                    onClick={() => setNewVisible(!newVisible)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mt-3 w-[100%] md:w-[50%]">
                        <label htmlFor="confirmPassword" className="block pb-2">
                            Confirm Password
                        </label>
                        <div className="relative w-full mb-4 md:mb-0">
                            <input
                                type={confirmNewVisible ? "text" : "password"}
                                className="w-full border p-1 pr-10 rounded-[5px]"
                                id="confirmPassword"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {!confirmNewVisible ? (
                                <Eye
                                    className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    size={20}
                                    onClick={() => setConfirmNewVisible(!confirmNewVisible)}
                                />
                            ) : (
                                <EyeOff
                                    className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    size={20}
                                    onClick={() => setConfirmNewVisible(!confirmNewVisible)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="submit" className={`w-[250px] h-[40px] border border-[#3a24db]  text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:border-none hover:bg-[#3a24db] hover:text-white`}
                            required
                            value={passwordLoading ? "Changing..." : "Change Password"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}