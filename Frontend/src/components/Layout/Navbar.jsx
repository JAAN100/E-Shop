import React from 'react'
import { navItems } from "../../static/data"
import { Link } from "react-router-dom"
import styles from "../../styles/styles";
export default function Navbar({ active }) {
    return (
        <div className={`${styles.normalFlex}`}>
            {
                navItems && navItems.map((i, index) => (
                    <div className="flex">
                        <Link to={i.url}
                            className={`${active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"}  px-6 font-[500] cursor-pointer`}
                        >
                            {i.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
