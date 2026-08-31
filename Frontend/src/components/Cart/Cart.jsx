import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart.js";
import { addToCart } from "../../redux/actions/cart.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export default function Cart({ setOpenCart }) {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const totalPrice =
        cart && cart.reduce((acc, item) => acc + item.discountPrice * item.qty, 0);
    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data));
    };
    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    };
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50">
            <div className="fixed top-0 right-0 h-screen w-[85%] sm:w-[400px] bg-white flex flex-col justify-between shadow-xl">
                {
                    cart && cart.length === 0 ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                <RxCross1
                                    className="cursor-pointer hover:text-red-800"
                                    size={25} onClick={() => setOpenCart(false)} />
                            </div>
                            <div>
                                <h5>Cart Item is empty</h5>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto">
                                <div className="flex w-full justify-end pt-5 pr-5">
                                    <RxCross1
                                        className="cursor-pointer hover:text-red-800"
                                        size={25}
                                        onClick={() => setOpenCart(false)}
                                    />
                                </div>
                                <div className={`${styles.normalFlex} p-4`}>
                                    <IoBagHandleOutline size={26} className="sm:hidden" />
                                    <IoBagHandleOutline size={30} className="hidden sm:block" />
                                    <h5 className="pl-2 text-[18px] sm:text-[20px] font-[500]">
                                        {cart.length} Items
                                    </h5>
                                </div>
                                {/* Cart Single Item */}
                                <div className="w-full border-t">
                                    {cart &&
                                        cart.map((i, index) => (
                                            <CartSingle
                                                key={index}
                                                data={i}
                                                quantityChangeHandler={quantityChangeHandler}
                                                removeFromCartHandler={removeFromCartHandler}
                                            />
                                        ))}
                                </div>
                            </div>
                            <div className="px-5 mb-3 pt-3 border-t bg-white">
                                {/* Checkout button */}
                                <Link to="/checkout">
                                    <div className="w-full h-[45px] flex items-center justify-center bg-[#332ac8] rounded-[3px] px-2">
                                        <h1 className="text-white text-[15px] sm:text-[18px] font-[600] text-center truncate">
                                            Proceed to Checkout USD${totalPrice}
                                        </h1>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
    const [value, setValue] = React.useState(data.qty);
    const totalPrice = data?.discountPrice * value;
    const dispatch = useDispatch();

    const increaseQty = (data) => {
        if (data.stock < value + 1) {
            toast.error("Product stock limited!");
        } else {
            setValue(value + 1);
            const updatedCart = { ...data, qty: value + 1 };
            quantityChangeHandler(updatedCart);
        }
    };
    const decreaseQty = (data) => {
        if (value > 1) {
            setValue(value === 1 ? 1 : value - 1);
            const updatedCart = { ...data, qty: value === 1 ? 1 : value - 1 };
            quantityChangeHandler(updatedCart);
        }
    };
    return (
        <div className="border-b p-3 sm:p-4">
            <div className="w-full flex items-center">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                        className="bg-[#e44343] border border-[#e4434373] rounded-full w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => increaseQty(data)}
                    >
                        <HiPlus size={18} className="text-white" />
                    </div>
                    <span className="py-[4px]">{data.qty}</span>
                    <div
                        className="bg-[#8b90984f] rounded-full w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            decreaseQty(data);
                        }}
                    >
                        <HiOutlineMinus size={18} className="text-white" />
                    </div>
                </div>
                <img
                    src={`${data?.images[0]?.url}`}
                    alt={`${data?.productName}`}
                    className="flex-shrink-0 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] ml-2 mr-2 object-cover"
                />
                <div className="pl-[5px] min-w-0 flex-1">
                    <h1 className="text-[13px] sm:text-[15px] line-clamp-2">
                        {data?.productName}
                    </h1>
                    <h4 className="font-[400] text-[13px] sm:text-[15px] text-[#00000082]">
                        ${data?.discountPrice} * {value}
                    </h4>
                    <h3 className="font-[600] text-[15px] sm:text-[17px] text-[#d02222]">
                        US${totalPrice}
                    </h3>
                </div>
                <RxCross1
                    className="cursor-pointer flex-shrink-0 ml-1"
                    onClick={() => removeFromCartHandler(data)}
                />
            </div>
        </div>
    );
};
