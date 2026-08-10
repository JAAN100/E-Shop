import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import SignUp from '../components/SignUp/SignUp';
function SignUpPage() {
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
            <SignUp />
        </div>
    )
}


export default SignUpPage;