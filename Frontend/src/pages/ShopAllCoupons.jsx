import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import ShopCoupons from '../components/Shop/ShopCoupons.jsx'
export default function ShopAllCoupons() {
    return (
        <div>
            <DashboardHeader activeTab={1} />
            <div className="flex item-start w-full">
                <div className="w-[80px] md:w-[330px] flex-shrink-0">
                    <DashboardSidebar active={9} />
                </div>
                <div className="w-full mr-16 flex  min-w-0">
                    <ShopCoupons />
                </div>
            </div>
        </div>
    )
}
