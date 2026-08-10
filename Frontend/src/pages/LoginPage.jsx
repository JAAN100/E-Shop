import React, { useEffect } from 'react'
import Login from '../components/Login/Login.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
function LoginPage() {
    const { isAuthenticated, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/");
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || isAuthenticated) {
        return <LoaderCircle className="h-[100vh] m-auto animate-spin" size={60} />;
    }
    return (
        <div>
            <Login />
        </div>
    )
}


export default LoginPage;
