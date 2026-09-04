import React from "react";
import { AiOutlineMoneyCollect, AiOutlineProduct, AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProductsForShop } from "../../redux/actions/product.js";
import { GetAllOrdersForSeller } from "../../redux/actions/order.js";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
export default function DashboardHero() {
    const { allOrders } = useSelector((state) => state.order);
    const { products } = useSelector((state) => state.products);
    const { shop } = useSelector((state) => state.seller);
    const [deliveredOrders, setDeliveredOrders] = React.useState([]);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getAllProductsForShop(shop?._id));
        dispatch(GetAllOrdersForSeller());
    }, [dispatch, shop]);
    React.useEffect(() => {
        const orderData = allOrders?.filter((item) => item.orderStatus === "Delivered") || [];
        setDeliveredOrders(orderData);
    }, [allOrders]);
    const totalEarningWithoutTax = deliveredOrders && deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0);
    const serviceCharges = totalEarningWithoutTax * 0.1;
    const availableBalance = totalEarningWithoutTax - serviceCharges;

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.row.status === "Delivered" ? "greenColor" : "redColor"
            }
        }, {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        }, {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        }, {
            field: " ",
            headerName: " ",
            flex: 1,
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link >
                    </>
                );
            },
        },
    ];

    const row = [];
    allOrders && allOrders?.forEach((item) => {
        row.push({
            id: item._id,
            status: item.orderStatus,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice.toFixed(2),
        });
    });
    return (
        <div className="w-[100%] bg-gray-100 h-[88vh] md:h-[89vh] overflow-y-auto  ">

            <div className="w-full p-8">
                <h3 className="text-[22px] font-semibold font-Poppins pb-2">Overview</h3>
                <div className="w-full block min-[1060px]:flex items-center justify-between">
                    <div className="w-full mb-4 mr-3 900px:w-[30%] min-h-[20vh] bg-white shadow rounded-lg px-2 py-5">
                        <div className="flex items-center">
                            <AiOutlineMoneyCollect size={30} className="mr-2 text-[#4c4c4c]" />
                            <h3
                                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                            >
                                Acccount Balance{" "}
                                <span className="text-[16px]">(with 10% service charges)</span>
                            </h3>
                        </div>
                        <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${availableBalance.toFixed(2)}</h5>
                        <Link to="/dashboard-withdraw-money">
                            <h5 className="pt-4 pl-2 text-[#077f9c] hover:text-[#077e9c96]">Withdraw Money</h5>
                        </Link>
                    </div>
                    <div className="w-full mb-4 mr-3 900px:w-[30%] min-h-[20vh] bg-white shadow rounded-lg px-2 py-5">
                        <div className="flex items-center">
                            <AiOutlineUnorderedList size={30} className="mr-2 text-[#4c4c4c]" />
                            <h3
                                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                            >
                                All Orders
                            </h3>
                        </div>
                        <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{allOrders && allOrders?.length}</h5>
                        <Link to="/dashboard-orders">
                            <h5 className="pt-4 pl-2 text-[#077f9c] hover:text-[#077e9c96]">View All Orders</h5>
                        </Link>
                    </div>
                    <div className="w-full mb-4 mr-3 900px:w-[30%] min-h-[20vh] bg-white shadow rounded-lg px-2 py-5">
                        <div className="flex items-center">
                            <AiOutlineProduct size={30} className="mr-2 text-[#4c4c4c]" />
                            <h3
                                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                            >
                                All Products
                            </h3>
                        </div>
                        <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products?.length}</h5>
                        <Link to="/dashboard-products">
                            <h5 className="pt-4 pl-2 text-[#077f9c] hover:text-[#077e9c96]">View All Products</h5>
                        </Link>
                    </div>
                </div>

                <br />
                <h3 className="text-[22px] font-Poppins pb-2 font-semibold">Latest Orders</h3>
                <div className="w-full min-h-[40vh] bg-white rounded-xl mr-6">
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            </div>
        </div>
    );
}
