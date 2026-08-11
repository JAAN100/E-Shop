import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx'
import ProfileContent from '../components/Profile/ProfileContent.jsx'
export default function ProfilePage() {
    const [active, setActive] = React.useState(1);
    const [user, setUser] = React.useState(null);
    return (
        <div>
            <Header />
            <div className="w-10/11 mx-auto flex bg-[#f5f5f5] py-10">
                <div className="w=[50px] md:w-[335px]">
                    <ProfileSidebar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active} />
            </div>
        </div>
    )
}
