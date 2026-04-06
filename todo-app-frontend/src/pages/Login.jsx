import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../forms.css"


export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const API_URL = "http://localhost:8000";

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }

            }
        }

        return cookieValue;
    };

    const fetchCSRFToken = async () => {
        await fetch(`${API_URL}/get-csrf/`, {
            credentials: "include",
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        await fetchCSRFToken();

        let csrfToken = getCookie("csrftoken");
        let attempts = 0;
        while (!csrfToken && attempts < 10) {
            await new Promise(resolve => setTimeout(resolve, 50));
            csrfToken = getCookie("csrftoken");
            attempts++;
        }

        if (!csrfToken) {
            console.error("CSRF token not found");
            setErrors({ __all__: ["Failed to get CSRF token"] });
            return
        }

        const loginData = { username, password };
        const response = await fetch(`${API_URL}/accounts/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,

            },
            credentials: "include",
            body: JSON.stringify(loginData),
        });

        try {
            const data = await response.json();

            if (data.success) {
                navigate("/");
                setUsername("");
                setPassword("");
                setErrors({});
            } else {
                setErrors(data.errors || {});
            }
        } catch (e) {
            console.error("Error parsing response:", e);
            const text = await response.text();
            console.error("Response text:", text);
            setErrors({ __all__: [`Server error: ${response.status} - ${response.statusText}`] });
        }
    }

    return (
        <div className="forms log-in d-flex flex-column gap-2 justify-content-center align-items-center">
            <h1>Log In</h1>
            <form onSubmit={handleLogin} className="d-flex flex-column justify-content-center align-items-center">
                 <label>Username</label>
                <input type="Text" value={username} onChange={(e) => setUsername(e.target.value)} />
                {errors.username && (<ul classNameName="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.username.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && (
                    <ul classNameName="errorlist">
                        {errors.password.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                )}
                
                <button className="form-button">Submit</button>
            </form>
            <Link to="/accounts/register/">Don`t have an account? Click here to sign in</Link>
        </div>
    )
}
