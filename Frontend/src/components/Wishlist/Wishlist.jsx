import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
export default function Wishlist({ setOpenWishlist }) {
    const wishlistData = [
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
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-35">
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1
                            className="cursor-pointer hover:text-red-800"
                            size={25}
                            onClick={() => setOpenWishlist(false)}
                        />
                    </div>
                    <div className={`${styles.normalFlex} p-4`}>
                        <AiOutlineHeart size={30} />
                        <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
                    </div>
                    {/* Wishlist Single Item */}
                    <div className="w-full border-t">
                        {wishlistData &&
                            wishlistData.map((i, index) => <WishlistSingle key={index} data={i} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

const WishlistSingle = ({ data }) => {
    return (
        <div className="border-b p-4">
            <div className="w-full- flex items-center">
                <RxCross1 className="cursor-pointer" />
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOB2fVdlmBftAOqfrmNTemOLCrUuaCL__OwCR2Ef6_OFRoiMVQilg97Is&s=10"
                    alt=""
                    className="w-[80px] h-[80px] ml-2 mr-2"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${data.price}
                    </h4>
                </div>
                <BsCartPlus size={30} className="cursor-pointer" title="Add to Cart" />
            </div>

        </div>
    );
};
