import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Layout/Header.jsx'
import Product from "../components/Route/ProductCard/Product.jsx";
import Footer from '../components/Layout/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../components/Layout/Loader.jsx";
export default function ProductsPage() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const { allProducts, isLoading } = useSelector((state) => state.products);

    const [data, setData] = React.useState([]);
    useEffect(() => {
        if (category === null) {
            const d = allProducts;
            setData(d);
        } else {
            const d = allProducts && allProducts.filter((i) => i.category === categoryData);
            setData(d);
        }
    }, [category, allProducts]);
    return (
        <>
            <ScrollToTop />
            {
                isLoading ?
                    (<Loader />)
                    :
                    (<div>
                        <Header activeHeading={3} />
                        <br />
                        <br />
                        <div className="w-full px-4 sm:px-6 md:w-11/12 md:px-0 mx-auto">
                            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 mt-6 md:mt-0">
                                {data && data.map((i, index) =>
                                    <Product key={index} data={i} />
                                )}
                            </div>
                            {
                                data && data.length === 0 && (
                                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                                        No products Found!
                                    </h1>
                                )
                            }
                        </div>

                        <Footer />
                    </div>)
            }
        </>
    )
}
