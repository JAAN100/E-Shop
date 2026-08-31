import React, { useEffect } from 'react'
import Header from '../components/Layout/Header.jsx'
import Product from "../components/Route/ProductCard/Product.jsx";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader.jsx";
import Footer from '../components/Layout/Footer.jsx'
export default function BestSellingPage() {
    const [data, setData] = React.useState([]);
    const { allProducts, isLoading } = useSelector((state) => state.products);
    useEffect(() => {
        const d = allProducts;
        setData(d);
    }, [allProducts])
    return (
        <>

            <div>
                {
                    isLoading ? (<Loader />)
                        : (
                            <>
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
                            </>
                        )
                }
            </div>
        </>
    )
}
