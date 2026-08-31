import React from 'react'
import { useEffect } from 'react'
import { useSelector } from "react-redux";
import styles from '../../../styles/styles.js'
import Product from '../ProductCard/Product'
export default function BestDeals() {
    const { allProducts } = useSelector((state) => state.products);
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const d = allProducts && allProducts.slice(0, 5);
        setData(d);
    }, [allProducts]);
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
                    <h1>Best Deals</h1>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] gap-[20px] mb-12 border-0">
                        {data && data.map((i, index) => (
                            <Product key={index} data={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
