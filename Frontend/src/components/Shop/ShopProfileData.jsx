import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsForShop } from "../../redux/actions/product";
import { getAllEventsForShop } from "../../redux/actions/event.js";
import styles from "../../styles/styles";
import Product from "../Route/ProductCard/Product";
import Rating from "../Rating/Rating";
const ShopProfileData = ({ isOwner }) => {
    const { products } = useSelector((state) => state.products);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const { shop } = useSelector((state) => state.seller);
    useEffect(() => {
        dispatch(getAllEventsForShop(shop._id));
        dispatch(getAllProductsForShop(id));
    }, [dispatch, shop]);
    const allReviews = products && products.map((item) => item.reviews).flat();
    console.log(events);

    const [active, setActive] = useState(1);
    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="w-full flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-0">
                    <div className="flex items-center" onClick={() => setActive(1)}>
                        <h5
                            className={`font-[600] text-[16px] sm:text-[18px] md:text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"
                                } cursor-pointer sm:pr-[20px]`}
                        >
                            Shop Products
                        </h5>
                    </div>
                    <div className="flex items-center" onClick={() => setActive(2)}>
                        <h5
                            className={`font-[600] text-[16px] sm:text-[18px] md:text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"
                                } cursor-pointer sm:pr-[20px]`}
                        >
                            Running Events
                        </h5>
                    </div>

                    <div className="flex items-center" onClick={() => setActive(3)}>
                        <h5
                            className={`font-[600] text-[16px] sm:text-[18px] md:text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"
                                } cursor-pointer sm:pr-[20px]`}
                        >
                            Shop Reviews
                        </h5>
                    </div>
                </div>
                <div className="shrink-0">
                    {
                        isOwner && (
                            <div>
                                <Link to="/dashboard">
                                    <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                                        <span className="text-[#fff]">Go Dashboard</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

            <br />
            {
                active === 1 && (
                    <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                        {
                            products &&
                            products.map((i, index) => (
                                <Product data={i} key={index} isShop={true} />
                            ))
                        }
                    </div>
                )
            }
            {active === 1 && (
                products && products.length === 0 && (
                    <h5 className="w-full text-center py-5 text-[18px]">
                        No Products have for this shop!
                    </h5>
                )
            )}
            {
                active === 2 && (
                    <div className="w-full">
                        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                            {
                                events &&
                                events.map((i, index) => (
                                    <Product data={i} key={index} isShop={true} isEvent={true} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
            {
                active === 3 && (
                    <div className="w-full">
                        {
                            allReviews.map((item, index) => (
                                <div key={index} className="w-full flex my-4  items-center border-b pb-5 border-gray-300">
                                    <img src={item?.user?.avatar} alt="" className="w-10 h-10 rounded-full" />
                                    <div className="pl-2">
                                        <div className="flex items-center w-full">
                                            <h1 className="font-semibold mr-2">{item?.user?.fullName}</h1>
                                            <Rating ratings={item?.rating} />
                                        </div>
                                        <p className="text-gray-700">{item?.comment}</p>
                                        <p className="text-gray-400 text-[13px]">{item?.createdAt || "2 Days ago"}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

        </div>
    );
};

export default ShopProfileData;