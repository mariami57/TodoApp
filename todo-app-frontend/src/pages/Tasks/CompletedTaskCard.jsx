import "./tasks.css"

export function CompletedTaskCard({ task }) {
    return (
        <div id="completed-tasks-section">
            
            <div className="task-card d-flex" onclick="this.classNameList.toggle('flipped')">
                <div className="task-card-inner">
                    <div className="task-card-front">
                        <div className="menu-container">
                            <details id="task-details">
                                <summary ></summary>
                                <div className="popup-menu">
                                    <p><a href="{% url 'delete-task' pk=task.pk %}?#completed" className="times-new-roman">Delete</a></p>
                                </div>
                            </details>
                        </div>
                        <h3>{ task.name }</h3>
                        <p className="date">Created at: { task.created_at }</p>
                        <p className="status">Status: { task.status }</p>
                        <p className="date">Completed at: { task.accomplished_at }</p>
                    </div>
                    <div className="task-card-back">
                        <p className="desc">{ task.description }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}