import TaskCard from "./TaskCard";

function TaskList({ tasks, loading, error, onRefresh, onStatusChange, onDelete }) {
  return (
    <section className="tasksPanel">
      <div className="panelTop">
        <div>
          <h2>All Tasks</h2>
          <p>Tasks are loaded directly from the backend API.</p>
        </div>

        <button className="ghostButton" type="button" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="empty">Loading tasks...</p>}

      {!loading && tasks.length === 0 && (
        <p className="empty">No tasks yet. Add your first task from the form.</p>
      )}

      <div className="taskList">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default TaskList;
