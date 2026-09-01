import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cart.js";
import { useDispatch } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../../../redux/actions/wishlist.js";
export default function ProductDetailsCard({ setOpen, data }) {
    const { cart } = useSelector((state) => state.cart);
    const [count, setCount] = React.useState(1);
    const [click, setClick] = React.useState(false);
    const [shopData, setShopData] = React.useState(null);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    useEffect(() => {
        if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist, data])
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
            if (data.stock < count) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addToCart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    }
    console.log(data);

    const handleMessageSubmit = () => {

    }
    return (
        <div className="bg-white">
            {data ? (
                <div className="w-full h-screen fixed top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
                    <div className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow-sm p-4 relative">
                        <RxCross1
                            size={30}
                            className="absolute right-3 top-3 z-50"
                            onClick={() => setOpen(false)}
                        />
                        <div className="block w-full md:flex">
                            <div className="w-full md:w-[40%]">
                                <img src={data?.images[0]?.url} alt={data?.productName} />
                                <div className="flex">
                                    <Link to={`/shop/preview/${data?.shop?._id}`} className="flex mt-3">
                                        <img src={data?.shop?.avatar} alt=""
                                            className="w-[50px] h-[50px] rounded-full mr-2"
                                        />
                                        <div>
                                            <h3 className="pt-3 text-[18px] text-blue-400 pb-3">
                                                {data?.shop?.shopName}
                                            </h3>

                                            <h5 className="pb-3 text-[15px] text-gray-500">
                                                ({data?.ratings}) Ratings
                                            </h5>

                                        </div>
                                    </Link>


                                </div>
                                <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-4 text-[15px]"
                                    onClick={handleMessageSubmit}
                                >
                                    <span className="text-[#fff] flex items-center">
                                        Send Message <AiOutlineMessage className="ml-1" />
                                    </span>
                                </div>
                                <h5 className="text-[16px] text-[red] mt-5">
                                    ({data?.sold_out}) Sold Out
                                </h5>

                            </div>
                            <div className="w-full md:w-[60%] px-[5px] pt-5">
                                <h1 className="text-[20px] font-[600] font-Roboto text-[#333]">
                                    {data?.productName}
                                </h1>
                                <p className="text-[15px] text-gray-500 mt-2">
                                    {data?.description}
                                </p>

                                <div className="pt-3 flex">
                                    <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                                        ${data?.discountPrice}
                                    </h4>
                                    <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">{data?.originalPrice ? data?.originalPrice + "$" : null}</h3>
                                </div>
                                <div>
                                    <div className="flex items-center mt-12 justify-between pr-3 text-[16px]">
                                        <div>
                                            <button
                                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 rounded-l shadow-lg mt-5 hover:opacity-75 transition duration-300 ease-in-out cursor-pointer"
                                                onClick={() => {
                                                    if (count > 1) {
                                                        setCount(count - 1);
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            <span className="bg-gray-200 px-4 py-2.5 mt-5 font-medium">
                                                {count}
                                            </span>
                                            <button
                                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-3 py-2 rounded-r shadow-lg mt-5 hover:opacity-75 transition duration-300 ease-in-out cursor-pointer"
                                                onClick={() => {
                                                    setCount(count + 1);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            {click ? (
                                                <AiFillHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    onClick={() => removeFromWishlistHandler(data)}
                                                    color={click ? "red" : "#444"}
                                                    title="Remove from wishlist"
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    onClick={() => addToWishlistHandler(data)}
                                                    color={click ? "red" : "#444"}
                                                    title="Add to wishlist"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-4 text-[16px]"
                                        onClick={() => addToCartHandler(data?._id)}
                                    >
                                        <span className="text-[#fff] flex items-center">
                                            Add to cart<AiOutlineShoppingCart className="ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
