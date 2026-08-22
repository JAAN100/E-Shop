import React from "react";
import CountDown from "./CountDown.jsx";
export default function EventCard({ active, data }) {

    return (
        <div className={`w-full block bg-white ${active ? '' : 'mb-12'} rounded-lg flex p-2 flex-wrap md:flex-nowrap`}>
            <div className="w-full lg:[w-50%] m-auto flex items-center justify-center">
                <img
                    src={`${data?.images[0].url}`}
                    alt={data?.productName || "Product Image"}
                    className="w-[80%]"
                />
            </div>
            <div className="w-full lg:[w-50%] flex flex-col flex-wrap justify-center mx-4 sm:mx-8 lg:mx-16">
                <h2 className="text-[18px] sm:text-[20px] lg:text-[25px] font-[600] font-Roboto text-[#333]">
                    {data?.productName || "Product Name"}
                </h2>
                <p className="text-[13px] sm:text-[15px] lg:text-base">
                    {data?.description || "Product Description"}
                </p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[15px] sm:text-[16px] lg:text-[18px] text-[#d55b45] font-Roboto pr-3 line-through">
                            {data?.originalPrice || "Original Price"} $
                        </h5>
                        <h5 className="font-bold text-[16px] sm:text-[18px] lg:text-[20px] text-gray-600 font-Roboto">
                            {data?.discountPrice || "Discounted Price"} $
                        </h5>
                    </div>
                    <span className="pr-3 font-[400] text-[14px] sm:text-[15px] lg:text-[17px] text-[#44a55e]">
                        {data?.sold_out || "0"} sold
                    </span>
                </div>
                <CountDown data={data} />
            </div>
        </div >
    );
}