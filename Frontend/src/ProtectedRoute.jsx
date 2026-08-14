import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
    if (isLoading === false) {
        if (!isSeller) {
            return <Navigate to="/shop-login" replace />;
        }
        return children;
    }
}

export default ProtectedRoute;