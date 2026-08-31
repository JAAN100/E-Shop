import React from 'react'
import { useEffect } from 'react'
import EventCard from './EventCard.jsx'
import { useSelector } from "react-redux";
import Loader from '../../Layout/Loader.jsx'
export default function Events() {
    const { allEvents, isLoading } = useSelector((state) => state.events);
    useEffect(() => {
        const data = allEvents && allEvents.find((a, b) => a.sold_out - b.sold_out);
    }, [allEvents])
    return (
        <>
            {
                isLoading ? (<Loader />)
                    :
                    (<div>
                        <div className="w-10/12 mx-auto">
                            <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
                                <h1>Popular Events</h1>
                            </div>
                            <div className="w-full grid">
                                <EventCard active={false} data={allEvents && allEvents[0]} />
                            </div>
                        </div>
                    </div>)
            }

        </>
    )
}
