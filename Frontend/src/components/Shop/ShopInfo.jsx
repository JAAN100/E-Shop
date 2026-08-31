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

export default function ShopInfo({ isOwner }) {
    const [shop, setShop] = useState({});
    const { products } = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                                    <img src={shop?.avatar} alt={shop?.shopName} className="w-[150px] h-[150px] object-cover rounded-full" />
                                </div>
                                <h3 className="text-center py-2 text-[20px] font-semibold">
                                    {shop?.shopName}
                                </h3>
                                <p className="flex text-center text-[16px] p-[10px] text-[#555]">
                                    {shop?.description}
                                </p>
                            </div>
                            <div className="p-3 gap-1">
                                <h5 className="font-[600]">
                                    Address:
                                </h5>
                                <h4 className="text-[16px] text-[#555]">
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
                                    4/5
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
                                        <button className="w-full bg-black h-[42px] my-3 flex items-center justify-center rounded-[5px] cursor-pointer">
                                            <span className="text-[#fff] text-[16px] font-[600]">
                                                Edit Shop
                                            </span>
                                        </button>
                                        <button className="w-full bg-red-600 h-[42px] my-3 flex items-center justify-center rounded-[5px] cursor-pointer"
                                            onClick={logoutHandler}
                                        >
                                            <span className="text-[#fff] text-[16px] font-[600]">
                                                Logout
                                            </span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    )
            }
        </>
    )
}
