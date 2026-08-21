import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetCoupounCode } from "../../redux/actions/coupons.js";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DeleteCoupounCode } from "../../redux/actions/coupons.js";
import { getAllProducts } from "../../redux/actions/product.js";
export default function ShopCoupouns() {
    const { products } = useSelector((state) => state.products);
    const { shop } = useSelector((state) => state.seller);
    const { coupounCodes, isLoading, error, message } = useSelector((state) => state.coupounCodes);
    const [open, setOpen] = React.useState(false);
    const [codeName, setCodeName] = React.useState("");
    const [value, setValue] = React.useState("");
    const [minAmount, setMinAmount] = React.useState("");
    const [maxAmount, setMaxAmount] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleDeleteProduct = async (id) => {
        await dispatch(DeleteCoupounCode(id));
        await dispatch(GetCoupounCode());
        if (message) {
            toast.success(message);
        }
        if (error) {
            toast.error(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/api/coupoun-code/create-coupoun-code", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ codeName, value, minAmount, maxAmount, selectedProducts }),
            });
            const data = await response.json();
            if (data.success == true) {
                setLoading(false);
                toast.success("Coupon Created Successfully");
                setOpen(false);
                dispatch(GetCoupounCode());
            } else {
                setLoading(false)
                toast.error("Something Went Worng");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (shop?._id) {
            dispatch(getAllProducts(shop._id));
        }
        dispatch(GetCoupounCode());
    }, [dispatch]);
    const columns = [
        { field: "id", headerName: "Coupon ID", minWidth: 200, flex: 0.7 },
        {
            field: "codeName",
            headerName: "Code Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "value",
            headerName: "Value",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "minAmount",
            headerName: "Minimum Amount",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "maxAmount",
            headerName: "Maximum Amount",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "delete",
            headerName: "Delete",
            minWidth: 100,
            flex: 0.8,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            className="cursor-pointer"
                            onClick={() => {
                                handleDeleteProduct(params.id);
                            }}
                        >
                            <AiOutlineDelete size={20} />
                        </button>
                    </>
                );
            },
        },
    ];

    const row = [];
    coupounCodes &&
        coupounCodes.forEach((item) => {
            row.push({
                id: item._id,
                codeName: item.codeName,
                value: item.value + " %",
                minAmount: item.minAmount,
                maxAmount: item.maxAmount,
            });
        });

    return (
        <>
            {isLoading ? (
                <div className="w-full h-[80vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <div className="w-full ml-3 mb-3">
                        <div
                            className="md:w-[150px] w-max bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="text-white text-[12px] p-2 md:text-sm font-[500]">
                                Create Coupon Code
                            </span>
                        </div>
                    </div>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                    {open && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#000000ab] z-40 flex items-center justify-center">
                            <div className="w-[90%] md:w-[40%] h-[90vh] bg-white rounded-md shadow-sm relative p-4">
                                <div className="w-full flex justify-end">
                                    <RxCross1
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => setOpen(!open)}
                                    />
                                </div>
                                <h5 className="text-[20px] font-bold font-Poppins text-center">
                                    Create Coupon Code
                                </h5>
                                {/* Create Coupon Code Form */}
                                <form onSubmit={handleSubmit} aria-required={true} >
                                    <br />
                                    <div>
                                        <label htmlFor="productName" className="pb-2">
                                            Code Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                                            placeholder="Enter your Coupon code name"
                                            type="text"
                                            name="codeName"
                                            value={codeName}
                                            onChange={(e) => setCodeName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="productName" className="pb-2">
                                            Discount Percentage <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                                            placeholder="Enter discount percentage"
                                            type="number"
                                            name="value"
                                            value={value}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === "" || Number(value) >= 0) {
                                                    setValue(value);
                                                }
                                            }}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="productName" className="pb-2">
                                            Minimum Purchase
                                        </label>
                                        <input
                                            className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                                            placeholder="Enter minimum purchase amount"
                                            type="number"
                                            name="minAmount"
                                            value={minAmount}
                                            onChange={(e) => {
                                                const minAmount = e.target.value;
                                                if (minAmount === "" || Number(minAmount) >= 0) {
                                                    setMinAmount(minAmount);
                                                }
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="productName" className="pb-2">
                                            Maximum Purchase
                                        </label>
                                        <input
                                            className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                                            placeholder="Enter maximum purchase amount"
                                            type="number"
                                            name="maxAmount"
                                            value={maxAmount}
                                            onChange={(e) => {
                                                const maxAmount = e.target.value;
                                                if (maxAmount === "" || Number(maxAmount) >= 0) {
                                                    setMaxAmount(maxAmount);
                                                }
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div className="relative">
                                        <label htmlFor="category" className="pb-2">
                                            Selected Product
                                        </label>
                                        <select name="selectedProducts" id="selectedProducts" className="w-full mt-2 border h-[35px] rounded-[5px]"
                                            value={selectedProducts}
                                            onChange={(e) => {
                                                setSelectedProducts(e.target.value);
                                            }}
                                        >
                                            <option value="Choose Products">
                                                Choose Products
                                            </option>
                                            {products && products.map((product) => (
                                                <option key={product._id} value={product.productName}>
                                                    {product.productName}
                                                </option>
                                            ))}

                                        </select>

                                    </div>
                                    <br />
                                    <div className="w-full flex items-center justify-center relative">
                                        <input type="submit" value={loading ? "Creating..." : "Create Coupon"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
