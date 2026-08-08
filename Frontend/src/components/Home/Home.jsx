import React from 'react'
import Header from '../Layout/Header.jsx'
import Hero from '../Route/Hero/Hero.jsx'
import Categories from '../Route/Categories/Categories.jsx'
import BestDeals from '../Route/BestDeals/BestDeals.jsx'
import FeatureProduct from '../Route/FeatureProduct/FeatureProduct.jsx'
import Events from '../Route/Events/Events.jsx'
import Sponsored from '../Route/Sponsored/Sponsored.jsx'
import Footer from '../Layout/Footer.jsx'
export default function Home() {
    return (
        <>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
            <Events />
            <FeatureProduct />
            <Sponsored />
            <Footer />
        </>
    )
}
