import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import AllProducts from '../components/Shop/AllProducts.jsx'
export default function ShopProductsPage() {
    return (
        <div>
            <DashboardHeader activeTab={3} />
            <div className="flex item-start w-full">
                <div className="w-[80px] md:w-[330px] flex-shrink-0">
                    <DashboardSidebar active={3} />
                </div>
                <div className="w-full mr-16 flex  min-w-0">
                    <AllProducts />
                </div>
            </div>
        </div>
    )
}
