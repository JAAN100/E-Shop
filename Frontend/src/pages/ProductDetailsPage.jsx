import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails.jsx'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts.jsx'
export default function ProductDetailsPage() {
    const { allProducts } = useSelector((state) => state.products);
    const { name } = useParams();
    const [data, setData] = React.useState(null);
    const productName = name.replace(/-/g, ' ');
    React.useEffect(() => {
        const data = allProducts && allProducts.find((i) => i.productName === productName);
        setData(data);
    }, []);
    return (
        <div>
            <Header />
            <ProductDetails data={data} />
            {
                data && (
                    <SuggestedProducts data={data} />
                )
            }
            <Footer />
        </div>
    )
}
