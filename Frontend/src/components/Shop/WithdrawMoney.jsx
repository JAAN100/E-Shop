import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllProductsForShop } from "../../redux/actions/product.js";
import { GetAllOrdersForSeller } from "../../redux/actions/order.js";
import styles from "../../styles/styles.js";
export default function WithdrawMoney() {
    const dispatch = useDispatch();
    const { allOrders } = useSelector((state) => state.order);
    const { shop } = useSelector((state) => state.seller);
    const [deliveredOrders, setDeliveredOrders] = React.useState([]);
    React.useEffect(() => {
        dispatch(getAllProductsForShop(shop?._id));
        dispatch(GetAllOrdersForSeller());
    }, [dispatch]);
    React.useEffect(() => {
        const orderData = allOrders?.filter((item) => item.orderStatus === "Delivered") || [];
        setDeliveredOrders(orderData);
    }, [allOrders]);
    const totalEarningWithoutTax = deliveredOrders && deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0);
    const serviceCharges = totalEarningWithoutTax * 0.1;
    const availableBalance = totalEarningWithoutTax - serviceCharges;

    return (
        <div className="w-full h-[88vh] p-8">
            <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
                <h5 className="text-[20px] pb-2 font-[500]">Available Balance ${availableBalance.toFixed(2)}</h5>
                <div className={`${styles.button} text-white`} >
                    Withdraw
                </div>
            </div>
        </div>
    )
}
