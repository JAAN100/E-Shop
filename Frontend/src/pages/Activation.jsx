import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Activation() {
    const { activation_token } = useParams(); // route must be 'activation/:activation_token'
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!activation_token) return;

        const activationEmail = async () => {
            try {
                const res = await fetch("/api/user/activation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // needed to receive the httpOnly cookie sendToken sets
                    body: JSON.stringify({ activation_token }),
                });
                const data = await res.json();
                console.log(data);
                if (data.message !== "Not Found") {
                    setError(false);
                    return;
                }
                setError(true);
            } catch (err) {
                setError(true);
            }
        };

        activationEmail(); // called here, outside its own definition
    }, []);

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {!error ? <p>Your token is expired!</p> : <p>Your account has been created successfully!</p>}
        </div>
    );
}