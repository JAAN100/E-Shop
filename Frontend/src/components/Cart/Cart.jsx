import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Cart({ setOpenCart }) {
    const cartData = [
        {
            name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
            description: "Iphone 14 pro max",
            price: 1200,
        },
        {
            name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
            description: "Iphone 14 pro max",
            price: 1200,
        },
        {
            name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
            description: "Iphone 14 pro max",
            price: 1200,
        },
    ];

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50">
            <div className="fixed top-0 right-0 h-screen w-[85%] sm:w-[400px] bg-white flex flex-col justify-between shadow-xl">
                <div className="flex-1 overflow-y-auto">
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1
                            className="cursor-pointer hover:text-red-800"
                            size={25}
                            onClick={() => setOpenCart(false)}
                        />
                    </div>
                    <div className={`${styles.normalFlex} p-4`}>
                        <IoBagHandleOutline size={26} className="sm:hidden" />
                        <IoBagHandleOutline size={30} className="hidden sm:block" />
                        <h5 className="pl-2 text-[18px] sm:text-[20px] font-[500]">
                            {cartData.length} Items
                        </h5>
                    </div>
                    {/* Cart Single Item */}
                    <div className="w-full border-t">
                        {cartData &&
                            cartData.map((i, index) => <CartSingle key={index} data={i} />)}
                    </div>
                </div>
                <div className="px-5 mb-3 pt-3 border-t bg-white">
                    {/* Checkout button */}
                    <Link to="/checkout">
                        <div className="w-full h-[45px] flex items-center justify-center bg-[#332ac8] rounded-[3px] px-2">
                            <h1 className="text-white text-[15px] sm:text-[18px] font-[600] text-center truncate">
                                Proceed to Checkout USD${cartData[0].price}
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const CartSingle = ({ data }) => {
    const [value, setValue] = React.useState(1);
    const totalPrice = data.price * value;
    return (
        <div className="border-b p-3 sm:p-4">
            <div className="w-full flex items-center">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                        className="bg-[#e44343] border border-[#e4434373] rounded-full w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => setValue(value + 1)}
                    >
                        <HiPlus size={18} className="text-white" />
                    </div>
                    <span className="py-[4px]">{value}</span>
                    <div
                        className="bg-[#8b90984f] rounded-full w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            if (value > 1) setValue(value - 1);
                        }}
                    >
                        <HiOutlineMinus size={18} className="text-white" />
                    </div>
                </div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOB2fVdlmBftAOqfrmNTemOLCrUuaCL__OwCR2Ef6_OFRoiMVQilg97Is&s=10"
                    alt=""
                    className="flex-shrink-0 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] ml-2 mr-2 object-cover"
                />
                <div className="pl-[5px] min-w-0 flex-1">
                    <h1 className="text-[13px] sm:text-[15px] line-clamp-2">{data.name}</h1>
                    <h4 className="font-[400] text-[13px] sm:text-[15px] text-[#00000082]">
                        ${data.price} * {value}
                    </h4>
                    <h3 className="font-[600] text-[15px] sm:text-[17px] text-[#d02222]">
                        US${totalPrice}
                    </h3>
                </div>
                <RxCross1 className="cursor-pointer flex-shrink-0 ml-1" />
            </div>
        </div>
    );
};