import { Link } from "react-router-dom";
import "../base.css"

export function NavComponent({ user }) {
    const isAuthenticated = !!user;

    const handleLogout = async (e) => {
        e.preventDefault();

        await fetch("/logout/", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCSRFToken(),
            },
        });

        window.location.href = "/login";
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

function getCSRFToken() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken"))
        ?.split("=")[1];
}


























































