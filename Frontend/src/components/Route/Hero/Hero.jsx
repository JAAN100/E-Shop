import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <div
            className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat pt-[60px] md:pt-0 ${styles.normalFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}
        >
            <div className={`${styles.section} w-[90%] md:w-[60%]`}>
                <h1 className="text-[35px] leading-[1.2] md:text-[60px] text-[#3d3a3a] font-[600] capitalize">
                    Best Collection for <br /> home Decoration
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                    Transform your house into a beautiful home with our carefully selected
                    home décor and lifestyle products.
                    <br />
                    Discover stylish, high-quality items that bring comfort, elegance, and
                    personality to every room.
                    <br />
                    Shop with confidence and find everything you need to create a space
                    you'll love.
                    <br />
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] font-[400] text-[18px]">Shop Now</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
