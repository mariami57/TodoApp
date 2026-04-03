import { useEffect, useState } from "react";

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
        <div class="content-container">
            <div class="type-tasks">
                <button onClick={showPendingTasks} id="pending-tasks">Pending tasks</button>
                <button onClick={showCompletedTasks} id="completed-tasks">Completed tasks</button>
            </div>

            {activeSection === "pending" && (
                <div class="tasks-container d-flex justify-content-center gap-3">
                    {pendingTasks.length ? pendingTasks.map(task => (
                        <PendingTaskCard key={task.id} task={task} onComplete={completeTask} />
                    )) : <h1 class="text-center"> No tasks to show</h1>}
                </div>    
            )}

            {activeSection === "completed" && (
                <div class="tasks-container d-flex justify-content-center gap-3">
                    {completedTasks.length ? completeTasks.map(task => (
                        <CompletedTaskCard key={task.id} task={task} />
                    )) : <h1 class="text-center"> No tasks to show</h1>}
                </div>
            )};

            <div class="tasks-container d-flex justify-content-center gap-3">
                <div id="pending-tasks-section">
                    {% for task in pending_tasks %}
                    <div class="task-card d-flex" id="task-{{ task.pk }}" onclick="this.classList.toggle('flipped')">
                        <div class="task-card-inner">
                            <div class="task-card-front">
                                <div class="menu-container">
                                    <details id="task-details">
                                        <summary ></summary>
                                        <div class="popup-menu">
                                            <p><a href="{% url 'edit-task' pk=task.pk %}" class="times-new-roman">Edit</a></p>
                                            <p><a href="{% url 'delete-task' pk=task.pk %}" class="times-new-roman">Delete</a></p>
                                        </div>
                                    </details>
                                </div>
                                <h3>{{ task.name }}</h3>
                                <p class="date">Created at: {{ task.created_at }}</p>
                                <p class="status">Status: {{ task.status }}</p>
                                <p class="due-date">Due by: {{ task.due_by | date:"Y-m-d" }}</p>
                                <div class="tooltip-container">
                                    <button type="button" class="complete-btn" data-task-id="{{ task.pk }}" data-task-url="{% url 'complete-task' task.pk %}">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </button>
                                    <span class="tooltip-text-completed">Mark as completed</span>
                                </div>
                            </div>
                            <div class="task-card-back">
                                <p class="desc">{{ task.description }}</p>
                            </div>
                        </div>

                    </div>
                    {% empty %}
                    <h1 class="text-center"> No tasks to show</h1>
                    {% endfor %}
                </div>
            </div>
            <div class="tasks-container d-flex justify-content-center gap-3">
                <div id="completed-tasks-section">
                    {% for task in completed_tasks %}
                    <div class="task-card d-flex" onclick="this.classList.toggle('flipped')">
                        <div class="task-card-inner">
                            <div class="task-card-front">
                                <div class="menu-container">
                                    <details id="task-details">
                                        <summary ></summary>
                                        <div class="popup-menu">
                                            <p><a href="{% url 'delete-task' pk=task.pk %}?#completed" class="times-new-roman">Delete</a></p>
                                        </div>
                                    </details>
                                </div>
                                <h3>{{ task.name }}</h3>
                                <p class="date">Created at: {{ task.created_at }}</p>
                                <p class="status">Status: {{ task.status }}</p>
                                <p class="date">Completed at: {{ task.accomplished_at }}</p>
                            </div>
                            <div class="task-card-back">
                                <p class="desc">{{ task.description }}</p>
                            </div>
                        </div>
                    </div>
                    {% empty %}
                    <h1> No tasks to show</h1>
                    {% endfor %}
                </div>
            </div>
        </div>

    )
}