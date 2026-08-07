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
export default function Product({ data }) {
    const d = data.name;
    const productName = d.replace(/\s+/g, "-");
    const [click, setClick] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div className="w-full min-h-[320px] sm:min-h-[350px] lg:h-[370px] bg-white rounded-lg p-3 relative cursor-pointer shadow flex flex-col">
                <Link to={`/product/${productName}`} className="w-full flex flex-col">
                    <img
                        src={data.image_Url[0].url}
                        alt={data.name}
                        className="w-full h-[140px] sm:h-[170px] object-contain"
                    />
                </Link>
                <Link to="/">
                    <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
                        {data.shop.name}
                    </h5>
                </Link>
                <Link to={`/product/${productName}`}>
                    <h4 className="pb-3 font-[500] line-clamp-2 text-[16px] text-gray-600">
                        {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
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
                                {data.price !== 0 ? data.discount_price : data.price} $
                            </h5>
                            <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                                {data.price ? data.price + " $" : null}
                            </h4>
                        </div>
                        <span className="font-[400] text-[17px] text-[#68d284] font-Roboto">
                            {data.total_sell} sold
                        </span>
                    </div>
                </Link>
                {/* Side Options */}
                <div>
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={() => setClick(!click)}
                            color={click ? "red" : "#444"}
                            title="Remove from wishlist"
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={() => setClick(!click)}
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
                            setOpen(!open);
                        }}
                        color="#444"
                    />
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
            </div>
        </>
    );
}
