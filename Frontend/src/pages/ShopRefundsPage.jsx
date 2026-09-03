import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import AllRefunds from '../components/Shop/AllRefunds.jsx'
export default function ShopRefundsPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex item-start w-full">
                <div className="w-[80px] md:w-[330px] flex-shrink-0">
                    <DashboardSidebar active={10} />
                </div>
                <div className="w-full mr-16 flex  min-w-0">
                    <AllRefunds />
                </div>
            </div>
        </div>
    )
}
