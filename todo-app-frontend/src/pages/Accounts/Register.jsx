import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../forms.css"

export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

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
        await fetch(`${API_URL}/accounts/get-csrf/`, {
            credentials: "include",
        });
    };


const handleRegister = async (e) => {
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
        return;
    }

    const userData = { username, email, password1, password2 };
    const response = await fetch(`${API_URL}/accounts/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        credentials: "include",
        body: JSON.stringify(userData)
    });

        try {
            const data = await response.json();

            if (data.success) {
                navigate("/");
                setUsername("");
                setEmail("");
                setErrors({});
            } else {
                setErrors(data.errors || {});
            }
        } catch (e) {
            console.error("Failed to parse response as JSON:", e);
            const text = await response.text();
            console.error("Response body:", text.substring(0, 500));
            setErrors({ __all__: [`Server error: ${response.status} - ${response.statusText}`] });
        }
    }

    return (
        <div className="forms sign-in d-flex flex-column gap-2 justify-content-center align-items-center">
            <h1>Sign in</h1>
            <form onSubmit={handleRegister} className="d-flex flex-column justify-content-center align-items-center">
                <label>Username</label>
                <input type="Text" value={username} onChange={(e) => setUsername(e.target.value)} />
                {errors.username && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.username.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}

                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.email.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}
                <label>Password</label>
                <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                {errors.password1 && (
                    <ul className="errorlist">
                        {errors.password1.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                )}

                <label>Confirm Password</label>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                {errors.password2 && (
                    <ul className="errorlist">
                        {errors.password2.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                )}

                {errors.__all__ && (
                    <ul className="errorlist">
                        {errors.__all__.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                )}
                <button className="form-button">Submit</button>
            </form>
        </div>
    )
}