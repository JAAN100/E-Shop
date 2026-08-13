import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user.js";
import styles from "../../styles/styles";
import { UserCircle } from "lucide-react";
export default function ShopCreate() {
    const dispatch = useDispatch();
    const [shopEmail, setShopEmail] = useState("");
    const [shopPassword, setShopPassword] = useState("");
    const [shopName, setShopName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [shopAddress, setShopAddress] = useState("");
    const [zipCode, setZipCode] = useState();
    const [avatar, setAvatar] = useState(null);

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("shopName", shopName);
            formData.append("shopEmail", shopEmail);
            formData.append("shopPassword", shopPassword);
            formData.append("shopAddress", shopAddress);
            formData.append("phoneNumber", phoneNumber);
            formData.append("zipCode", zipCode);
            if (avatar) {
                formData.append("image", avatar);
            }

            const response = await fetch("/api/shop/create-shop", {
                method: "POST",
                body: formData,
            });
            setLoading(false);
            const data = await response.json();

            if (data.success === true) {
                toast.success(data.message);
                navigate("/shop-login");
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register Your Shop
                </h1>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm-px-10 mx-3">
                    <form onSubmit={handleFormSubmit} className="space-y-6 px-4">

                        <div>
                            <label
                                htmlFor="shopName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Shop Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="shopName"
                                    id="shopName"
                                    autoComplete="shopName"
                                    required
                                    value={shopName}
                                    onChange={(e) => setShopName(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your Shop Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="shopEmail"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Shop Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="shopEmail"
                                    id="shopEmail"
                                    autoComplete="shopEmail"
                                    required
                                    value={shopEmail}
                                    onChange={(e) => setShopEmail(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your Email"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="shopPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Shop Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="shopPassword"
                                    id="shopPassword"
                                    autoComplete="current-password"
                                    required
                                    value={shopPassword}
                                    onChange={(e) => setShopPassword(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Shop Password"
                                />
                                {!visible ? (
                                    <Eye
                                        className="text-gray-500 absolute top-2 right-2 cursor-pointer"
                                        size={25}
                                        onClick={() => {
                                            setVisible(!visible);
                                        }}
                                    />
                                ) : (
                                    <EyeOff
                                        className="text-gray-500 absolute top-2 right-2 cursor-pointer"
                                        size={25}
                                        onClick={() => {
                                            setVisible(!visible);
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    autoComplete="phoneNumber"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your Phone Number"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="shopAddress"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Shop Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="shopAddress"
                                    id="shopAddress"
                                    autoComplete="shopAddress"
                                    required
                                    value={shopAddress}
                                    onChange={(e) => setShopAddress(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your Shop Address"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="zipCode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Zip Code
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="zipCode"
                                    id="zipCode"
                                    autoComplete="zipCode"
                                    required
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your Zip Code"
                                />
                            </div>
                        </div>

                        <div className={`${styles.normalFlex}`}>
                            <div className="mt-2 flex items-center ">
                                <span className="h-8 w-8 rounded-full overflow-hidden">
                                    {avatar ? (
                                        <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <UserCircle size={23} className="mr-3" />
                                    )}
                                </span>
                                <label
                                    htmlFor="file-input"
                                    className="ml-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white cursor-pointer"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        id="file-input"
                                        name="avatar"
                                        onChange={handleFileInputChange}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="font-semibold uppercase w-full bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:opacity-85">
                            {loading ? <LoaderCircle size={23} className="animate-spin mx-auto" /> : "Create Your Shop"}
                        </button>
                    </form>
                    <div className={`${styles.normalFlex} w-full mt-5 px-5`} >
                        <p className="text-gray-500 text-md">Already have an account?</p>
                        <Link to={"/shop-login"} className="text-sm ml-2 text-blue-600 hover:opacity-70">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
