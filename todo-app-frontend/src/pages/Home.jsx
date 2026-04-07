import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavComponent } from "../components/NavComponent"
import { PendingTaskCard } from "./Tasks/PendingTaskCard"
import { CompletedTaskCard } from "./Tasks/CompletedTaskCard"

export function Home({ user }) {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [activeSection, setActiveSection] = useState("pending");

    const location = useLocation();
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
        await fetch(`${API_URL}/get-csrf/`, {
            credentials: "include",
        });
    };


    useEffect(() => {
        fetchCSRFToken();
    }, []);

    useEffect(() => {
        fetch(`${API_URL}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPendingTasks(data.pending_tasks);
                setCompletedTasks(data.completed_tasks);
            });
    }, [location]);


    const showPendingTasks = () => setActiveSection("pending");
    const showCompletedTasks = () => setActiveSection("completed");



    const completeTask = (taskId) => {
        const url = `${API_URL}/tasks/${taskId}/complete.ajax/`;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPendingTasks(prev => prev.filter(t => t.id !== taskId));
                    setCompletedTasks(prev => [...prev, data.task]);
                }
            });
    };




    return (
        <>
            <NavComponent user={user} />
            <div className="content-container">
                <div className="type-tasks">
                    <button onClick={showPendingTasks} id="pending-tasks">Pending tasks</button>
                    <button onClick={showCompletedTasks} id="completed-tasks">Completed tasks</button>
                </div>

                {activeSection === "pending" && (
                    <div className="tasks-container d-flex justify-content-center gap-3">
                        {pendingTasks.length ? pendingTasks.map(task => (
                            <PendingTaskCard key={task.id} task={task} onComplete={completeTask} />
                        )) : <h1 className="text-center"> No tasks to show</h1>}
                    </div>
                )}

                {activeSection === "completed" && (
                    <div className="tasks-container d-flex justify-content-center gap-3">
                        {completedTasks.length ? completedTasks.map(task => (
                            <CompletedTaskCard key={task.id} task={task} />
                        )) : <h1 className="text-center"> No tasks to show</h1>}
                    </div>
                )}
            </div>
        </>


    )
}