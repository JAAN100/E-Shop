import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import AllOrders from '../components/Shop/AllOrders.jsx'
export default function ShopAllOrdersPage() {
    return (
        <div>
            <DashboardHeader activeTab={4} />
            <div className="flex item-start w-full">
                <div className="w-[80px] md:w-[330px] flex-shrink-0">
                    <DashboardSidebar active={2} />
                </div>
                <div className="w-full mr-16 flex  min-w-0">
                    <AllOrders />
                </div>
            </div>
        </div>
    )
}
