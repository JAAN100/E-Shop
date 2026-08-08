import React, { useEffect } from 'react'
import Header from '../components/Layout/Header.jsx'
import { productData } from '../static/data.jsx'
import Product from "../components/Route/ProductCard/Product.jsx";
import Footer from '../components/Layout/Footer.jsx'
export default function BestSellingPage() {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const d = productData && productData.sort((a, b) => a.total_sell - b.total_sell);
        setData(d);
        //window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <Header activeHeading={2} />
            <br />
            <br />
            <div className="w-10/11 mx-auto">
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {data && data.map((i, index) =>
                        <Product key={index} data={i} />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}
