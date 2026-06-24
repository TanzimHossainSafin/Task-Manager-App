import { useEffect, useState } from "react";

const statuses = ["To Do", "In Progress", "Done"];

const emptyForm = {
  title: "",
  description: "",
  status: "To Do"
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load tasks");
      }

      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add task");
      }

      setTasks([data, ...tasks]);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (taskId, status) => {
    try {
      setError("");
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update task");
      }

      setTasks(tasks.map((task) => (task.id === taskId ? data : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError("");
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete task");
      }

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <section className="header">
        <div>
          <p className="eyebrow">Simple CRUD App</p>
          <h1>Task Manager</h1>
        </div>
        <div className="countBox">
          <span>{tasks.length}</span>
          <small>Total Tasks</small>
        </div>
      </section>

      <section className="layout">
        <form className="taskForm" onSubmit={handleSubmit}>
          <h2>Add Task</h2>

          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter task details"
            rows="4"
            required
          />

          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "Add Task"}
          </button>
        </form>

        <section className="tasksPanel">
          <div className="panelTop">
            <h2>All Tasks</h2>
            <button className="ghostButton" type="button" onClick={fetchTasks}>
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
              <article className="taskCard" key={task.id}>
                <div className="taskContent">
                  <span className={`status ${task.status.replaceAll(" ", "").toLowerCase()}`}>
                    {task.status}
                  </span>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>

                <div className="taskActions">
                  <select
                    value={task.status}
                    onChange={(event) => changeStatus(task.id, event.target.value)}
                    aria-label={`Update status for ${task.title}`}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button className="deleteButton" type="button" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
