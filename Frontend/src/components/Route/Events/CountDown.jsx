import React, { useState, useEffect } from "react";

export default function CountDown({ data }) {
    const calculateTimeLeft = () => {
        const difference = new Date(data?.finish_Date) - new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timerComponents = Object.keys(timeLeft).map((interval) => (
        <span key={interval} className="text-[16px] sm:text-[20px] lg:text-[25px] text-[#475ad2] font-Roboto">
            {timeLeft[interval]} {interval}{" "}
        </span>
    ));

    return (
        <div className="flex flex-wrap items-baseline gap-x-1">
            {timerComponents.length ? timerComponents : <span className="text-[red] text-[25px]">Time's up!</span>}
        </div>
    );
}