import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetAllOrdersForSeller } from '../../redux/actions/order.js'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Loader from '../Layout/Loader.jsx'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
export default function AllOrders() {
    const { allOrders, isAllLoading } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllOrdersForSeller());
    }, []);
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
        <>
            {isAllLoading ?
                (
                    <div className="w-full h-[80vh] flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="w-full mx-8 pt-1 mt-10 bg-white">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </div>
                )}
        </>
    )
}