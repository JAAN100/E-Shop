import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles.js";
import { BsFillBagFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { GetAllOrders } from "../redux/actions/order.js";
import { useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
export default function UserOrderDetails() {
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(1);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [refundLoading, setRefundLoading] = useState(false);
    const [comment, setComment] = useState("");
    const { id } = useParams();
    const data = orders && orders.find((items) => items._id === id);
    const reviewHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/product/create-new-review/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: rating,
                    comment: comment,
                    productId: selectedItem?._id,
                }),
            }, { withCredentials: true });
            const data = await response.json();
            if (data.success === true) {
                toast.success("Review submitted successfully");
                dispatch(GetAllOrders());
                setRating(1);
                setComment("");
                setOpen(false);
            }
        } catch (error) {
            toast.error("Error updating order status")
        }
    }
    useEffect(() => {
        dispatch(GetAllOrders());
    }, [dispatch]);
    const refundHandler = async (e) => {
        e.preventDefault();
        try {
            setRefundLoading(true);
            const data = await fetch(`/api/order/refund-order/${id}`, {
                method: 'PUT'
            }, { withCredentials: true }
            );
            const res = await data.json();
            if (res.success === true) {
                toast.success(res.message || "Refund requested successfully");
                dispatch(GetAllOrders());
                setRefundLoading(false);
            }
        } catch (error) {
            toast.error("Error processing refund")
            setRefundLoading(false);
        }

    }

    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsFillBagFill size={30} color="crimson" />
                    <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
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
                data.cart.map((item, index) => (
                    <div key={index} className="w-full flex items-start mb-5">
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
                        {!item?.isReviewed && data?.orderStatus === "Delivered" && (
                            <div
                                className={`${styles.button} text-[#fff]`}
                                onClick={() => setOpen(!open) || setSelectedItem(item)}
                            >
                                Add a Review
                            </div>
                        )}
                    </div>
                ))}

            {/* Review Pop UP */}
            {open && (
                <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-[9999] flex items-center justify-center">
                    <div className="w-[85%] md:w-[45%] h-min bg-[#fff] shadow rounded-md p-3">
                        <div className="w-full flex justify-end p-3">
                            <RxCross1
                                size={30}
                                onClick={() => setOpen(false)}
                                className="cursor-pointer"
                            />
                        </div>
                        <h2 className="text-[30px] font-[500] font-Poppins text-center">
                            Give a Review
                        </h2>
                        <br />
                        <div className="w-full flex items-center">
                            <img
                                src={`${selectedItem?.images[0]?.url}`}
                                alt=""
                                className="w-[80px] h-[80px]"
                            />
                            <div>
                                <div className="pl-3 text-[20px]">
                                    {selectedItem?.productName}
                                </div>
                                <h4 className="pl-3 text-[18px] text-gray-600">
                                    US$ {selectedItem?.discountPrice} * {selectedItem?.qty}
                                </h4>
                            </div>
                        </div>
                        <br />
                        <br />
                        {/* Ratings */}
                        <h5 className="pl-3 text-[20px] font-[500]">
                            Give a Rating <span className="text-red-500">*</span>
                        </h5>
                        <div className="flex w-full ml-2 pt-1">
                            {[1, 2, 3, 4, 5].map((i) =>
                                rating >= i ? (
                                    <AiFillStar
                                        key={i}
                                        className="mr-1 cursor-pointer"
                                        color="rgb(246,186,0)"
                                        size={25}
                                        onClick={() => setRating(i)}
                                    />
                                ) : (
                                    <AiOutlineStar
                                        key={i}
                                        className="mr-1 cursor-pointer"
                                        color="rgb(246,186,0)"
                                        size={25}
                                        onClick={() => setRating(i)}
                                    />
                                ),
                            )}
                        </div>
                        <br />
                        <div className="w-full ml-3">
                            <label className="block text-[20px] font-[500]">
                                Write a comment
                                <span className=" ml-2 font-[400] text-[16px] text-[#00000052]">
                                    (optional)
                                </span>
                            </label>
                            <textarea
                                name="comment"
                                cols={20}
                                rows={5}
                                placeholder="How was youe product? Write your expression about it!"
                                className="mt-2 w-[95%] border p-2 outline-none rounded-md"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className={`${styles.button} text-white text-[20px] ml-3`}
                            onClick={rating > 1 && reviewHandler}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            )}
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
                    <br />
                    {
                        data?.orderStatus === "Delivered" && (
                            <div className={`${styles.button} bg-yellow-500 text-white`} onClick={refundHandler}>
                                {refundLoading ? "Processing..." : "Give a Refund"}
                            </div>
                        )
                    }
                    {
                        data?.orderStatus === "Processing refund" && (
                            <div className={`text-red-600 font-[500]`}>
                                We will Refund your money within 7 working days
                            </div>
                        )
                    }
                </div>
            </div>
            <br />
            <br />
            <Link to="/">
                <div className={`${styles.button} text-white`}>Send Message</div>
            </Link>
        </div >
    );
}
