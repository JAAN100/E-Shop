import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Activation() {
    const { activation_token } = useParams(); // route must be 'activation/:activation_token'
    const [error, setError] = useState(false);
    const calledToken = useRef(null); // tracks which token we've already submitted

    useEffect(() => {
        if (!activation_token) return;
        if (calledToken.current === activation_token) return; // blocks StrictMode's 2nd invoke
        calledToken.current = activation_token;

        const activationEmail = async () => {
            try {
                const res = await fetch("/api/shop/activation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ activation_token }),
                });
                const data = await res.json();
                if (data.success !== false) {
                    setError(false);
                    return;
                }
                setError(true);
            } catch (err) {
                setError(true);
            }
        };

        activationEmail();
    }, []); // include the token so a real navigation to a different token still fires

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {error ? <p>Your token is expired!</p> : <p>Your account has been created successfully!</p>}
        </div>
    );
}