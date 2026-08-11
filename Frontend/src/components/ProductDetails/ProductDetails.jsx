import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineMessage,
} from "react-icons/ai";
import { Link } from "react-router-dom";
export default function ProductDetails({ data }) {
    const [count, setCount] = React.useState(1);
    const [click, setClick] = React.useState(false);
    const [select, setSelect] = React.useState(1);
    const navigate = useNavigate();
    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=10acwqeq");
    };
    return (
        <div className="bg-white ">
            {data ? (
                <div className="unset mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
                    <div className="w-full py-5">
                        <div className="block w-full md:flex">
                            <div className="w-full md:w-[50%]">
                                <img
                                    src={data.image_Url[select].url}
                                    alt=""
                                    className="w-[80%]"
                                />
                                <div className="w-full flex">
                                    <div
                                        className={`${select === 0 ? "border" : null} cursor-pointer`}
                                    >
                                        <img
                                            src={data.image_Url[0].url}
                                            alt=""
                                            className="h-[150px] md:h-[200px]"
                                            onClick={() => setSelect(0)}
                                        />
                                    </div>
                                    <div
                                        className={`${select === 1 ? "border" : null} cursor-pointer`}
                                    >
                                        <img
                                            src={data.image_Url[1].url}
                                            alt=""
                                            className="h-[150px] md:h-[200px]"
                                            onClick={() => setSelect(1)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-[50%] pt-5 px-5">
                                <h1 className="text-[25px] font-[600] font-Roboto text-[#333]">
                                    {data.name}
                                </h1>
                                <p className="text-gray-600 font-Roboto">{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                                        {data.discount_price}$
                                    </h4>
                                    <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                                        {data.price ? data.price + "$" : null}
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
                                <div
                                    className="w-[150px] bg-black h-11 my-6 flex items-center justify-center rounded-xl cursor-pointer text-[16px]"
                                    onClick={handleMessageSubmit}
                                >
                                    <span className="text-[#fff] flex items-center">
                                        Add to cart
                                        <AiOutlineShoppingCart className="ml-1" />
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={data.shop.shop_avatar.url}
                                            alt=""
                                            className="w-[50px] h-[50px] rounded-full mr-2"
                                        />
                                        <div>
                                            <h3 className="pt-3 text-[15px] text-blue-400">
                                                {data.shop.name}
                                            </h3>
                                            <h5 className="pb-3 text-[13px] text-gray-500">
                                                ({data.shop.ratings}) Ratings
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
                    <ProductDetailsInfo data={data} />
                    <br />
                    <br />
                </div>
            ) : null}
        </div>
    );
}

const ProductDetailsInfo = ({ data }) => {
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
                        Wireless Bluetooth headphones are designed to provide a convenient
                        and high-quality audio experience without the need for cables. They
                        feature advanced Bluetooth technology for a fast and stable
                        connection with smartphones, tablets, laptops, and other compatible
                        devices. These headphones deliver clear sound with deep bass and
                        balanced treble, making them ideal for music, movies, gaming, and
                        phone calls. The lightweight and ergonomic design ensures comfort
                        during long listening sessions. Soft ear cushions reduce pressure on
                        the ears and improve noise isolation. A built-in rechargeable
                        battery provides several hours of continuous playback on a single
                        charge. The integrated microphone allows users to make hands-free
                        calls with clear voice quality. Easy-to-use control buttons let
                        users adjust volume, skip tracks, and answer calls effortlessly.
                        Many models also include noise-canceling features for an immersive
                        listening experience. They are foldable and portable, making them
                        easy to carry while traveling. Overall, wireless Bluetooth
                        headphones combine comfort, style, durability, and excellent sound
                        performance, making them a reliable choice for everyday use.
                    </p>
                </>
            ) : null}
            {active === 2 ? (
                <div className="text-gray-600 w-full justify-center items-center flex min-h-[40vh]">
                    <p>No Reviews yet!</p>
                </div>
            ) : null}
            {active === 3 ? (
                <div className="w-full block md:flex p-5">
                    <div className="w-full md:w-[50%]">
                        <div className="flex items-center">
                            <img
                                src={data.shop.shop_avatar.url}
                                alt=""
                                className="W-[50px] h-[50px] rounded-full"
                            />
                            <div className="pl-3">
                                <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                                    {data.shop.name}
                                </h3>
                                <h5 className="pb-2 text-[15px]">
                                    ({data.shop.ratings}) Ratings
                                </h5>
                            </div>
                        </div>
                        <p className="pt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                            officia. Natus voluptates, necessitatibus ex nisi eum sint nam
                            itaque temporibus, inventore ad ab aliquid repellendus laudantium
                            amet minima nesciunt? Quasi.
                        </p>
                    </div>
                    <div className="w-full md:w-[50%] mt-5md:mt-0 md:flex flex-col items-end">
                        <div className="text-left">
                            <h5 className="font-[600] ">
                                Joined on: <span className="font-[500]">10 August, 2026</span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total Products: <span className="font-[500]">1,100</span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total Reviews: <span className="font-[500]">324</span>
                            </h5>
                            <Link to="/">
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
