import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetAllOrders } from '../redux/actions/order.js'
import { useParams } from 'react-router-dom'
export default function TrackOrder() {
    const { orders } = useSelector((state) => state.order);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllOrders());
    }, [dispatch]);
    const data = orders?.find((item) => item._id === id);
    const statusProgress = {
        "Processing": 15,
        "Transfered to delivery partner": 40,
        "Shipping": 65,
        "Received": 85,
        "On the way": 90,
        "Delivered": 100,
    };

    const progress = statusProgress[data?.orderStatus] || 0;
    return (
        <div>
            {data && data.orderStatus != "Processing refund" && (
                <div className="w-full h-[80vh] flex flex-col justify-center items-center">

                    <div className="w-[80%] max-w-[700px]">
                        {/* Progress Bar */}
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-500 rounded-full transition-all duration-700 ease-in-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Current Status */}
                        <h1 className="text-yellow-600 font-medium text-[20px] text-center mt-5">
                            Your order is {data.orderStatus}.
                        </h1>
                    </div>

                </div>
            )}
            {data && data.orderStatus === "Processing refund" && (
                <div className="w-full h-[80vh] flex flex-col justify-center items-center">

                    <div className="w-[80%] max-w-[700px]">
                        {/* Progress Bar */}
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-red-800 rounded-full transition-all duration-700 ease-in-out"
                                style={{ width: `${100}%` }}
                            />
                        </div>

                        {/* Current Status */}
                        <h1 className="text-red-800 font-medium text-[20px] text-center mt-5">
                            Your order is {data.orderStatus} !!!
                        </h1>
                    </div>

                </div>
            )}
            {data && data.orderStatus === "Refund Success" && (
                <div className="w-full h-[80vh] flex flex-col justify-center items-center">

                    <div className="w-[80%] max-w-[700px]">
                        {/* Progress Bar */}
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all duration-700 ease-in-out"
                                style={{ width: `${100}%` }}
                            />
                        </div>

                        {/* Current Status */}
                        <h1 className="text-green-500 font-medium text-[20px] text-center mt-5">
                            Your order is {data.orderStatus} !!!
                        </h1>
                    </div>

                </div>
            )}
        </div>
    )
}
