import React from 'react'
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { useDispatch } from "react-redux";
import { userUpdateAddress } from "../../redux/actions/user.js";
import { Fragment } from "react";
import { userDeleteAddress } from "../../redux/actions/user.js"
export default function Address() {
    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = React.useState(false);
    const [country, setCountry] = React.useState("");
    const [city, setCity] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const [addressType, setAddressType] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const addressTypeData = [
        {
            name: "Default",
        }, {
            name: "Home",
        }, {
            name: "Office",
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addressType === "" || country === "" || city === "" || zipCode === "" || address1 === "") {
            toast.error("Please fill all the fields");
            return;
        } else {
            setLoading(true);
            dispatch(userUpdateAddress(address1, address2, city, country, zipCode, addressType)).then(() => {
                setLoading(false);
                setOpen(false);
                setCountry("");
                setCity("");
                setZipCode("");
                setAddress1("");
                setAddress2("");
                setAddressType("");
            });
            toast.success("Address updated successfully", {
                toastId: "address-update-success",
            });
        }

    }
    const handleDeleteAddress = (item) => {
        dispatch(userDeleteAddress(item._id));
    }
    return (
        <div className="w-full px-3 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-[20px] sm:text-[25px] font-[600] text-[#000000ba]">
                    Address
                </h1>
                <div className="w-full sm:w-[150px] bg-black h-[45px] sm:h-[50px] my-1 sm:my-3 flex items-center justify-center rounded-md cursor-pointer" onClick={() => setOpen(true)}>
                    <span className="text-[#fff] text-[14px] sm:text-[16px] font-[600]">Add New</span>
                </div>
                {
                    open && (
                        <div className="fixed w-full h-[100vh] top-0 left-0 flex items-center justify-center bg-[#00000050] z-50">
                            <div className="w-[90%] md:w-[50%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
                                <div className="w-full flex items-center justify-end p-3">
                                    <RxCross1 size={25} onClick={() => setOpen(false)} className='cursor-pointer hover:text-red-700' />
                                </div>
                                <h1 className="text-center text-[25px] font-Poppins">
                                    Add New Address
                                </h1>
                                <div className='w-full'>
                                    <form aria-required onSubmit={handleSubmit} className="w-full">
                                        <div className="w-full block p-4">
                                            <div className="w-full pb-2">
                                                <label className="block pb-2">Country</label>
                                                <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-300  h-[35px] rounded px-2">
                                                    <option value="" className='block pb-2'>Select your Country</option>
                                                    {
                                                        Country && Country.getAllCountries().map((item) => (
                                                            <option className="block pb-2" value={item.isoCode} key={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="w-full pb-2">
                                                <label className="block pb-2">City</label>
                                                <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-300 h-[35px] rounded px-2">
                                                    <option value="" className='block pb-2'>Select your City</option>
                                                    {
                                                        State && State.getStatesOfCountry(country).map((item) => (
                                                            <option className="block pb-2" value={item.isoCode} key={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="w-full pb-2">
                                                <label className="block pb-2">Address 1</label>
                                                <input type="address" value={address1} placeholder="Enter your address line 1" onChange={(e) => setAddress1(e.target.value)} className="w-full border border-gray-300 h-[35px] rounded px-2" />
                                            </div>
                                            <div className="w-full pb-2">
                                                <label className="block pb-2">Address 2</label>
                                                <input type="address" value={address2} placeholder="Enter your address line 2" onChange={(e) => setAddress2(e.target.value)} className="w-full border border-gray-300 h-[35px] rounded px-2" />
                                            </div>
                                            <div className="w-full pb-2">
                                                <label className="block pb-2">Address Type</label>
                                                <select name="" id="" value={addressType} onChange={(e) => setAddressType(e.target.value)} className="w-full border border-gray-300 h-[35px] rounded px-2">
                                                    <option value="" className='block pb-2'>Select Address Type</option>
                                                    {
                                                        addressTypeData && addressTypeData.map((item, index) => (
                                                            <option className="block pb-2" value={item.name} key={index}>
                                                                {item.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div className="w-full pb-2">
                                                <label className="block pb-2">Zip Code</label>
                                                <input type="number" value={zipCode} placeholder="Enter your zip code" onChange={(e) => setZipCode(Number(e.target.value) > 0 ? Number(e.target.value) : "")} className="w-full border border-gray-300 h-[35px] rounded px-2" />
                                            </div>
                                            <div className="w-[50%] flex items-center justify-center mt-5 mx-auto">
                                                <input type="submit" value={`${loading ? "Updating..." : "Update Address"}`} className="w-full bg-blue-800 h-[40px] rounded text-white cursor-pointer" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <br />
            <div className="w-full flex flex-col gap-3">
                {
                    user && user?.addresses && user?.addresses.length > 0 && user?.addresses.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-white rounded-[4px] shadow flex items-center flex-nowrap justify-between gap-2 md:gap-5 p-4"
                        >
                            <div className="flex items-center min-w-0 shrink-0">
                                <h5 className="ml-2 md:ml-3 font-[600] truncate text-[13px] md:text-[15px]">
                                    {item?.addressType}
                                </h5>
                            </div>

                            <div className="flex items-center min-w-0 flex-1 gap-2 md:gap-5 pl-2 md:pl-8 overflow-hidden">
                                <h6 className="text-[12px] sm:text-[13px] md:text-base truncate">
                                    {item?.address1}{item?.address2 ? `, ${item?.address2}` : ""}
                                </h6>
                                <h5 className="text-[12px] sm:text-[13px] md:text-base shrink-0 pl-2 md:pl-5">
                                    {user?.phoneNumber}
                                </h5>
                            </div>

                            <div className="flex items-center shrink-0 pl-2 md:pl-8">
                                <span className="cursor-pointer text-[16px] md:text-[22px]">
                                    <AiOutlineDelete onClick={() => handleDeleteAddress(item)} />
                                </span>
                            </div>
                        </div>
                    ))
                }
                {
                    user && user?.addresses && user?.addresses.length === 0 && (
                        <h5 className="w-full text-center py-5 text-[18px]">
                            No Address Found!
                        </h5>
                    )
                }
            </div>
        </div>
    );
}
