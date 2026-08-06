import React from "react";
import styles from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
export default function Categories() {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${styles.section} hidden sm:block`}>
                <div
                    className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
                >
                    {brandingData &&
                        brandingData.map((i, index) => (
                            <div className="brandingItem flex items-start" key={index}>
                                {i.icon}
                                <div className="px-3">
                                    <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                                    <p className="text-xs md:text-sm">{i.Description}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div
                className={`${styles.section} bg-white rounded-lg p-6 mb-12 `}
                id="categories"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] gap-5">
                    {categoriesData &&
                        categoriesData.map((i, index) => {
                            const handleSubmit = () => {
                                navigate(`/products?category=${i.title}`);
                                window.location.reload();
                            };
                            return (
                                <div
                                    className="w-full h-100px px-5 flex items-center justify-between cursor-pointer overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                                    key={index}
                                    onClick={handleSubmit}
                                >
                                    <h5 className={`text-[18px] leading-[1.3]`}>
                                        {i.title}
                                    </h5>
                                    <img src={i.image_Url} alt={i.title} className="w-[120px] object-cover" />
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
