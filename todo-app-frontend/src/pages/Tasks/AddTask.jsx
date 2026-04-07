import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../forms.css"

export function AddTask() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueBy, setDueBy] = useState("");
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
                    break;
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


    const handleSubmit = async (e) => {
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


        const taskData = { name, description, due_by: dueBy };
        const response = await fetch(`${API_URL}/tasks/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            credentials: "include",
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (data.success) {
            navigate("/", { state: { section: "pending" } });
            setName("");
            setDescription("");
            setDueBy("");
            setErrors({});
        } else {
            setErrors(data.errors || {});
        }

    }

    return (
        <div className="forms log-in custom-width d-flex flex-column gap-2 justify-content-center align-items-center">
            <h1>Add task</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                {errors.name && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.name.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                {errors.description && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.description.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}


                <label>Due By</label>
                <input type="date" value={dueBy} onChange={(e) => setDueBy(e.target.value)} />
                {errors.due_by && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.due_by.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}
                <button className="form-button">Submit</button>
            </form>
        </div>

    )
}