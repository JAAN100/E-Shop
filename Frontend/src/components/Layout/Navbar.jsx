import React from 'react'
import { navItems } from "../../static/data"
import { Link } from "react-router-dom"
import styles from "../../styles/styles";
export default function Navbar({ active }) {
    return (
        <div className={`${styles.normalFlex} flex-col lg:flex-row w-full`}>
            {
                navItems && navItems.map((i, index) => (
                    <div className="w-full lg:w-auto" key={index}>
                        <Link to={i.url}
                            className={`${active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"} block py-2 lg:py-0 px-4 lg:px-6 font-[500] cursor-pointer`}
                        >
                            {i.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}