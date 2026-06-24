import { TASK_STATUSES } from "../constants/statuses";

function TaskCard({ task, onStatusChange, onDelete }) {
  const statusClass = task.status.replaceAll(" ", "").toLowerCase();

  return (
    <article className="taskCard">
      <div className="taskContent">
        <span className={`status ${statusClass}`}>{task.status}</span>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="taskActions">
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          aria-label={`Update status for ${task.title}`}
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button className="deleteButton" type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
