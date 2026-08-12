import React from "react";
import CountDown from "./CountDown.jsx";
export default function EventCard({ active }) {
    return (
        <div className={`w-full block bg-white ${active ? '' : 'mb-12'} rounded-lg flex p-2 flex-wrap md:flex-nowrap`}>
            <div className="w-full lg:[w-50%] m-auto">
                <img
                    src="https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg"
                    alt=""
                    className=""
                />
            </div>
            <div className="w-full lg:[w-50%] flex flex-col flex-wrap justify-center mx-4 sm:mx-8 lg:mx-16">
                <h2 className="text-[18px] sm:text-[20px] lg:text-[25px] font-[600] font-Roboto text-[#333]">
                    Iphone 14 pro max 8/256gb
                </h2>
                <p className="text-[13px] sm:text-[15px] lg:text-base">
                    Product details are a crucial part of any eCommerce website or online
                    marketplace. These details help the potential customers to make an
                    informed decision about the product they are interested in buying. A
                    well-written product description can also be a powerful marketing tool
                    that can help to increase sales.
                </p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[15px] sm:text-[16px] lg:text-[18px] text-[#d55b45] font-Roboto pr-3 line-through">
                            1200 $
                        </h5>
                        <h5 className="font-bold text-[16px] sm:text-[18px] lg:text-[20px] text-gray-600 font-Roboto">
                            999 $
                        </h5>
                    </div>
                    <span className="pr-3 font-[400] text-[14px] sm:text-[15px] lg:text-[17px] text-[#44a55e]">
                        120 sold
                    </span>
                </div>
                <CountDown />
            </div>
        </div >
    );
}