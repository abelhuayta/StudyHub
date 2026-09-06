const SECCIONES = [
  {
    titulo: null,
    items: [
      { id: 'home', label: 'Inicio', icono: '🏠' },
    ],
  },
  {
    titulo: 'Académico',
    items: [
      { id: 'cursos', label: 'Mis Cursos', icono: '📚' },
      { id: 'tareas', label: 'Tareas y Pendientes', icono: '📝' },
      { id: 'notas', label: 'Notas y Promedios', icono: '📊' },
      { id: 'calendario', label: 'Calendario', icono: '📅' },
    ],
  },
  {
    titulo: 'Recursos',
    items: [
      { id: 'apuntes', label: 'Apuntes y Archivos', icono: '🗂️' },
      { id: 'comunidad', label: 'Comunidad', icono: '💬' },
    ],
  },
];

export default function Sidebar({ vistaActual, setVistaActual }) {
  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.5rem 1rem;
          background: var(--polo-blue-950, #0a1628);
          gap: 1.5rem;
        }

        .sidebar-titulo {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--polo-blue-50, #f0f6ff);
          margin: 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex-grow: 1;
          overflow-y: auto;
          background color :  var(--polo-blue-400, #6b8cae);
          
        }

        .sidebar-seccion {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-encabezado {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--polo-blue-400, #6b8cae);
          letter-spacing: 0.08em;
          font-weight: 600;
          padding: 0 0.5rem;
          margin-bottom: 0.35rem;
        }

        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: transparent;
          border: none;
          color: var(--polo-blue-100, #cfe0f5);
          padding: 0.6rem 0.8rem;
          text-align: left;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          width: 100%;
          transition: background-color 0.18s ease, color 0.18s ease, transform 0.1s ease;
        }

        .sidebar-icono {
          font-size: 1rem;
          line-height: 1;
        }

        .sidebar-btn:hover {
          background-color: var(--polo-blue-800, #1c3a5e);
          color: var(--polo-blue-50, #f0f6ff);
        }

        .sidebar-btn:active {
          transform: scale(0.98);
        }

        .sidebar-btn.activo {
          background: linear-gradient(90deg, var(--polo-blue-700, #2a4d7a), var(--polo-blue-800, #1c3a5e));
          color: var(--polo-blue-50, #f0f6ff);
          box-shadow: inset 3px 0 0 var(--polo-blue-300, #8fb8e0);
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border-top: 1px solid var(--polo-blue-800, #1c3a5e);
          padding-top: 1rem;
        }
      `}</style>

      <h2 className="sidebar-titulo">StudyHub</h2>

      <nav className="sidebar-nav">
        {SECCIONES.map((seccion, idx) => (
          <div key={idx} className="sidebar-seccion">
            {seccion.titulo && (
              <div className="sidebar-encabezado">{seccion.titulo}</div>
            )}
            {seccion.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setVistaActual(item.id)}
                className={`sidebar-btn ${vistaActual === item.id ? 'activo' : ''}`}
                aria-current={vistaActual === item.id ? 'page' : undefined}
              >
                <span className="sidebar-icono">{item.icono}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => setVistaActual('perfil')}
          className={`sidebar-btn ${vistaActual === 'perfil' ? 'activo' : ''}`}
        >
          <span className="sidebar-icono">👤</span>
          Perfil
        </button>
        <button
          onClick={() => setVistaActual('ajustes')}
          className={`sidebar-btn ${vistaActual === 'ajustes' ? 'activo' : ''}`}
        >
          <span className="sidebar-icono">⚙️</span>
          Ajustes
        </button>
      </div>
    </aside>
  );
}