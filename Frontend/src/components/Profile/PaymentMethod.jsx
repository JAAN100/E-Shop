import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
export default function PaymentMethod() {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba]">
                    Payment Methods
                </h1>
                <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-md cursor-pointer">
                    <span className="text-[#fff] text-[16px] font-[600]">Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center pl-3 pr-10 shadow justify-between">
                <div className="flex items-center">
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-visa-logo-icon-svg-download-png-675739.png"
                        alt="Visa"
                        className="h-6 w-auto"
                    />
                    <h5 className="ml-3 font-[600] ">Hassan Jaan</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>1234 **** *** ****</h6>
                    <h5 className="pl-5">08/2022</h5>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
