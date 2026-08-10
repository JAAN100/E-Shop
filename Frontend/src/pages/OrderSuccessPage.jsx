import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useLottie } from "lottie-react";
import animationData from "../assets/animations/107043-success.json";

const OrderSuccessPage = () => {
    return (
        <div>
            <Header />
            <Success />
            <Footer />
        </div>
    );
};

const Success = () => {
    const { View } = useLottie({
        animationData,
        loop: false,
        autoplay: true,
        style: { width: 300, height: 300, margin: "0 auto" },
    });

    return (
        <div>
            {View}
            <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                Your order is successful 😍
            </h5>
        </div>
    );
};
export default OrderSuccessPage;
