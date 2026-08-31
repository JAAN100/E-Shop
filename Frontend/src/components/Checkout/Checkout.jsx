import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);

    const [fullName, setFullName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(0);
    const paymentSubmit = (e) => {
        e.preventDefault();
        if (address1 === "" || address2 === "" || city === "" || country === "" || zipCode === "" || phoneNumber === "") {
            toast.error("Please fill all the fields!");
            return;
        } else {
            const shippingAddress = {
                phoneNumber,
                zipCode,
                address1,
                address2,
                city,
                country,
            };
            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                discountPrice,
                shippingAddress,
                user
            }

            //Update local Storage with the updated orderData
            localStorage.setItem("latestOrder", JSON.stringify(orderData));
            navigate("/payment");
        }
    };
    const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
    const shipping = subTotalPrice * 0.1;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = couponCode;

        const data = await fetch(`/api/coupoun-code/get-coupon-value/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await data.json();
        if (res.success) {
            const shopID = res?.coupounCode?.shopID;

            const isCouponValid = cart && cart.filter((item) => item.shopId === shopID);
            if (isCouponValid.length === 0) {
                toast.error("Coupon code is not valid for this shop!");
                setCouponCodeData(null);
            } else {
                const eligibleProductsPrice = isCouponValid.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
                const discount = (eligibleProductsPrice * res?.coupounCode?.value) / 100;
                setDiscountPrice(discount);
                setCouponCodeData(res?.coupounCode);
                setCouponCode("");
            }
        }
        if (!res.success) {

            toast.error(res.message);
            setCouponCodeData(null);
        }
    };
    const discountPercentage = couponCodeData ? discountPrice : 0;
    const totalPrice = couponCodeData ? subTotalPrice + shipping - discountPercentage : subTotalPrice + shipping;
    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <ShippingInfo
                        user={user}
                        setFullName={setFullName}
                        setEmail={setEmail}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        setZipCode={setZipCode}
                        setAddress1={setAddress1}
                        setAddress2={setAddress2}
                        setCity={setCity}
                        setCountry={setCountry}
                        fullName={fullName}
                        email={email}
                        zipCode={zipCode}
                        address1={address1}
                        address2={address2}
                        city={city}
                        country={country}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        handleSubmit={handleSubmit}
                        totalPrice={totalPrice}
                        shipping={shipping}
                        subTotalPrice={subTotalPrice}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        cart={cart}
                        discountPercentage={discountPercentage}
                    />
                </div>
            </div>
            <div
                className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
                onClick={paymentSubmit}
            >
                <h5 className="text-white">Go to Payment</h5>
            </div>
        </div>
    );
};

const ShippingInfo = ({
    user,
    setFullName,
    setEmail,
    setPhoneNumber,
    setZipCode,
    setAddress1,
    setAddress2,
    setCity,
    setCountry,
    fullName,
    email,
    phoneNumber,
    zipCode,
    address1,
    address2,
    city,
    country,
}) => {
    const [userInfo, setUserInfo] = useState(false);
    const useRef = React.useRef(null);
    return (
        <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500]">Shipping Address</h5>
            <br />
            <form>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className={`${styles.input} !w-[95%]`}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className={`${styles.input}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Phone Number</label>
                        <input
                            type="number"
                            required
                            className={`${styles.input} !w-[95%]`}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Zip Code</label>
                        <input
                            type="number"
                            required
                            className={`${styles.input}`}
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Country</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Choose your country
                            </option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">City</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px] "
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Choose your City
                            </option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Address1</label>
                        <input
                            type="address"
                            required
                            className={`${styles.input} !w-[95%]`}
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">Address2</label>
                        <input
                            type="address"
                            required
                            className={`${styles.input}`}
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <h5
                className="text-[18px] cursor-pointer inline-block text-[#000000a4] active:text-red-600 pt-2"
                onClick={() => {
                    setUserInfo(!userInfo);
                }}
            >
                Choose from saved addresses
            </h5>
            {userInfo && (
                <div className="w-full min-h-[40px] flex items-center justify-center">
                    {user.addresses &&
                        user.addresses.map((i, index) => (
                            <div
                                className="w-full flex"
                                key={i._id}
                                onClick={() => {
                                    setAddress1(i.address1);
                                    setAddress2(i.address2);
                                    setZipCode(i.zipCode);
                                    setCountry(i.country);
                                    setCity(i.city);
                                }}
                            >
                                <input
                                    type="radio"
                                    className="mr-3 cursor-pointer"
                                    ref={useRef}
                                    name="address"
                                />
                                <h5
                                    className="text-[16px] cursor-pointer"
                                    onClick={() => useRef.current.click()}
                                >
                                    {i.addressType}
                                </h5>
                            </div>
                        ))}
                </div>
            )}
            {userInfo && user.addresses && user.addresses.length === 0 && (
                <h5 className="text-[16px] text-[#000000a4] pt-3">
                    No saved addresses found!
                </h5>
            )}
        </div>
    );
};

const CartData = ({ handleSubmit, totalPrice, shipping, subTotalPrice, couponCode, setCouponCode, cart, discountPercentage }) => {
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">${subTotalPrice.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">{discountPercentage ? "- $" + discountPercentage.toString() : "-"}</h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice.toFixed(2)}</h5>
            <br />
            <form onSubmit={handleSubmit} aria-required>
                <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2`}
                    placeholder="Coupoun code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    required
                />
                <input
                    className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Apply code"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default Checkout;
