import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar'
import DashboardMessges from '../components/Shop/DashboardMessges.jsx'
export default function ShopMessagesPage() {
    return (
        <div>
            <DashboardHeader activeTab={5} />
            <div className="flex item-start w-full">
                <div className="w-[80px] md:w-[330px] flex-shrink-0">
                    <DashboardSidebar active={8} />
                </div>
                <DashboardMessges />
            </div>
        </div>
    )
}
