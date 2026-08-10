import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

// Static sample data — replace with real data once wired to Checkout/auth
const staticUser = {
    name: "Hassan Ahmed",
    email: "hassan@example.com",
};

const staticOrderData = {
    cart: [
        { name: "Wireless Headphones", qty: 1, discountPrice: 45 },
        { name: "Smart Watch", qty: 2, discountPrice: 60 },
    ],
    shippingAddress: {
        address1: "House 12, Street 5",
        address2: "Gulberg III",
        zipCode: "54000",
        country: "PK",
        city: "PB",
    },
    subTotalPrice: 165,
    shipping: 16.5,
    discountPrice: null,
    totalPrice: 181.5,
};

// Simulated order completion — replace with the real order flow later
const completeOrder = (navigate) => {
    toast.success("Order successful!");
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("latestOrder", JSON.stringify([]));
    navigate("/order/success/123");
};

const Payment = () => {
    const user = staticUser;
    const orderData = staticOrderData;
    const navigate = useNavigate();

    const paymentHandler = (e) => {
        e.preventDefault();
        completeOrder(navigate);
    };

    const paypalPaymentHandler = () => {
        completeOrder(navigate);
    };

    const cashOnDeliveryHandler = (e) => {
        e.preventDefault();
        completeOrder(navigate);
    };

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo
                        user={user}
                        paymentHandler={paymentHandler}
                        paypalPaymentHandler={paypalPaymentHandler}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}
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
    paymentHandler,
    paypalPaymentHandler,
    cashOnDeliveryHandler,
}) => {
    const [select, setSelect] = useState(1);

    return (
        <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* select buttons */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
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
                                        placeholder={user && user.name}
                                        className={`${styles.input} !w-[95%] text-[#444]`}
                                        defaultValue={user && user.name}
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">Exp Date</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="MM / YY"
                                        className={`${styles.input}`}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex pb-3">
                                <div className="w-[50%]">
                                    <label className="block pb-2">Card Number</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="1234 1234 1234 1234"
                                        className={`${styles.input} !h-[35px] !w-[95%]`}
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">CVV</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="CVC"
                                        className={`${styles.input} !h-[35px]`}
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
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
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

                {select === 2 ? (
                    <div className="w-full flex border-b pb-4">
                        <div
                            className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            onClick={paypalPaymentHandler}
                        >
                            Pay Now
                        </div>
                    </div>
                ) : null}
            </div>

            <br />
            {/* cash on delivery */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
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
    const shipping = orderData?.shipping?.toFixed(2);
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">${shipping}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}</h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                ${orderData?.totalPrice}
            </h5>
            <br />
        </div>
    );
};

export default Payment;