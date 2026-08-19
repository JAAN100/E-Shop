import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { AiOutlineGift } from 'react-icons/ai';
import { FiShoppingBag, FiPackage } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
export default function DashboardHeader({ activeTab }) {
    const { shop } = useSelector((state) => state.seller);

    return (
        <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
            <div className="flex-shrink-0">
                <Link to="/dashboard">
                    <img
                        className="w-40 sm:w-36 md:w-44 lg:w-60 h-auto cursor-pointer"
                        src="/gemini-svg.svg"
                        alt="HJ Shop"
                    />
                </Link>
            </div>
            <div className="flex items-center">
                <div className="flex items-center mr-4">
                    <Link to="/dashboard-coupons" className=" md:block hidden">
                        <AiOutlineGift size={30} color={activeTab === 1 ? "crimson" : "#555"} className="cursor-pointer mx-5" title="Discount Codes" />
                    </Link>
                    <Link to="/dashboard-events" className=" md:block hidden">
                        <MdOutlineLocalOffer size={30} color={activeTab === 2 ? "crimson" : "#555"} className="cursor-pointer mx-5" title="All Events" />
                    </Link>
                    <Link to="/dashboard-products" className=" md:block hidden">
                        <FiShoppingBag size={30} color={activeTab === 3 ? "crimson" : "#555"} className="cursor-pointer mx-5" title="Products" />
                    </Link>
                    <Link to="/dashboard-orders" className=" md:block hidden">
                        <FiPackage size={30} color={activeTab === 4 ? "crimson" : "#555"} className="cursor-pointer mx-5" title="Orders" />
                    </Link>
                    <Link to="/dashboard-messages" className=" md:block hidden">
                        <BiMessageSquareDetail size={30} color={activeTab === 5 ? "crimson" : "#555"} className="cursor-pointer mx-5" title="Messages" />
                    </Link>
                    <Link to={`/shop/${shop?._id}`} className="block">
                        <img src={`${shop?.avatar}`} alt={shop?.shopName} className="w-[50px] h-[50px] rounded-full object-cover" title={shop?.shopName} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
