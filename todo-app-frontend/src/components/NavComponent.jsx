import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function NavComponent() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const isAuthenticated = !!user;

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

    const handleLogout = async () => {
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
            return
        }
        fetch(`${API_URL}/accounts/logout/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken
            },
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Logout failed");
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    logout(); 
                    navigate("/accounts/login");
                }
            })


    };



    return (
        <>
            <nav className="d-flex flex-column gap-4 align-items-center justify-content-center">
                {!isAuthenticated ? (
                    <div className="tooltip-container">
                        <Link to="/login">
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <span className="tooltip-text">Log In</span>
                        </Link>

                    </div>
                ) : (
                    <>
                        <div className="tooltip-container">
                            <Link to="/">
                                <i className="fa-solid fa-house"></i>
                                <span className="tooltip-text">Home</span>
                            </Link>
                        </div>
                        <div className="tooltip-container">
                            <Link to={`/profile/${user.id}`}>
                                <i className="fa-solid fa-user"></i>
                                <span className="tooltip-text">My Profile</span>
                            </Link>
                        </div>
                        <div className="tooltip-container">
                            <Link to="/tasks/add">
                                <i className="fa-solid fa-circle-plus"></i>
                                <span className="tooltip-text">Add task</span>
                            </Link>
                        </div>
                        <div className="tooltip-container">
                            <Link to="/tasks">
                                <i className="fa-solid fa-border-all"></i>
                                <span className="tooltip-text">All tasks</span>
                            </Link>
                        </div>
                        <div className="tooltip-container">
                            <Link to="#" onClick={handleLogout}>
                                <i className="fa-solid fa-person-running"></i>
                                <span className="tooltip-text">Log Out</span>
                            </Link>
                        </div>

                    </>
                )}
            </nav>
        </>

    );
}

























































