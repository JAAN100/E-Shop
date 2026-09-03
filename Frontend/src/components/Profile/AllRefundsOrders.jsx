import React from 'react'
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders } from "../../redux/actions/order.js"
export default function AllOrders() {
    const { orders } = useSelector((state) => state.order);
    const filterOrder = orders && orders?.filter((item) => item.orderStatus === "Processing refund" || item.orderStatus === "Refund Success");
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(GetAllOrders());
    }, [dispatch]);

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
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];
    filterOrder && filterOrder.forEach((item) => {
        row.push({
            id: item._id,
            status: item.orderStatus,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice.toFixed(2),
        });
    });
    return (
        <div className="pl-8 pt-1 mx-3">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    )
}