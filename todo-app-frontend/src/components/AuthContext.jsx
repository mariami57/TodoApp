import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const API_URL = "http://localhost:8000";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

        let csrfToken = getCookie("csrftoken");
        let attempts = 0;
        while (!csrfToken && attempts < 10) {
            await new Promise(resolve => setTimeout(resolve, 50));
            csrfToken = getCookie("csrftoken");
            attempts++;
        }

        if (!csrfToken) {
            console.error("CSRF token not found");
            return
        }

    };



    useEffect(() => {
        fetch("http://localhost:8000/user/", {
            credentials: "include",
        })

            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setUser(data.user);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        const csrfToken = await fetchCSRFToken();
        await fetch(`${API_URL}/logout/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": csrfToken,
            },
        });

        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext);
}
