import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (loading === false) {
        if (!isAuthenticated) {
            return <Navigate to="/log-in" replace />;
        }
        return children;
    }
};
export const ShopProtectedRoute = ({ children }) => {
    const { isLoading, isSeller } = useSelector((state) => state.seller);
    if (isLoading === true) {
        return <Loader />
    } else {
        if (!isSeller) {
            return <Navigate to="/shop-login" replace />;
        }
        return children;
    }
}

export default ProtectedRoute;