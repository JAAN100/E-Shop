import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ShopLoginPage() {
    const { isSeller, isLoading } = useSelector((state) => state.seller);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && isSeller) {
            navigate(`/dashboard`);
        }
    }, [isLoading, isSeller]);
    return (
        <div>
            <ShopLogin />
        </div>
    );
}
