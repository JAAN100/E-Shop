import React, { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ShopCreatePage() {
    const { isSeller, isLoading, shop } = useSelector((state) => state.seller);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && isSeller) {
            navigate(`/shop/${shop._id}`);
        }
    }, []);
    return (
        <div>
            <ShopCreate />
        </div>
    );
}
