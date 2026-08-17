import React from "react";
import Product from "../Route/ProductCard/Product.jsx";
import { productData } from "../../static/data.jsx";
import { Link } from "react-router-dom";
export default function ShopProfileData({ isOwner }) {
    const [active, setActive] = React.useState(1);
    return (
        <div className="w-full">
            <div className="md:flex w-full items-center justify-between">
                <div className="flex items-center w-full">
                    <div className="flex items-center">
                        <h5
                            className={`${active === 1 ? "text-red-500" : "text-[#333]"} font-[600] text-[16px] md:text-[20px] cursor-pointer pr-[20px]`}
                            onClick={() => setActive(1)}
                        >
                            Shop Products
                        </h5>
                    </div>
                    <div className="flex items-center">
                        <h5
                            className={`${active === 2 ? "text-red-500" : "text-[#333]"} font-[600] text-[16px] md:text-[20px] cursor-pointer pr-[20px]`}
                            onClick={() => setActive(2)}
                        >
                            Running Events
                        </h5>
                    </div>
                    <div className="flex items-center">
                        <h5
                            className={`${active === 3 ? "text-red-500" : "text-[#333]"} font-[600] text-[16px] md:text-[20px] cursor-pointer pr-[20px]`}
                            onClick={() => setActive(3)}
                        >
                            Shop Reviews
                        </h5>
                    </div>
                </div>
                <div>
                    {
                        isOwner && (
                            <Link to="/dashboard">
                                <div className="w-[100px] md:w-[150px] bg-black h-[40px] md:h-[50px] my-3 flex items-center justify-center rounded-lg md:rounded-xl cursor-pointer">
                                    <span className="text-[#fff] text-[12px] md:text-[16px] font-[600]">
                                        Go to Dashboard
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                {productData && productData.map((i, index) => {
                    return <Product data={i} key={index} isShop={true} />
                })}
            </div>
        </div>
    );
}
