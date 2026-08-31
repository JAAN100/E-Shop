import React from "react";
import { Link } from "react-router-dom";
import {
    AiFillStar,
    AiOutlineStar,
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineEye,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "../../Route/ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../../../redux/actions/wishlist.js";
import { addToCart } from "../../../redux/actions/cart.js";
import { toast } from "react-toastify";
export default function Product({ data }) {
    const { cart } = useSelector((state) => state.cart);
    const [click, setClick] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist])
    const removeFromWishlistHandler = (data) => {
        setClick(false);
        dispatch(removeFromWishlist(data));
        toast.success("Item removed from wishlist successfully!");
    }
    const addToWishlistHandler = (data) => {
        setClick(true);
        dispatch(addToWishlist(data));
        toast.success("Item added to wishlist successfully!");
    }
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
            }
        }
    }
    return (
        <>
            <div className="w-full min-h-[320px] sm:min-h-[350px] lg:h-[370px] bg-white rounded-lg p-3 relative cursor-pointer shadow flex flex-col">
                <Link to={`/product/${data._id}`} className="w-full flex flex-col">
                    <img
                        src={data?.images[0].url}
                        alt={data?.productName}
                        className="w-full h-[140px] sm:h-[170px] object-contain"
                    />
                </Link>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
                        {data?.shop?.shopName}
                    </h5>
                </Link>
                <Link to={`/product/${data._id}`}>
                    <h4 className="pb-3 font-[500] line-clamp-2 text-[16px] text-gray-600">
                        {data?.productName?.length > 40 ? data?.productName.slice(0, 40) + "..." : data?.productName}
                    </h4>
                    <div className="flex ">
                        <AiFillStar
                            size={20}
                            className="mr-2 cursor-pointer"
                            color="#F6BA00"
                        />
                        <AiFillStar
                            size={20}
                            className="mr-2 cursor-pointer"
                            color="#F6BA00"
                        />
                        <AiFillStar
                            size={20}
                            className="mr-2 cursor-pointer"
                            color="#F6BA00"
                        />
                        <AiFillStar
                            size={20}
                            className="mr-2 cursor-pointer"
                            color="#F6BA00"
                        />
                        <AiOutlineStar
                            size={20}
                            className="mr-2 cursor-pointer"
                            color="#F6BA00"
                        />
                    </div>

                    <div className="py-2 flex items-center justify-between">
                        <div className="flex">
                            <h5 className="font-bold text-[18px] text-gray-700 font-Roboto">
                                {data?.discountPrice !== 0 ? data?.discountPrice : data.price} $
                            </h5>
                            <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                                {data.originalPrice ? data.originalPrice + " $" : null}
                            </h4>
                        </div>
                        <span className="font-[400] text-[17px] text-[#68d284] font-Roboto">
                            {data?.sold_out} sold
                        </span>
                    </div>
                </Link>
                {/* Side Options */}
                <div>
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={() => {
                                removeFromWishlistHandler(data);
                            }}
                            color={click ? "red" : "#444"}
                            title="Remove from wishlist"
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={() => addToWishlistHandler(data)}
                            color={click ? "red" : "#444"}
                            title="Add to wishlist"
                        />
                    )}
                    <AiOutlineEye
                        size={22}
                        className="cursor-pointer absolute right-2 top-14"
                        title="Quick view"
                        onClick={() => {
                            setOpen(!open);
                        }}
                        color="#444"
                    />
                    <AiOutlineShoppingCart
                        size={22}
                        className="cursor-pointer absolute right-2 top-23"
                        title="Add to cart"
                        onClick={() => {
                            addToCartHandler(data._id);
                        }}
                        color="#444"
                    />
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
            </div>
        </>
    );
}
