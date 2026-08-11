import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails.jsx'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data.jsx'
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts.jsx'
export default function ProductDetailsPage() {
    const { name } = useParams();
    const [data, setData] = React.useState(null);
    const productName = name.replace(/-/g, ' ');
    React.useEffect(() => {
        const data = productData.find((i) => i.name === productName);
        setData(data);
    }, [])
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
