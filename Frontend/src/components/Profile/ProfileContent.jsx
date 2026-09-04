import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import AllOrders from "./AllOrders.jsx";
import AllRefundsOrders from "./AllRefundsOrders.jsx";
import TrackOrder from "./TrackOrder.jsx";
import ChangePassword from "./ChangePassword.jsx";
import Address from "./Address.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUser } from "../../redux/actions/user.js";
import { EyeOff, Eye } from "lucide-react";
import { userUpdateInfo } from "../../redux/actions/user.js";
export default function ProfileContent({ active }) {
    const { user, error, message } = useSelector((state) => state.user);
    const [fullName, setFullName] = React.useState(user?.fullName || "");
    const [email, setEmail] = React.useState(user?.email || "");
    const [phoneNumber, setPhone] = React.useState(user?.phoneNumber || "");
    const [password, setPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [avatar, setAvatar] = React.useState(user?.avatar || "");
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (error) {
            toast.error(error, {
                toastId: "error-toast",
            });
            dispatch({ type: "clearErrors" });
        } else if (message) {
            toast.success(message, {
                toastId: "success-toast",
            });
            dispatch({ type: "clearMessages" });
        }
    }, [error, message]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(userUpdateInfo(email, password, phoneNumber, fullName)).then(() => setLoading(false));
    }
    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();
        formData.append("image", file);
        const data = await fetch("/api/user/update-avatar", {
            method: "PUT",
            ContentType: "multipart/form-data",
            body: formData,
        }, {
            withCredentials: true,
        });
        const res = await data.json();
        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            toast.error("Something went wrong. Please try again");
        }
    };

    return (
        <div className="w-[80%] my-auto md:my-0">
            {active === 1 && (
                <>
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            <img
                                src={user?.avatar}
                                alt={user?.fullName}
                                className="w-[150px] h-[150px] rounded-full flex items-center justify-center object-cover border-[3px] border-[#3ad132]"
                            />
                            <input type="file" name="image" id="image" className="hidden" onChange={handleImage} />
                            <div className="cursor-pointer w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center absolute bottom-[5px] right-[5px]">
                                <label htmlFor="image">
                                    <AiOutlineCamera className="cursor-pointer" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full px-5">
                        <form action="" onSubmit={handleSubmit} aria-required={true}>
                            <div className="w-full block md:flex pb-3">
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="fullName" className="block pb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-[95%] border p-1 rounded-[5px] mb-4 md:mb-0"
                                        id="fullName"
                                        required
                                        defaultValue={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="email" className="block pb-2">
                                        Email
                                    </label>
                                    <input
                                        disabled
                                        type="email"
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0 text-gray-400 border-black"
                                        id="email"
                                        required
                                        defaultValue={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full block md:flex pb-3 ">
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="phone" className="block pb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0"
                                        id="phone"
                                        required
                                        defaultValue={phoneNumber}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] md:w-[50%] relative">
                                    <label htmlFor="password" className="block pb-2">
                                        Password
                                    </label>
                                    <input
                                        type={visible ? "text" : "password"}
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0"
                                        id="password"
                                        required
                                        placeholder="Enter your password"
                                        defaultValue={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {!visible ? (
                                        <Eye
                                            className="text-gray-500 absolute top-9 right-8 cursor-pointer"
                                            size={25}
                                            onClick={() => {
                                                setVisible(!visible);
                                            }}
                                        />
                                    ) : (
                                        <EyeOff
                                            className="text-gray-500 absolute top-9 right-8 cursor-pointer"
                                            size={25}
                                            onClick={() => {
                                                setVisible(!visible);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <input type="submit" className={`w-[250px] h-[40px] border border-[#3a24db]  text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:border-none hover:bg-[#3a24db] hover:text-white`}
                                    required
                                    value={`${loading ? "Updating..." : "Update Info"}`}
                                />
                            </div>
                        </form>
                    </div>
                </>
            )}

            {
                active === 2 && (
                    <div>
                        <AllOrders />
                    </div>
                )
            }
            {
                active === 3 && (
                    <div>
                        <AllRefundsOrders />
                    </div>
                )
            }
            {
                active === 4 && (null)
            }
            {
                active === 5 && (
                    <div>
                        <TrackOrder />
                    </div>
                )
            }
            {
                active === 6 && (
                    <div>
                        <ChangePassword />
                    </div>
                )
            }{
                active === 7 && (
                    <div>
                        <Address />
                    </div>
                )
            }{
                active === 8 && (
                    <div>
                        <LogOut />
                    </div>
                )
            }
        </div>
    );
}

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const res = await fetch("/api/user/logout", {
                method: "POST",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success === true) {
                toast.success(data.message);
                dispatch(resetUser());
                navigate("/");
            }
        } catch (error) {
            toast.error("Error logging out");
        }
    }
    return (
        <div className="flex items-center justify-center px-6 my-auto">
            <div className="w-[300px] h-[200px] bg-white shadow-sm rounded-[10px] flex items-center justify-center flex-col">
                <h1>Do you wanna logout?</h1>
                <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-[5px] cursor-pointer">
                    Yes, Logout
                </button>
            </div>

        </div>
    )
}
