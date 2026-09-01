import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
export default function Rating({ ratings = 0 }) {
    const starts = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= ratings) {
            starts.push(
                <AiFillStar
                    key={i}
                    size={20}
                    color="#f6ba00"
                    className="mr-2 cursor-pointer"
                />,
            );
        } else if (i == Math.ceil(ratings) && !Number.isInteger(ratings)) {
            starts.push(
                <BsStarHalf
                    key={i}
                    size={20}
                    color="#f6ba00"
                    className="mr-2 cursor-pointer"
                />,
            );
        } else {
            starts.push(
                <AiOutlineStar
                    key={i}
                    size={20}
                    color="#f6ba00"
                    className="mr-2 cursor-pointer"
                />,
            );
        }
    }
    return <div className="flex items-center">{starts}</div>;
}
