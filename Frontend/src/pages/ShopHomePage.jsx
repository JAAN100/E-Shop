import React from 'react'
import ShopInfo from '../components/Shop/ShopInfo.jsx'
import ShopProfileData from '../components/Shop/ShopProfileData.jsx'

export default function ShopHomePage() {
    return (
        <div className="w-11/12 mx-auto bg-[#f5f5f5]">
            <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-0 py-6 lg:py-10 lg:justify-between">
                <div className="w-full lg:w-[25%] bg-[#fff] rounded-[4px] shadow-sm lg:overflow-y-scroll lg:h-[90vh] lg:sticky lg:top-10 lg:left-0 z-10">
                    <ShopInfo isOwner={true} />
                </div>
                <div className="w-full lg:w-[72%] rounded-[4px]">
                    <ShopProfileData isOwner={true} />
                </div>
            </div>
        </div>
    )
}
