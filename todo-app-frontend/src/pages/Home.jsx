import { useEffect, useState } from "react";
import { PendingTaskCard } from "./Tasks/PendingTaskCard"
import { CompletedTaskCard } from "./Tasks/CompletedTaskCard"

export function Home() {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [activeSection, setActiveSection] = useState("pending");

    useEffect(() => {
        fetch("/api/home")
            .then(res => res.json())
            .then(data => {
                setPendingTasks(data.pending_tasks);
                setCompletedTasks(data.completed_tasks);
            });
    }, [])

    const showPendingTasks = () => setActiveSection("pending");
    const showCompletedTasks = () => setActiveSection("completed");

    const completeTask = (taskId) => {
        const url = `/api/complete-task/${taskId}/`; // adjust if your API differs
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "X-Requested-With": "XMLHttpRequest"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPendingTasks(prev => prev.filter(t => t.id !== taskId));
                    setCompletedTasks(prev => [...prev, data.task]);
                }
            });
    };

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


    return (
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
            )};
        </div>

    )
}