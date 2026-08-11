import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
export default function PaymentMethod() {
    return (
        <div className="w-full px-3 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-[20px] sm:text-[25px] font-[600] text-[#000000ba]">
                    Payment Methods
                </h1>
                <div className="w-full sm:w-[150px] bg-black h-[45px] sm:h-[50px] my-1 sm:my-3 flex items-center justify-center rounded-md cursor-pointer">
                    <span className="text-[#fff] text-[14px] sm:text-[16px] font-[600]">Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white rounded-[4px] flex flex-col gap-3 p-3 sm:h-[70px] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pl-3 sm:pr-10 sm:py-0 shadow">
                <div className="flex items-center min-w-0">
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-visa-logo-icon-svg-download-png-675739.png"
                        alt="Visa"
                        className="h-6 w-auto shrink-0"
                    />
                    <h5 className="ml-3 font-[600] truncate">Hassan Jaan</h5>
                </div>
                <div className="flex items-center justify-between sm:justify-start sm:pl-8">
                    <h6 className="text-[13px] sm:text-base">1234 **** *** ****</h6>
                    <h5 className="pl-5 text-[13px] sm:text-base">08/2022</h5>
                </div>
                <div className="flex items-center justify-end sm:min-w-[10%] sm:justify-between sm:pl-8">
                    <AiOutlineDelete size={22} className="cursor-pointer sm:hidden" />
                    <AiOutlineDelete size={25} className="cursor-pointer hidden sm:block" />
                </div>
            </div>
        </div>
    );
}