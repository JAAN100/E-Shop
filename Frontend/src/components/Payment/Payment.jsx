import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Payment = () => {
    const [orderData, setOrderData] = useState([]);
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    }, [1]);
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Payment for order",
                    amount: {
                        currency_code: "USD",
                        value: orderData?.totalPrice?.toFixed(2),
                    },
                }
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING",
            },
        }).then((orderID) => {
            return orderID;
        })
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            let paymentInfo = payer;
            if (paymentInfo !== undefined) {
                payPalPaymentHandler(paymentInfo);
            }
        })
    };
    const payPalPaymentHandler = async (paymentInfo) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        order.paymentInfo = {
            id: paymentInfo.payer_id,
            status: "COMPLETED",
            paymentType: "Paypal",
        };

        axios.post("/api/order/create-order", order, config).then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order placed successfully");
            localStorage.removeItem("latestOrder", JSON.stringify([]));
            localStorage.removeItem("cart", JSON.stringify([]));
            dispatch({ type: "ClearCartRequest" });
        })
    };
    const cashOnDeliveryHandler = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        order.paymentInfo = {
            paymentType: "Cash on Delivery",
        };
        axios.post("/api/order/create-order", order, config).then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order placed successfully");
            localStorage.removeItem("latestOrder", JSON.stringify([]));
            localStorage.removeItem("cart", JSON.stringify([]));
            dispatch({ type: "ClearCartRequest" });
        })
    };
    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),
    };


    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user,
        totalPrice: orderData?.totalPrice,
        subTotalPrice: orderData?.subTotalPrice,
        shipping: orderData?.shipping,
        discountPrice: orderData?.discountPrice,
    };

    const paymentHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                "/api/payment/process",
                paymentData,
                config,
            );
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.fullName,
                        email: user.email,
                    },
                },
            });
            if (result.error) {
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        paymentType: "Credit Card",
                    };
                    axios.post("/api/order/create-order", order, config).then((res) => {
                        setOpen(false);
                        navigate("/order/success");
                        toast.success("Order placed successfully");
                        localStorage.removeItem("latestOrder", JSON.stringify([]));
                        localStorage.removeItem("cart", JSON.stringify([]));
                        dispatch({ type: "ClearCartRequest" });
                    })
                }
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        paymentHandler={paymentHandler}
                        onApprove={onApprove}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}
                        createOrder={createOrder}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData orderData={orderData} />
                </div>
            </div>
        </div>
    );
};

const PaymentInfo = ({
    user,
    open,
    setOpen,
    paymentHandler,
    onApprove,
    cashOnDeliveryHandler,
    createOrder,
}) => {
    const [select, setSelect] = useState(1);

    return (
        <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* select buttons */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(1)}
                    >
                        {select === 1 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Debit/credit card
                    </h4>
                </div>

                {/* pay with card */}
                {select === 1 ? (
                    <div className="w-full flex border-b">
                        <form className="w-full" onSubmit={paymentHandler}>
                            <div className="w-full flex pb-3">
                                <div className="w-[50%]">
                                    <label className="block pb-2">Name On Card</label>
                                    <input
                                        required
                                        placeholder={user && user.fullName}
                                        className={`${styles.input} !h-[35px] !w-[95%]`}
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">Exp Date</label>
                                    <CardExpiryElement
                                        className={`${styles.input} !w-[95%] !h-[35px]`}
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "19px",
                                                    lineHeight: "1.5",
                                                    color: "#444",
                                                },
                                                empty: {
                                                    color: "#3a120a",
                                                    backgroundColor: "transparent",
                                                    "::placeholder": {
                                                        color: "#444",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex pb-3">
                                <div className="w-[50%]">
                                    <label className="block pb-2">Card Number</label>
                                    <CardNumberElement
                                        className={`${styles.input} !h-[35px] !w-[95%]`}
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "19px",
                                                    lineHeight: "1.5",
                                                    color: "#444",
                                                },
                                                empty: {
                                                    color: "#3a120a",
                                                    backgroundColor: "transparent",
                                                    "::placeholder": {
                                                        color: "#444",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">CVC</label>
                                    <CardCvcElement
                                        className={`${styles.input} !h-[35px] !w-[95%]`}
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "19px",
                                                    lineHeight: "1.5",
                                                    color: "#444",
                                                },
                                                empty: {
                                                    color: "#3a120a",
                                                    backgroundColor: "transparent",
                                                    "::placeholder": {
                                                        color: "#444",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            />
                        </form>
                    </div>
                ) : null}
            </div>

            <br />
            {/* paypal payment */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(2)}
                    >
                        {select === 2 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Paypal
                    </h4>
                </div>

                {/* pay with card */}
                {select === 2 ? (
                    <div className="w-full flex border-b">
                        <div className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded cursor-pointer text-[18px] font-[600]`}
                            onClick={() => setOpen(true)}
                        >
                            Pay Now
                        </div>{
                            open && (
                                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[9999]">
                                    <div className="w-full md:w-[40%] h-screen md:h-[80vh] bg-[#fff] rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                                        <div className="w-full flex justify-end">
                                            <RxCross1 size={30} onClick={() => setOpen(false)} className="absolute top-4 right-4 cursor-pointer text-[24px] text-[#000]" />
                                        </div>
                                        <PayPalScriptProvider
                                            options={{
                                                "client-id": import.meta.env.VITE_CLIENT_ID,
                                            }}
                                        >
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                onApprove={onApprove}
                                                createOrder={createOrder}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ) : null}
            </div>

            <br />
            {/* cash on delivery */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(3)}
                    >
                        {select === 3 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Cash on Delivery
                    </h4>
                </div>

                {/* cash on delivery */}
                {select === 3 ? (
                    <div className="w-full flex">
                        <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                            <input
                                type="submit"
                                value="Confirm"
                                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            />
                        </form>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

const CartData = ({ orderData }) => {
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">
                    ${orderData?.subTotalPrice?.toFixed(2)}
                </h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">
                    ${orderData?.shipping?.toFixed(2)}
                </h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">
                    {orderData?.discountPrice
                        ? "- $" + orderData?.discountPrice?.toFixed(2)
                        : "-"}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                ${orderData?.totalPrice?.toFixed(2)}
            </h5>
            <br />
        </div>
    );
};

export default Payment;