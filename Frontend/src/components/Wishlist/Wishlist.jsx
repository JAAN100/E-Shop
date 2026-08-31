import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFromWishlist } from "../../redux/actions/wishlist.js";
export default function Wishlist({ setOpenWishlist }) {
    const { wishlist } = useSelector((state) => state.wishlist);

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-35 overflow-y-scroll">
            <div className="fixed top-0 right-0 min-h-full w-[80%] md:w-[50%] lg:w-[35%] bg-white flex flex-col justify-between">
                {
                    wishlist && wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                <RxCross1
                                    className="cursor-pointer hover:text-red-800"
                                    size={25} onClick={() => setOpenWishlist(false)} />
                            </div>
                            <IoBagHandleOutline size={50} />
                            <h1 className="text-[20px] font-[500] pt-5">Your wishlist is empty</h1>
                            <p className="text-[16px] text-[#00000099] pt-2">
                                You have no items in your wishlist
                            </p>
                        </div>
                    ) : (
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
                                <h5 className="pl-2 text-[20px] font-[500]">{wishlist && wishlist.length} Items</h5>
                            </div>
                            {/* Wishlist Single Item */}
                            <div className="w-full border-t">
                                {wishlist &&
                                    wishlist.map((i, index) => <WishlistSingle key={index} data={i} setOpenWishlist={setOpenWishlist} />)}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

const WishlistSingle = ({ data, setOpenWishlist }) => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addToCart(cartData));
                toast.success("Item added to cart successfully!");
                setOpenWishlist(false);
            }
        }
    }
    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data));
        toast.success("Item removed from wishlist successfully!");
    }
    return (
        <div className="border-b p-4 flex items-center relative">
            <RxCross1 className="cursor-pointer" onClick={() => removeFromWishlistHandler(data)} />
            <div className="w-full flex items-center justify-between">
                <img
                    src={`${data?.images[0]?.url}`}
                    alt=""
                    className="w-[80px] h-[80px] ml-2 mr-2"
                />
                <div>
                    <h1>{data?.productName}</h1>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${data?.discountPrice}
                    </h4>
                </div>
                <BsCartPlus size={30} className="cursor-pointer" title="Add to Cart" onClick={() => addToCartHandler(data._id)} />
            </div>

        </div>
    );
};
