import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineMessage,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsForShop } from "../../redux/actions/product";
import { useEffect } from "react";
import { addToCart } from "../../redux/actions/cart.js";
import {
    removeFromWishlist,
    addToWishlist,
} from "../../redux/actions/wishlist.js";
import Rating from "../Rating/Rating.jsx";
import { toast } from "react-toastify";
export default function ProductDetails({ data }) {
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const [count, setCount] = React.useState(1);
    const [click, setClick] = React.useState(false);
    const [select, setSelect] = React.useState(0);
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProductsForShop(data?.shop?._id));
        if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist, data]);
    const navigate = useNavigate();
    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=10acwqeq");
    };
    const removeFromWishlistHandler = (data) => {
        setClick(false);
        dispatch(removeFromWishlist(data));
        toast.success("Item removed from wishlist successfully!");
    };
    const addToWishlistHandler = (data) => {
        setClick(true);
        dispatch(addToWishlist(data));
        toast.success("Item added to wishlist successfully!");
    };
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
    };
    const totalReviewsLength = () => {
        return products?.reduce((acc, product) => acc + (product.reviews?.length), 0);
    }
    const totalRatings = products?.reduce((acc, product) => acc + (product?.reviews.reduce((sum, review) => sum + (review?.rating), 0)), 0);
    const averageRating = totalRatings / totalReviewsLength() || 0;
    return (
        <div className="bg-white ">
            {data ? (
                <div className="unset mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
                    <div className="w-full py-5">
                        <div className="block w-full md:flex">
                            <div className="w-full md:w-[50%]">
                                <img
                                    src={data?.images[select]?.url}
                                    alt=""
                                    className="w-[80%]"
                                />
                                <div className="w-full flex ">
                                    {data?.images?.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer ${select === index ? "border border-black" : ""
                                                } mr-2 mt-2`}
                                            onClick={() => setSelect(index)}
                                        >
                                            <img
                                                src={image?.url}
                                                alt=""
                                                className="h-[150px] md:h-[200px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-[50%] pt-5 px-5">
                                <h1 className="text-[25px] font-[600] font-Roboto text-[#333]">
                                    {data?.productName}
                                </h1>
                                <p className="text-gray-600 font-Roboto">{data?.description}</p>
                                <div className="flex pt-3">
                                    <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                                        {data?.discountPrice}$
                                    </h4>
                                    <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                                        {data?.originalPrice ? data?.originalPrice + "$" : null}
                                    </h3>
                                </div>
                                <div className="w-full md:w[50%] pt-5 flex items-center justify-between">
                                    <div>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 rounded-l shadow-lg mt-5 hover:opacity-75 transition duration-300 ease-in-out"
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
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-3 py-2 rounded-r shadow-lg mt-5 hover:opacity-75 transition duration-300 ease-in-out"
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
                                <div
                                    className="w-[150px] bg-black h-11 my-6 flex items-center justify-center rounded-xl cursor-pointer text-[16px]"
                                    onClick={() => addToCartHandler(data._id)}
                                >
                                    <span className="text-[#fff] flex items-center">
                                        Add to cart
                                        <AiOutlineShoppingCart className="ml-1" />
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Link to={`/shop/preview/${data?.shop?._id}`}>
                                            <img
                                                src={data?.shop?.avatar}
                                                alt=""
                                                className="w-[50px] h-[50px] rounded-full mr-2"
                                            />
                                        </Link>
                                        <div>
                                            <Link to={`/shop/preview/${data?.shop?._id}`}>
                                                <h3 className="pt-3 text-[15px] text-blue-400">
                                                    {data?.shop?.shopName}
                                                </h3>
                                            </Link>
                                            <h5 className="pb-3 text-[13px] text-gray-500">
                                                ({averageRating.toFixed(0)}/5) Ratings
                                            </h5>
                                        </div>
                                    </div>
                                    <div
                                        className="w-[150px] bg-purple-600 h-[50px] my-5 flex items-center justify-center rounded-xl cursor-pointer text-[16px]"
                                        onClick={handleMessageSubmit}
                                    >
                                        <span className="text-[#fff] flex items-center">
                                            Send Message
                                            <AiOutlineMessage className="ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductDetailsInfo data={data} products={products} totalReviews={totalReviewsLength()} averageRating={averageRating.toFixed(0)} />
                    <br />
                    <br />
                </div>
            ) : null}
        </div>
    );
}

const ProductDetailsInfo = ({ data, products, totalReviews, averageRating }) => {
    const [active, setActive] = React.useState(1);
    return (
        <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded ">
            <div className="w-full flex justify-between border-b pb-2 pt-10">
                <div className="relative">
                    <h5
                        className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>
                    {active === 1 ? (
                        <div className="absolute bottom-[-27%] md:bottom-[-40%] left-0 h-[3px] w-full bg-[crimson]"></div>
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {active === 2 ? (
                        <div className="absolute bottom-[-27%] md:bottom-[-40%] left-0 h-[3px] w-full bg-[crimson]"></div>
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
                        onClick={() => setActive(3)}
                    >
                        Seller Information
                    </h5>
                    {active === 3 ? (
                        <div className="absolute bottom-[-27%] md:bottom-[-40%] left-0 h-[3px] w-full bg-[crimson]"></div>
                    ) : null}
                </div>
            </div>
            {active === 1 ? (
                <>
                    <p className="text-[18px] text-gray-600 mt-3 py-2 leading-8 pb-10 whitespace-pre-line">
                        {data?.description}
                    </p>
                </>
            ) : null}
            {active === 2 ? (
                <div className="text-gray-600 w-full items-center flex flex-col min-h-[40vh] overflow-y-auto">
                    {" "}
                    {data &&
                        data?.reviews &&
                        data?.reviews.map((item, index) => (
                            <div className="w-full my-2 border-b border-gray-300" key={index}>
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            src={item?.user?.avatar}
                                            alt=""
                                            className="w-[50px] h-[50px] rounded-full mr-2"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-[16px] font-[600] text-black">
                                            {item?.user?.fullName}
                                        </h1>
                                        {data?.ratings > 0 && <Rating ratings={item?.rating} />}
                                    </div>
                                </div>
                                <p className="text-[15px] text-gray-600 mt-2">
                                    {item?.comment}
                                </p>
                            </div>
                        ))}
                    {data?.reviews?.length === 0 && (
                        <div className="w-full my-auto flex  justify-center">
                            No Reviews Yet!
                        </div>
                    )}
                </div>
            ) : null}
            {active === 3 ? (
                <div className="w-full block md:flex p-5">
                    <div className="w-full md:w-[50%]">
                        <div className="flex items-center cursor-pointer">
                            <Link to={`/shop/preview/${data?.shop?._id}`}>
                                <img
                                    src={data?.shop?.avatar}
                                    alt=""
                                    className="W-[50px] h-[50px] rounded-full"
                                />
                            </Link>
                            <div className="pl-3">
                                <Link to={`/shop/preview/${data?.shop?._id}`}>
                                    <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                                        {data?.shop?.shopName}
                                    </h3>
                                </Link>
                                <h5 className="pb-2 text-[15px]">({averageRating}/5) Ratings</h5>
                            </div>
                        </div>
                        <p className="pt-2">{data?.shop?.description}</p>
                    </div>
                    <div className="w-full md:w-[50%] mt-5md:mt-0 md:flex flex-col items-end">
                        <div className="text-left">
                            <h5 className="font-[600] ">
                                Joined on:{" "}
                                <span className="font-[500]">
                                    {data?.shop?.createdAt.slice(0, 10)}
                                </span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total Products:{" "}
                                <span className="font-[500]">{products?.length}</span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total Reviews:{" "}
                                <span className="font-[500]">{totalReviews}</span>
                            </h5>
                            <Link to={`/shop/preview/${data?.shop?._id}`}>
                                <div className="w-[150px] bg-black my-3 flex items-center justify-center !rounded-[4px] h-[39.5px] cursor-pointer ">
                                    <h4 className="text-white">Visit Shop</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
