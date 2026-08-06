import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { productData } from "../../static/data.jsx";
import { Search } from "lucide-react";
import { BiMenuAltLeft } from "react-icons/bi";
import {
    IoIosArrowDown,
    IoIosArrowUp,
    IoIosArrowForward,
} from "react-icons/io";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import DropDownData from "./DropDownData";
import Navbar from "./Navbar";
import { categoriesData } from "../../static/data";
export default function Header({ activeHeading }) {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const searchRef = useRef(null);
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearch(term);
        const filteredProduct =
            productData &&
            productData.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase()),
            );
        setSearchData(filteredProduct);
    };
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });
    return (
        <>
            <div className={`${styles.section}`}>
                <div className="hidden md:h-[50px] md:my-[20px] flex flex-row md:flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <img
                                className="w-50 sm:w-50 md:w-50 lg:w-60 h-auto"
                                src="/gemini-svg.svg"
                                alt="HJ Shop"
                            />
                        </Link>
                    </div>
                    {/* Search Box */}
                    <div className="w-[50%] relative">
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search Product..."
                            onChange={handleSearchChange}
                            value={search}
                            className="border-gray-300 focus:border-[#3957db] w-full h-[40px] px-2 border-[2px] rounded-md"
                        />
                        <Search
                            size={25}
                            className="absolute right-2 top-1.5 text-gray-500 cursor-pointer"
                            onClick={() => searchRef.current.focus()}
                        />
                        {search && searchData && searchData.length !== 0 ? (
                            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-10 p-4 ">
                                {searchData &&
                                    searchData.map((i, index) => {
                                        const d = i.name;
                                        const product_name = d.replace(/\s+/g, "-");
                                        return (
                                            <Link to={`/product/${product_name}`} key={index}>
                                                <div className="w-full flex items-start-py-3">
                                                    <img
                                                        src={i.image_Url[0].url}
                                                        alt=""
                                                        className="w-[40px] h-[40px] mr-[10px]"
                                                    />
                                                    <h1>{i.name}</h1>
                                                </div>
                                            </Link>
                                        );
                                    })}
                            </div>
                        ) : null}
                    </div>
                    <div className={`${styles.button}`}>
                        <Link to={"seller"}>
                            <h1 className="text-[#fff] flex items-center">
                                Become Seller <IoIosArrowForward className="ml-1" />
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={`${active ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden md:flex w-full bg-[#332ac8] h-[70px] items-center justify-between`}
            >
                <div
                    className={`${styles.section} relative ${styles.normalFlex} justify-between`}
                >
                    {/* All Categories */}
                    <div>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
                            <BiMenuAltLeft
                                size={30}
                                className="absolute left-2
                            top-3 cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            <button
                                className="cursor-pointer h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md"
                                onClick={() => setDropDown(!dropDown)}
                            >
                                All Categories
                            </button>
                            {dropDown ? (
                                <IoIosArrowUp
                                    size={20}
                                    className="absolute right-2 top-3 items-center cursor-pointer"
                                    onClick={() => {
                                        setDropDown(!dropDown);
                                    }}
                                />
                            ) : (
                                <IoIosArrowDown
                                    size={20}
                                    className="absolute right-2 top-3 items-center cursor-pointer"
                                    onClick={() => {
                                        setDropDown(!dropDown);
                                    }}
                                />
                            )}
                            {dropDown ? (
                                <DropDownData
                                    categoriesData={categoriesData}
                                    setDropDown={setDropDown}
                                />
                            ) : null}
                            {/* {Nav Items} */}
                        </div>
                    </div>
                    <div>
                        <div className={`${styles.normalFlex} ml-5 hidden lg:flex`}>
                            <Navbar active={activeHeading} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.normalFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                <AiOutlineHeart
                                    size={30}
                                    className="text-white"
                                />
                                <span className="absolute right-0 top-0 w-4 h-4 rounded-full bg-[#3bc177] top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                    0
                                </span>
                            </div>
                            <div className="relative cursor-pointer mr-[15px]">
                                <AiOutlineShoppingCart
                                    size={30}
                                    className="text-white"
                                />
                                <span className="absolute right-0 top-0 w-4 h-4 rounded-full bg-[#3bc177] top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                    1
                                </span>
                            </div>
                            <div className="relative cursor-pointer mr-[15px]">
                                <Link to={"/log-in"}>
                                    <CgProfile
                                        size={30}
                                        className="text-white"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
