import React from 'react'
import Header from '../components/Layout/Header.jsx'
import Footer from '../components/Layout/Footer.jsx'
import EventCard from '../components/Route/Events/EventCard.jsx'
export default function EventPage() {
    return (
        <div>
            <Header activeHeading={4} />
            <EventCard active={true} />
            <EventCard active={true} />
            <Footer />
        </div>
    )
}
