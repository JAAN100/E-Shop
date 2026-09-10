import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginLoader from '../components/Layout/LoginLoader'

export default function Activation() {
    const { activation_token } = useParams(); // route must be 'activation/:activation_token'
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const inFlight = useRef(false); // only blocks while a request is actually pending

    const activationEmail = async () => {
        if (!activation_token || inFlight.current) return;
        inFlight.current = true;
        setStatus('loading');
        try {
            const res = await fetch("/api/user/activation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ activation_token }),
            });
            const data = await res.json();
            setStatus(data.success !== false ? 'success' : 'error');
        } catch (err) {
            setStatus('error');
        } finally {
            inFlight.current = false;
        }
    };

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {status === 'loading' && <LoginLoader />}

            {(status === 'idle' || status === 'error') && (
                <div
                    className="bg-black text-white p-5 rounded-lg text-[25px] cursor-pointer"
                    onClick={activationEmail}
                >
                    {status === 'error' ? 'Try Again' : 'Activate Your Account'}
                </div>
            )}

            {status === 'success' && (
                <div className="text-white text-[25px]">Your account has been activated!</div>
            )}
        </div>
    );
}