function Header({ totalTasks }) {
  return (
    <section className="header">
      <div>
        <h1>Task Manager</h1>
        <p className="subtitle">Create, track, and update your daily work from one clean screen.</p>
      </div>

      <div className="countBox">
        <span>{totalTasks}</span>
        <small>Total Tasks</small>
      </div>
    </section>
  );
}

export default Header;
