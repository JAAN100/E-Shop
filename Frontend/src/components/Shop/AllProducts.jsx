import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllProductsForShop } from '../../redux/actions/product.js'
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Loader from '../Layout/Loader.jsx'
import { DataGrid } from '@mui/x-data-grid'
import { deleteProduct } from '../../redux/actions/product.js'
import { toast } from "react-toastify";
export default function AllProducts() {
    const { products, isLoading, message, error } = useSelector((state) => state.products);
    const { shop } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const handleDeleteProduct = async (id) => {
        await dispatch(deleteProduct(id));
        await dispatch(getAllProductsForShop(shop._id));
        if (message) {
            toast.success(message)
        }
        if (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        if (shop?._id) {
            dispatch(getAllProductsForShop(shop._id));
        }
    }, [dispatch, shop]);
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.7 },
        { field: "productName", headerName: "Product Name", minWidth: 180, flex: 1.4 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
        { field: "sold", headerName: "Sold Out", type: "number", minWidth: 130, flex: 0.6 },
        {
            field: "preview", headerName: "Preview", minWidth: 100, flex: 0.8, type: "number", sortable: false,
            renderCell: (params) => {
                const d = params.row;
                return (
                    <>
                        <Link to={`/product/${d.id}`}>
                            <button className="cursor-pointer">
                                <AiOutlineEye size={20} />
                            </button>
                        </Link>
                    </>
                )
            },
        },
        {
            field: "delete", headerName: "Delete", minWidth: 100, flex: 0.8, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <button className="cursor-pointer" onClick={() => { handleDeleteProduct(params.id) }}>
                            <AiOutlineDelete size={20} />
                        </button>
                    </>
                )
            },
        },

    ]

    const row = [];
    products && products.forEach((item) => {
        row.push({
            id: item._id,
            productName: item.productName,
            price: "US$ " + item.discountPrice.toFixed(2),
            stock: item.stock,
            sold: item.sold_out
        });
    });

    return (
        <>
            {isLoading ?
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