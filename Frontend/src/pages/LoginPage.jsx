import React, { useEffect } from 'react'
import Login from '../components/Login/Login.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import Loader from '../components/Layout/Loader.jsx'
function LoginPage() {
    const { isAuthenticated, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/");
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || isAuthenticated) {
        return <Loader />
    }
    return (
        <div>
            <Login />
        </div>
    )
}


export default LoginPage;
