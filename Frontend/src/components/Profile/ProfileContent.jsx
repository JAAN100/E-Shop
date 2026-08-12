import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import AllOrders from "./AllOrders.jsx";
import AllRefundsOrders from "./AllRefundsOrders.jsx";
import TrackOrder from "./TrackOrder.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import Address from "./Address.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUser } from "../../redux/actions/user.js";
export default function ProfileContent({ active }) {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = React.useState(user?.fullName || "");
    const [email, setEmail] = React.useState(user?.email || "");
    const [phone, setPhone] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="w-full">
            {active === 1 && (
                <>
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            <img
                                src={user?.avatar}
                                alt={user?.fullName}
                                className="w-[150px] h-[150px] rounded-full flex items-center justify-center object-cover border-[3px] border-[#3ad132]"
                            />
                            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                <AiOutlineCamera />
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="email" className="block pb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0"
                                        id="email"
                                        required
                                        value={user?.email}
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
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="zipCode" className="block pb-2">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0"
                                        id="zipCode"
                                        required
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full block md:flex pb-3 ">
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="address1" className="block pb-2">
                                        Address 1
                                    </label>
                                    <input
                                        type="text"
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0"
                                        id="address1"
                                        required
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>
                                <div className="w-[100%] md:w-[50%]">
                                    <label htmlFor="address2" className="block pb-2">
                                        Address 2
                                    </label>
                                    <input
                                        type="text"
                                        className="w-[95%] border p-1 rounded-[5px] mb-1 md:mb-0"
                                        id="address2"
                                        required
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <input type="submit" className={`w-[250px] h-[40px] border border-[#3a24db]  text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:border-none hover:bg-[#3a24db] hover:text-white`}
                                    required
                                    value="Update"
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
                        <PaymentMethod />
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
