import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
export default function ProductDetailsCard({ setOpen, data }) {
    const [count, setCount] = React.useState(1);
    const [click, setClick] = React.useState(false);
    // [select, setSelect] = React.useState(false);
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
                                <img src={data.image_Url[0].url} alt={data.name} />
                                <div className="flex">
                                    <img src={data.shop.shop_avatar.url} alt=""
                                        className="w-[50px] h-[50px] rounded-full mr-2"
                                    />
                                    <div>
                                        <h3 className="pt-3 text-[18px] text-blue-400 pb-3">
                                            {data.shop.name}
                                        </h3>
                                        <h5 className="pb-3 text-[15px] text-gray-500">
                                            ({data.shop.ratings}) Ratings
                                        </h5>
                                    </div>

                                </div>
                                <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-4 text-[15px]"
                                    onClick={handleMessageSubmit}
                                >
                                    <span className="text-[#fff] flex items-center">
                                        Send Message <AiOutlineMessage className="ml-1" />
                                    </span>
                                </div>
                                <h5 className="text-[16px] text-[red] mt-5">
                                    ({data.total_sell}) Sold Out
                                </h5>

                            </div>
                            <div className="w-full md:w-[60%] px-[5px] pt-5">
                                <h1 className="text-[20px] font-[600] font-Roboto text-[#333]">
                                    {data.name}
                                </h1>
                                <p className="text-[15px] text-gray-500 mt-2">
                                    {data.description}
                                </p>

                                <div className="pt-3 flex">
                                    <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                                        ${data.discount_price}
                                    </h4>
                                    <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">{data.price ? data.price + "$" : null}</h3>
                                </div>
                                <div>
                                    <div className="flex items-center mt-12 justify-between pr-3 text-[16px]">
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
                                                    onClick={() => setClick(!click)}
                                                    color={click ? "red" : "#444"}
                                                    title="Remove from wishlist"
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    onClick={() => setClick(!click)}
                                                    color={click ? "red" : "#444"}
                                                    title="Add to wishlist"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-4 text-[16px]"
                                        onClick={handleMessageSubmit}
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
