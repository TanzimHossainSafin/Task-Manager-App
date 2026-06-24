import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { EMPTY_TASK_FORM } from "./constants/statuses";
import {
  createTask,
  deleteTask as deleteTaskRequest,
  getTasks,
  updateTaskStatus
} from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(EMPTY_TASK_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const data = await getTasks();
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
      const data = await createTask(form);
      setTasks([data, ...tasks]);
      setForm(EMPTY_TASK_FORM);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (taskId, status) => {
    try {
      setError("");
      const data = await updateTaskStatus(taskId, status);
      setTasks(tasks.map((task) => (task.id === taskId ? data : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError("");
      await deleteTaskRequest(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <Header totalTasks={tasks.length} />

      <section className="layout">
        <TaskForm form={form} saving={saving} onChange={handleChange} onSubmit={handleSubmit} />
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onRefresh={fetchTasks}
          onStatusChange={changeStatus}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}

export default App;
