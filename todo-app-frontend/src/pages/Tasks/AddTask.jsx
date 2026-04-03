import { useState } from "react";
import "../../forms.css"

export function AddTask({ onCreate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueBy, setDueBy] = useState("");
    const [errors, setErrors] = useState({});

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { name, description, due_by: dueBy };
        const response = await fetch("/tasks/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (data.success) {
            onCreate(data.task);
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
                <input type="text" value={description} onChange={(e) => setName(e.target.value)} />

                {errors.description && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.description.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}


                <label>Due By</label>
                <input type="date" value={dueBy} onChange={(e) => setDueBy(e.target.value)} />
                {errors.due_by && (<ul className="errorlist d-flex flex-column justify-content-center align-items-center">
                    {errors.name.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}

                </ul>)}
                <button className="form-button">Submit</button>
            </form>
        </div>

    )
}