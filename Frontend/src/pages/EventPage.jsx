import React from 'react'
import Header from '../components/Layout/Header.jsx'
import Footer from '../components/Layout/Footer.jsx'
import EventCard from '../components/Route/Events/EventCard.jsx'
import { useSelector } from "react-redux";
import Loader from '../components/Layout/Loader.jsx'
export default function EventPage() {
    const { allEvents, isLoading } = useSelector((state) => state.events);
    return (
        <>
            {
                isLoading ? (<Loader />)
                    :
                    (<div>
                        <Header activeHeading={4} />
                        <EventCard active={true} data={allEvents && allEvents[0]} />
                        <Footer />
                    </div>)
            }
        </>
    )
}
