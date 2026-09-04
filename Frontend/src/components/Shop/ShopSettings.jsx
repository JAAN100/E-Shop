import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EyeOff, Eye } from "lucide-react";
import { updateShopInfo } from "../../redux/actions/shop.js";
export default function ShopSettings() {
    const { shop, error, message } = useSelector((state) => state.seller);
    const [shopName, setShopName] = React.useState(shop?.shopName || "");
    const [shopEmail, setShopEmail] = React.useState(shop?.shopEmail || "");
    const [phoneNumber, setPhoneNumber] = React.useState(shop?.phoneNumber || "");
    const [shopPassword, setShopPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [description, setDescription] = React.useState(shop?.description || "");
    const [shopAddress, setShopAddress] = React.useState(shop?.shopAddress || "");
    const [zipCode, setZipCode] = React.useState(shop?.zipCode || "");
    const [avatar, setAvatar] = React.useState(shop?.avatar || "");
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
    }, [dispatch, error, message]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(updateShopInfo(shopEmail, shopPassword, phoneNumber, shopName, description, shopAddress, zipCode));
        setLoading(false);
    }
    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();
        formData.append("image", file);
        const data = await fetch("/api/shop/update-avatar", {
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
        <div className="w-[100%] bg-gray-100 h-[88vh] md:h-[89vh] overflow-y-auto  ">

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
                        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-4 pb-4">
                            <div className="w-full">
                                <label htmlFor="shopName" className="block pb-2">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded-[5px]"
                                    id="shopName"
                                    required
                                    defaultValue={shopName}
                                    onChange={(e) => setShopName(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="shopEmail" className="block pb-2">
                                    Shop Email
                                </label>
                                <input
                                    disabled
                                    type="shopEmail"
                                    className="w-full border p-2 rounded-[5px] text-gray-400 border-black"
                                    id="shopEmail"
                                    required
                                    defaultValue={shopEmail}
                                    onChange={(e) => setShopEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="shopPassword" className="block pb-2">
                                Shop Password
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                className="w-full border p-2 pr-10 rounded-[5px]"
                                id="shopPassword"
                                required
                                placeholder="Enter your password"
                                defaultValue={shopPassword}
                                onChange={(e) => setShopPassword(e.target.value)}
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
                        <div className="w-full flex flex-col gap-4 md:gap-4 pb-4 mt-4">
                            <div className="w-full">
                                <label htmlFor="description" className="block pb-2">
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    className="w-full border p-2 rounded-[5px]"
                                    id="description"
                                    rows={4}
                                    defaultValue={shop?.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-4 pb-4">
                            <div className="w-full">
                                <label htmlFor="phoneNumber" className="block pb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border p-2 rounded-[5px]"
                                    id="phoneNumber"
                                    required
                                    defaultValue={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="shopAddress" className="block pb-2">
                                    Shop Address
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border p-2 rounded-[5px]"
                                    id="shopAddress"
                                    required
                                    defaultValue={shop?.shopAddress}
                                    onChange={(e) => setShopAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-4 md:gap-4 pb-4">
                            <div className="w-full">
                                <label htmlFor="zipCode" className="block pb-2">
                                    Zip Code
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border p-2 rounded-[5px]"
                                    id="zipCode"
                                    required
                                    defaultValue={shop?.zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
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
        </div>
    )
}