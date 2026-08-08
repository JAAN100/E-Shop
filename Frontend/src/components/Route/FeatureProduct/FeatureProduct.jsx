import React from 'react'
import { productData } from '../../../static/data.jsx'
import Product from '../ProductCard/Product'
export default function FeatureProduct() {
    return (
        <div>
            <div className="w-10/11 mx-auto">
                <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
                    <h1>Feature Products</h1>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] gap-[20px] mb-12 border-0">
                    {
                        productData && productData.map((product, index) => (
                            <Product data={product} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
