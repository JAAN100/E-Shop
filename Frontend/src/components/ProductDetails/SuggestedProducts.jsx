import React from 'react'
import { productData } from '../../static/data.jsx'
import Product from '../Route/ProductCard/Product'
export default function SuggestedProducts({ data }) {
    const [products, setProducts] = React.useState(null);

    React.useEffect(() => {
        const d = productData && productData.filter((i) => i.category === data.category);
        setProducts(d);
    }, []);

    return (
        <div>
            {
                data && (
                    <div className="p-4 w-10/11 mx-auto">
                        <h2 className="text-[25px] text-center md:text-start font-[500] font-Roboto pb-[20px] border-b mb-5">
                            Related Products
                        </h2>
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] gap-[20px] mb-12 border-0">
                            {
                                products && products.map((product, index) => (
                                    <Product data={product} key={index} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
