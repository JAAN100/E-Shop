import React, { useState, useRef, useEffect } from "react";
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
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { categoriesData } from "../../static/data";

export default function Header({ activeHeading }) {
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
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

    useEffect(() => {
        const handleScroll = () => setActive(window.scrollY > 70);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`${styles.section}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 py-3 md:py-5">
                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        className="order-1 lg:hidden text-gray-700"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        <BiMenuAltLeft size={28} />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="order-2 flex-shrink-0">
                        <img
                            className="w-28 sm:w-36 md:w-44 lg:w-60 h-auto"
                            src="/gemini-svg.svg"
                            alt="HJ Shop"
                        />
                    </Link>

                    {/* Search box */}
                    <div className="order-4 sm:order-3 basis-full sm:basis-0 sm:flex-1 relative">
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search Product..."
                            onChange={handleSearchChange}
                            value={search}
                            className="border-gray-300 focus:border-[#3957db] w-full h-[40px] px-2 border-[2px] rounded-md"
                        />
                        <Search
                            size={22}
                            className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                            onClick={() => searchRef.current.focus()}
                        />
                        {search && searchData && searchData.length !== 0 ? (
                            <div className="absolute w-full min-h-[30vh] bg-slate-50 shadow-sm-2 z-20 p-4">
                                {searchData.map((i, index) => {
                                    const product_name = i.name.replace(/\s+/g, "-");
                                    return (
                                        <Link to={`/product/${product_name}`} key={index}>
                                            <div className="w-full flex items-start py-3">
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

                    {/* Become Seller + wishlist/cart/profile */}
                    <div className="order-3 sm:order-4 ml-auto sm:ml-0 flex items-center gap-3 md:gap-4">
                        <div className={`${styles.button}`}>
                            <Link to={"seller"}>
                                <h1 className="text-[#fff] flex items-center whitespace-nowrap">
                                    <span className="hidden sm:inline mr-1">Become Seller</span>
                                    <IoIosArrowForward />
                                </h1>
                            </Link>
                        </div>

                        <div className="relative cursor-pointer">
                            <AiOutlineHeart size={26} className="text-gray-700" />
                            <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#3bc177] text-white font-mono text-[12px] leading-4 text-center">
                                0
                            </span>
                        </div>

                        <div className="relative cursor-pointer">
                            <AiOutlineShoppingCart size={26} className="text-gray-700" />
                            <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#3bc177] text-white font-mono text-[12px] leading-4 text-center">
                                1
                            </span>
                        </div>
                        {isAuthenticated ? (
                            <Link to="/profile">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-[35px] h-[35px] rounded-full object-cover"
                                />
                            </Link>
                        ) : (
                            <Link to={"/log-in"}>
                                <CgProfile size={26} className="text-gray-700" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Categories + nav links: horizontal bar on lg+, drawer via hamburger below lg */}
            <div
                className={`${active ? "shadow-sm fixed top-0 left-0 z-30" : "relative"
                    } w-full bg-[#332ac8] transition`}
            >
                <div
                    className={`${styles.section} ${mobileMenu ? "flex" : "hidden"
                        } lg:flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[70px] py-3 lg:py-0 gap-3 lg:gap-0`}
                >
                    {/* All Categories */}
                    <div className="relative w-full lg:w-[270px] lg:h-[60px] lg:mt-[10px]">
                        <BiMenuAltLeft
                            size={30}
                            className="absolute left-2 top-3 cursor-pointer"
                            onClick={() => setDropDown(!dropDown)}
                        />
                        <button
                            className="cursor-pointer h-[45px] lg:h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md"
                            onClick={() => setDropDown(!dropDown)}
                        >
                            All Categories
                        </button>
                        {dropDown ? (
                            <IoIosArrowUp
                                size={20}
                                className="absolute right-2 top-3 items-center cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                        ) : (
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-3 items-center cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                        )}
                        {dropDown ? (
                            <DropDownData
                                categoriesData={categoriesData}
                                setDropDown={setDropDown}
                            />
                        ) : null}
                    </div>

                    {/* Nav links */}
                    <div className={`${styles.normalFlex} w-full lg:w-auto lg:ml-5`}>
                        <Navbar active={activeHeading} />
                    </div>
                </div>
            </div>
        </>
    );
}
