import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
export default function DropDownData({ categoriesData, setDropDown }) {
    const navigate = useNavigate();
    const submitHandler = (category) => {
        navigate(`/products?category=${category.title}`);
        setDropDown(false);
        window.location.reload();
    };
    return (
        <div className="pb-4 w-[270px] absolute bg-[#fff] z-30 rounded-b-md shadow-sm border-t-[2px] border-t-gray-200">
            {categoriesData &&
                categoriesData.map((category, index) => (
                    <div
                        key={index}
                        className={`${styles.normalFlex} cursor-pointer hover:bg-[#f5f5f5] transition-all duration-300 ease-in-out`}
                        onClick={() => {
                            submitHandler(category);
                        }}
                    >
                        <img
                            src={category.image_Url}
                            alt=""
                            className="w-6 h-6 object-contain ml-4"
                        />
                        <h3 className="m-3 select-none">{category.title}</h3>
                    </div>
                ))}
        </div>
    );
}
