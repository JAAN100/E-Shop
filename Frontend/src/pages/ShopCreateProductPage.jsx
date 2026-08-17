import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import CreateProduct from '../components/Shop/CreateProduct.jsx'
export default function ShopCreateProductPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-center justify-between w-full">
                <div className="w-[80px] md:w-[330px]">
                    <DashboardSidebar active={4} />
                </div>
                <div className="w-full justify-center flex">
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}
