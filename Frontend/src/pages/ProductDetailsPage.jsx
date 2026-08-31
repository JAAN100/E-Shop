import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails.jsx'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom'
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts.jsx'
export default function ProductDetailsPage() {
    const { allProducts } = useSelector((state) => state.products);
    const { allEvents } = useSelector((state) => state.events);
    const { id } = useParams();
    const [data, setData] = React.useState(null);
    const [searchParams] = useSearchParams();
    const isEvent = searchParams.get("isEvent");

    React.useEffect(() => {
        if (isEvent !== null) {
            const data = allEvents && allEvents.find((i) => i._id === id);
            setData(data);
        } else {
            const data = allProducts && allProducts.find((i) => i._id === id);
            setData(data);
        }
    }, [allProducts, id]);
    return (
        <div>
            <Header />
            <ProductDetails data={data} />
            {
                !isEvent &&
                data && (
                    <SuggestedProducts data={data} />
                )
            }
            <Footer />
        </div>
    )
}
