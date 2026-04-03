import "./tasks.css"

export function PendingTaskCard({task, onComplete}) {
    const dueColor = () => {
        if (!task.due_by) return "black";
        const dueDate = new Date(task.due_by);
        const today = new Date();
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays >= 3) return "green";
        if (diffDays === 2) return "orange";
        return "red";
    };


    return (
        <div className="task-card d-flex" id="task-{{ task.pk }}" onclick={e => e.currentTarget.classNameList.toggle("flipped")}>
            <div className="task-card-inner">
                <div className="task-card-front">
                    <div className="menu-container">
                        <details id="task-details">
                            <summary ></summary>
                            <div className="popup-menu">
                                {task.canEdit && <p><a href={`/edit-task/${task.id}`} className="times-new-roman">Edit</a></p>}
                                {task.canDelete && <p><a href={`/delete-task/${task.id}`} className="times-new-roman">Delete</a></p>}
                            </div>
                        </details>
                    </div>
                    <h3>{task.name}</h3>
                    <p className="date">Created at: {task.created_at }</p>
                    <p className="status">Status: {task.status}</p>
                    {task.due_by && <p className="due-date" style={{ color:dueColor()}}>Due by: {task.due_by}</p>}
                    <div className="tooltip-container">
                        <button type="button" className="complete-btn" data-task-id="{{ task.pk }}" onClick={() => onComplete(task.id)}>
                            <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <span className="tooltip-text-completed">Mark as completed</span>
                    </div>
                </div>
                <div className="task-card-back">
                    <p className="desc">{task.description}</p>
                </div>
            </div>

        </div>
    )
}