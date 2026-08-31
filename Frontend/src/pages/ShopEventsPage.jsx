import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import AllEvents from '../components/Shop/AllEvents.jsx'
export default function ShopEventsPage() {
    return (
        <div>
            <DashboardHeader activeTab={2} />
            <div className="flex item-start w-full">
                <div className="w-[80px] md:w-[330px] flex-shrink-0">
                    <DashboardSidebar active={5} />
                </div>
                <div className="w-full mr-16 flex  min-w-0">
                    <AllEvents />
                </div>
            </div>
        </div>
    )
}
