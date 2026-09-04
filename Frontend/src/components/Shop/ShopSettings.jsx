import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EyeOff, Eye } from "lucide-react";
import { userUpdateInfo } from "../../redux/actions/user.js";
export default function ShopSettings() {
    const { shop, error, message } = useSelector((state) => state.seller);
    const [fullName, setFullName] = React.useState(shop?.shopName || "");
    const [email, setEmail] = React.useState(shop?.shopEmail || "");
    const [phoneNumber, setPhone] = React.useState(shop?.phoneNumber || "");
    const [password, setPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [avatar, setAvatar] = React.useState(shop?.avatar || "");
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (error) {
            toast.error(error, {
                toastId: "error-toast",
            });
        } else if (message) {
            toast.success(message, {
                toastId: "success-toast",
            });
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
        <div className="flex flex-col items-center w-full px-4 sm:px-6 py-6">
            <div className="flex justify-center w-full">
                <div className="relative">
                    <img
                        src={shop?.avatar}
                        alt={shop?.shopName}
                        className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] rounded-full flex items-center justify-center object-cover border-[3px] border-[#3ad132]"
                    />
                    <input type="file" name="image" id="image" className="hidden" onChange={handleImage} />
                    <div className="cursor-pointer w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center absolute bottom-[5px] right-[5px]">
                        <label htmlFor="image">
                            <AiOutlineCamera className="cursor-pointer" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[700px] mt-6">
                <form action="" onSubmit={handleSubmit} aria-required={true}>
                    <div className="w-full flex flex-col gap-4 md:gap-4 pb-4">
                        <div className="w-full">
                            <label htmlFor="fullName" className="block pb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded-[5px]"
                                id="fullName"
                                required
                                defaultValue={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="block pb-2">
                                Email
                            </label>
                            <input
                                disabled
                                type="email"
                                className="w-full border p-2 rounded-[5px] text-gray-400 border-black"
                                id="email"
                                required
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:gap-4 pb-4">
                        <div className="w-full">
                            <label htmlFor="phone" className="block pb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="w-full border p-2 rounded-[5px]"
                                id="phone"
                                required
                                defaultValue={phoneNumber}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="password" className="block pb-2">
                                Password
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                className="w-full border p-2 pr-10 rounded-[5px]"
                                id="password"
                                required
                                placeholder="Enter your password"
                                defaultValue={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!visible ? (
                                <Eye
                                    className="text-gray-500 absolute top-10 right-3 cursor-pointer"
                                    size={22}
                                    onClick={() => {
                                        setVisible(!visible);
                                    }}
                                />
                            ) : (
                                <EyeOff
                                    className="text-gray-500 absolute top-10 right-3 cursor-pointer"
                                    size={22}
                                    onClick={() => {
                                        setVisible(!visible);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <input
                            type="submit"
                            className="w-full sm:w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-4 cursor-pointer hover:border-none hover:bg-[#3a24db] hover:text-white"
                            required
                            value={loading ? "Updating..." : "Update Info"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}