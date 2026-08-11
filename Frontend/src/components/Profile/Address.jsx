import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
export default function Address() {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba]">
                    My Address
                </h1>
                <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-md cursor-pointer">
                    <span className="text-[#fff] text-[16px] font-[600]">Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center pl-3 pr-10 shadow justify-between">
                <div className="flex items-center">
                    <h5 className="ml-3 font-[600] ">Default</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>H - 17 , St - 5 </h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>(+92) **********</h6>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
