import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getAllProductsForShop } from '../../redux/actions/product'
import Loader from '../Layout/Loader'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function ShopInfo({ isOwner }) {
    const [shop, setShop] = useState({});
    const { products } = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllProductsForShop(id));
        axios.get(`/api/shop/get-shopByID/${id}`).then((res) => {
            setShop(res.data.shop);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
        })
    }, [dispatch, id])

    const logoutHandler = async () => {
        try {
            const res = await fetch("/api/shop/logout-shop", {
                method: "POST",
                credentials: "include"
            });
            const response = await res.json();
            if (response.success) {
                toast.success(response.message);
                await dispatch({ type: "ResetShop" });
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const totalReviewsLength = () => {
        return products?.reduce((acc, product) => acc + (product.reviews?.length || 0), 0);
    }
    const totalRatings = products?.reduce((acc, product) => acc + (product?.reviews.reduce((sum, review) => sum + (review?.rating), 0)), 0);
    const averageRating = totalRatings / totalReviewsLength() || 0;
    return (
        <>
            {
                isLoading ?
                    <div className="w-full h-[50vh] flex items-center justify-center">
                        <Loader />
                    </div>
                    : (
                        <div>
                            <div className="w-full py-5">
                                <div className="w-full flex items-center justify-center">
                                    <div className="relative">
                                        <img src={shop?.avatar} alt={shop?.shopName} className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] object-cover rounded-full" />
                                        <button
                                            type="button"
                                            onClick={() => setExpanded((e) => !e)}
                                            aria-expanded={expanded}
                                            aria-label={expanded ? "Hide shop details" : "Show shop details"}
                                            className="lg:hidden absolute bottom-0 right-0 w-8 h-8 rounded bg-white shadow-md border border-[#eee] flex items-center justify-center"
                                        >
                                            <ChevronDown
                                                size={16}
                                                className={`text-[#555] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-center py-2 text-[18px] sm:text-[20px] font-semibold">
                                    {shop?.shopName}
                                </h3>
                                <p className="flex text-center text-[15px] sm:text-[16px] p-[10px] text-[#555]">
                                    {shop?.description}
                                </p>
                            </div>

                            <div className={`${expanded ? "block" : "hidden"} lg:block`}>
                                <div className="p-3 gap-1">
                                    <h5 className="font-[600]">
                                        Address:
                                    </h5>
                                    <h4 className="text-[16px] text-[#555] break-words">
                                        {shop?.shopAddress}
                                    </h4>
                                </div>
                                <div className="p-3 gap-1">
                                    <h5 className="font-[600]">
                                        Phone Number:
                                    </h5>
                                    <h4 className="text-[16px] text-[#555]">
                                        {shop?.phoneNumber}
                                    </h4>
                                </div>
                                <div className="p-3 gap-1">
                                    <h5 className="font-[600]">
                                        Total Products:
                                    </h5>
                                    <h4 className="text-[16px] text-[#555]">
                                        {products?.length || 0}
                                    </h4>
                                </div>
                                <div className="p-3 gap-1">
                                    <h5 className="font-[600]">
                                        Shop Rating:
                                    </h5>
                                    <h4 className="text-[16px] text-[#555]">
                                        {averageRating.toFixed(0)}/5
                                    </h4>
                                </div>
                                <div className="p-3 gap-1">
                                    <h5 className="font-[600]">
                                        Joined On:
                                    </h5>
                                    <h4 className="text-[16px] text-[#555]">
                                        {shop?.createdAt?.slice(0, 10)}
                                    </h4>
                                </div>
                                {
                                    isOwner && (
                                        <div className="py-3 px-4">
                                            <Link to="/dashboard-settings">
                                                <button className="w-full bg-black h-[42px] my-3 flex items-center justify-center rounded-[5px] cursor-pointer">
                                                    <span className="text-[#fff] text-[16px] font-[600]">
                                                        Edit Shop
                                                    </span>
                                                </button>
                                            </Link>
                                            <button className="w-full bg-red-600 h-[42px] my-3 flex items-center justify-center rounded-[5px] cursor-pointer"
                                                onClick={() => setLogout(true)}
                                            >
                                                <span className="text-[#fff] text-[16px] font-[600]">
                                                    Logout
                                                </span>
                                            </button>
                                            {
                                                logout && (
                                                    <div className="w-full h-screen fixed top-0 left-0 bg-[#0000004b] z-[999] flex items-center justify-center px-4">
                                                        <div className="w-full max-w-[400px] bg-[#fff] rounded-[4px] shadow-sm flex flex-col items-center justify-center py-6 px-5">
                                                            <h3 className="text-[18px] sm:text-[20px] font-[600] text-center">
                                                                Are you sure you want to logout?
                                                            </h3>
                                                            <div className="w-full flex items-center justify-center gap-4 mt-5">
                                                                <button className="w-[100px] h-[40px] bg-red-600 text-[#fff] rounded-[4px] flex items-center justify-center"
                                                                    onClick={logoutHandler}
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button className="w-[100px] h-[40px] bg-[#00000085] text-[#fff] rounded-[4px] flex items-center justify-center"
                                                                    onClick={() => setLogout(false)}
                                                                >
                                                                    No
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
            }
        </>
    )
}