export default function TaskPanel() {
  return (
    <div className="task-panel">
      <h3>Tareas Pendientes</h3>
      <ul>
        <li>
          <input type="checkbox" id="task1" />
          <label htmlFor="task1"> Práctica de laboratorio</label>
        </li>
        <li>
          <input type="checkbox" id="task2" />
          <label htmlFor="task2"> Subir avance del proyecto</label>
        </li>
      </ul>
    </div>
  );
}