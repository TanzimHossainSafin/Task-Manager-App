import { EMPTY_TASK_FORM, TASK_STATUSES } from "../constants/statuses";

function TaskForm({ form, saving, onChange, onSubmit }) {
  return (
    <form className="taskForm" onSubmit={onSubmit}>
      <div className="formTop">
        <h2>Add Task</h2>
        <span>New</span>
      </div>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Enter task title"
        maxLength="150"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Enter task details"
        rows="5"
        required
      />

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={onChange}>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="submit" disabled={saving}>
        {saving ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

TaskForm.defaultProps = {
  form: EMPTY_TASK_FORM
};

export default TaskForm;
