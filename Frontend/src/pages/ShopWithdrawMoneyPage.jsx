import React from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../components/Shop/Layout/DashboardSidebar.jsx'
import WithdrawMoney from '../components/Shop/WithdrawMoney.jsx'
export default function ShopWithdrawMoneyPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full overflow-x-hidden">
                <div className="w-[80px] md:w-[330px] shrink-0">
                    <DashboardSidebar active={7} />
                </div>
                <WithdrawMoney />
            </div>
        </div>
    )
}
