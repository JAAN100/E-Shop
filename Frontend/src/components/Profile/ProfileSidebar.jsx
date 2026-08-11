import React from 'react'
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineCreditCard, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { toast } from 'react-toastify';
export default function ProfileSidebar({ active, setActive }) {
    const sideBar = [
        { name: "Profile", Icon: RxPerson },
        { name: "Orders", Icon: HiOutlineShoppingBag },
        { name: "Refunds", Icon: HiOutlineReceiptRefund },
        { name: "Inbox", Icon: AiOutlineMessage },
        { name: "Track Order", Icon: MdOutlineTrackChanges },
        { name: "Payment Methods", Icon: AiOutlineCreditCard },
        { name: "Address", Icon: TbAddressBook },
        { name: "Log Out", Icon: AiOutlineLogin },
    ];
    return (
        <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 relative">
            {
                sideBar.map(({ name, Icon }, index) => {
                    return (
                        <div key={index} className="flex items-center cursor-pointer w-full mb-8"
                            onClick={() => {
                                setActive(index + 1);
                            }}
                        >
                            <Icon size={20} color={active === index + 1 ? "red" : ""} />
                            <span className={`pl-3 ${active === index + 1 ? "text-[red]" : ""} md:block hidden`}>
                                {name}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
