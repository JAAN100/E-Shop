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
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";
export default function Header({ activeHeading }) {
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const searchRef = useRef(null);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [open, setOpen] = useState(false);
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
            <div className="hidden md:block">
                <div className={`${styles.section}`}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-3 py-3 md:py-5">
                        {/* Logo */}
                        <Link to="/" className="order-2 flex-shrink-0">
                            <img
                                className="w-28 sm:w-36 md:w-44 lg:w-60 h-auto cursor-pointer"
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
                                <Link to={"shop-create"}>
                                    <h1 className="text-[#fff] flex items-center whitespace-nowrap">
                                        <span className="hidden sm:inline mr-1">Become Seller</span>
                                        <IoIosArrowForward />
                                    </h1>
                                </Link>
                            </div>

                            <div className="relative cursor-pointer" onClick={() => setOpenWishlist(!openWishlist)}>
                                <AiOutlineHeart size={26} className="text-gray-700" />
                                <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#3bc177] text-white font-mono text-[12px] leading-4 text-center">
                                    0
                                </span>
                            </div>

                            <div className="relative cursor-pointer" onClick={() => setOpenCart(!openCart)}>
                                <AiOutlineShoppingCart size={26} className="text-gray-700" />
                                <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#3bc177] text-white font-mono text-[12px] leading-4 text-center">
                                    1
                                </span>
                            </div>
                            {isAuthenticated ? (
                                <Link to="/profile">
                                    <img
                                        src={user.avatar}
                                        alt={user.fullName}
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

                {/* {Cart POP Up} */}
                {
                    openCart ? (
                        <Cart setOpenCart={setOpenCart} />
                    ) : null
                }
                {/* {Wishlist POP Up} */}
                {
                    openWishlist ? (
                        <Wishlist setOpenWishlist={setOpenWishlist} />
                    ) : null
                }
                {/* Categories + nav links: horizontal bar on lg+, drawer via hamburger below lg */}
                <div
                    className={`${active ? "shadow-sm fixed top-0 left-0 z-30" : "relative"
                        } w-full bg-[#332ac8] transition`}
                >
                    <div
                        className={`${styles.section} flex lg:flex lg:flex-row lg:items-center justify-between lg:h-[70px] py-0 lg:py-3 lg:py-0 gap-3 lg:gap-0`}
                    >
                        {/* All Categories */}
                        <div className="relative w-full md:w-[220px] lg:w-[270px] md:mt-2 lg:h-[60px] lg:mt-[10px]">
                            <BiMenuAltLeft
                                size={30}
                                className="absolute left-2 top-3 cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            <button
                                className="cursor-pointer h-[45px] md:h-full lg:h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-base md:text-base lg:text-lg font-[500] select-none rounded-t-md"
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
                        <div className={`${styles.normalFlex} w-full md:w-auto lg:w-auto md:ml-3 lg:ml-4`}>
                            <Navbar active={activeHeading} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Header */}
            {
                <div className="w-full h-[60px] relative z-50 top-0 left-0 shadow-sm md:hidden">
                    <div className="w-full fixed bg-[#fff] flex items-center justify-between">
                        <div>
                            <BiMenuAltLeft size={40} className="ml-4 mt-3 cursor-pointer" onClick={() => setOpen(!open)} />
                        </div>
                        <div>
                            <Link to="/" className="order-2 flex-shrink-0">
                                <img
                                    className="mt-3 w-46     h-auto cursor-pointer"
                                    src="/gemini-svg.svg"
                                    alt="HJ Shop"
                                />
                            </Link>
                        </div>
                        <div>
                            <div className="realtive">
                                <AiOutlineShoppingCart size={30} className="mt-3 mr-3 cursor-pointer" onClick={() => setOpenCart(!openCart)} />
                                <span className="absolute right-2 top-4 w-4 h-4 rounded-full bg-[#3bc177] text-white font-mono text-[12px] leading-4 text-center">
                                    1
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* {Cart POP Up} */}
                    {
                        openCart ? (
                            <Cart setOpenCart={setOpenCart} />
                        ) : null
                    }
                    {/* {Wishlist POP Up} */}
                    {
                        openWishlist ? (
                            <Wishlist setOpenWishlist={setOpenWishlist} />
                        ) : null
                    }
                    {/*Header Side Bar  */}
                    {
                        open && (
                            <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
                                <div
                                    className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="w-full justify-between flex pr-3">
                                        <div>
                                            <div className="relative mr-15px" onClick={() => setOpenWishlist(!openWishlist)}>
                                                <AiOutlineHeart size={25} className="mt-5 ml-3" />
                                                <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#3bc177] text-white font-mono text-[12px] leading-4 text-center">
                                                    0
                                                </span>
                                            </div>
                                        </div>
                                        <RxCross1 size={25} className="ml-4 mt-5 " onClick={() => setOpen(!open)} />
                                    </div>

                                    <div className="my-8 w-[92%] m-auto h-[40px]">
                                        <input
                                            ref={searchRef}
                                            type="text"
                                            placeholder="Search Product..."
                                            onChange={handleSearchChange}
                                            value={search}
                                            className="border-gray-300 focus:border-[#3957db] w-full h-[40px] px-2 border-[2px] rounded-md"
                                        />
                                        <Search
                                            size={18}
                                            className="absolute right-5 top-22 text-gray-500 cursor-pointer"
                                            onClick={() => searchRef.current.focus()}
                                        />
                                        {search && searchData && searchData.length !== 0 ? (
                                            <div className="absolute w-full left-0 min-h-[30vh] bg-slate-50 shadow-sm-2 z-20 p-3">
                                                {searchData.map((i, index) => {
                                                    const product_name = i.name.replace(/\s+/g, "-");
                                                    return (
                                                        <Link to={`/product/${product_name}`} key={index}>
                                                            <div className="w-full flex items-center py-3">
                                                                <img
                                                                    src={i.image_Url[0].url}
                                                                    alt=""
                                                                    className="w-[50px] mr-2"
                                                                />
                                                                <h1>{i.name}</h1>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ) : null}
                                    </div>
                                    <Navbar active={activeHeading} />
                                    <div className={`${styles.button} mx-3`}>
                                        <Link to={"shop-create"}>
                                            <h1 className="text-[#fff] flex items-center whitespace-nowrap">
                                                <span className="inline mr-1">Become Seller</span>
                                                <IoIosArrowForward />
                                            </h1>
                                        </Link>
                                        <br />
                                        <br />
                                    </div>
                                    <div className="mt-10 flex w-full justify-center ">
                                        {isAuthenticated ? (
                                            <Link to="/profile">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.fullName}
                                                    className="w-[120px] h-[110px] rounded-full object-cover border-green-500 border-2"
                                                />
                                            </Link>
                                        ) : (
                                            <>
                                                <Link to="/log-in" className="text-[18px] pr-[10px] text-[#000000b7]">
                                                    Login /
                                                </Link>
                                                <Link to="/sign-up" className="text-[18px] pr-[10px] text-[#000000b7]">
                                                    Sign Up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </>
    );
}