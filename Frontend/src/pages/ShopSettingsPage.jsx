import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import ShopSettings from '../components/Shop/ShopSettings.jsx'
export default function ShopSettingsPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full overflow-x-hidden">
                <div className="w-[80px] md:w-[330px] shrink-0">
                    <DashboardSidebar active={11} />
                </div>
                <div className="flex-1 min-w-0">
                    <ShopSettings />
                </div>
            </div>
        </div>
    )
}