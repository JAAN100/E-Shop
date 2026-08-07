import React from 'react'
import Header from '../Layout/Header.jsx'
import Hero from '../Route/Hero/Hero.jsx'
import Categories from '../Route/Categories/Categories.jsx'
import BestDeals from '../Route/BestDeals/BestDeals.jsx'
export default function Home() {
    return (
        <>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
        </>
    )
}
