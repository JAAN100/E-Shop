import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ShopLoginPage() {
    const { isSeller, isLoading, shop } = useSelector((state) => state.seller);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && isSeller) {
            navigate(`/shop/${shop._id}`);
        }
    }, []);
    return (
        <div>
            <ShopLogin />
        </div>
    );
}
