export function CompletedTaskCard({ task }) {
    return (
        <div id="completed-tasks-section">
            
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
                        <h3>{ task.name }</h3>
                        <p class="date">Created at: { task.created_at }</p>
                        <p class="status">Status: { task.status }</p>
                        <p class="date">Completed at: { task.accomplished_at }</p>
                    </div>
                    <div class="task-card-back">
                        <p class="desc">{ task.description }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}