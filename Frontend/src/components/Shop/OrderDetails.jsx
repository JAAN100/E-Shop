import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import { BsFillBagFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { GetAllOrdersForSeller } from "../../redux/actions/order.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function OrderDetails() {
    const { allOrders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [status, setStatus] = React.useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(GetAllOrdersForSeller());
    }, [dispatch]);
    const data = allOrders && allOrders.find((items) => items._id === id);
    const orderUpdateHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await fetch(
                `/api/order/update-order-status/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ orderStatus: status }),
                },
                { withCredentials: true },
            );
            const res = await data.json();
            if (!res.success) {
                throw new Error(res.message || "Failed to update order status");
            }
            toast.success("Order status updated successfully");
            navigate("/dashboard-orders");
        } catch (error) {
            toast.error("Error updating order status");
        }
    };
    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsFillBagFill size={30} color="crimson" />
                    <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
                <Link to="/dashboard-orders">
                    <div className="w-[150px] my-3 flex items-center justify-center cursor-pointer bg-[#fce1e6] rounded-[4px] text-[#e94560] font-[600] h-[45px] text-[18px]">
                        {" "}
                        Order List
                    </div>
                </Link>
            </div>
            <div className="w-full flex items-center justify-between pt-6">
                <h5 className="text-[#000b]">
                    Order ID: <span>#{data?._id?.slice(0, 8)}</span>
                </h5>
                <h5 className="text-[#000b]">
                    Place on : <span>{data?.createdAt?.slice(0, 10)}</span>
                </h5>
            </div>

            {/* Order items */}
            <br />
            <br />

            {data &&
                data.cart.map((item) => (
                    <div className="w-full flex items-start mb-5">
                        <img
                            src={`${item?.images[0]?.url}`}
                            alt={`${item?.productName}`}
                            className="w-[80px] h-[80px]"
                        />
                        <div className="w-full">
                            <h5 className="pl-3 text-[20px]">{item?.productName}</h5>
                            <h5 className="pl-3 text-[20px] text-[#00000091]">
                                US$ {item?.discountPrice} * {item?.qty}
                            </h5>
                        </div>
                    </div>
                ))}
            <div className="border-t w-full text-right">
                <h5 className="pt-3 text-[18px]">
                    Total Price: <strong>US$ {data?.totalPrice}</strong>
                </h5>
            </div>
            <br />
            <br />
            <div className="w-full md:flex items-center">
                <div className="w-full md:w-[60%]">
                    <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
                    <h4 className="pt-3 text-[20px]">
                        {data?.shippingAddress?.address1 +
                            " " +
                            data?.shippingAddress?.address2}
                    </h4>
                    <h4 className="text-[20px]">{data?.shippingAddress?.country}</h4>
                    <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
                    <h4 className="text-[20px]">0{data?.shippingAddress?.phoneNumber}</h4>
                </div>
                <div className="w-full md:w-[40%]">
                    <h4 className="pt-3 text-[20px] font-[600]">Payment Info:</h4>
                    <h4 className="">
                        Status:{" "}
                        {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
                    </h4>
                </div>
            </div>
            <br />
            <br />
            <h4 className="pt-3 text-[20px] font-[600]">Order Status: </h4>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 mt-3"
            >
                {[
                    "Processing",
                    "Transfered to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                    "Processing refund",
                ]
                    .slice(
                        [
                            "Processing",
                            "Transfered to delivery partner",
                            "Shipping",
                            "Received",
                            "On the way",
                            "Delivered",
                            "Processing refund",
                        ].indexOf(data?.orderStatus),
                    )
                    .map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
            </select>
            <div
                className={`${styles.button} mt-5 !bg-[#FCE1E6] !h-[45px] font-[600] text-[18px] rounded-[4px] text-[#E94560]`}
                onClick={orderUpdateHandler}
            >
                Update Status
            </div>
        </div>
    );
}
