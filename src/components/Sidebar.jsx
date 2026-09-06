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
          padding: 1.75rem 1.1rem;
          background: linear-gradient(180deg, var(--polo-blue-950, #0a1628) 0%, #081120 100%);
          gap: 1.75rem;
          position: relative;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0 0.3rem;
        }

        .sidebar-logo {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f8ff7, #2a5cd6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(79, 143, 247, 0.35);
        }

        .sidebar-titulo {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--polo-blue-50, #f0f6ff);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex-grow: 1;
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: var(--polo-blue-800, #1c3a5e);
          border-radius: 4px;
        }

        .sidebar-seccion {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .sidebar-encabezado {
          font-size: 0.68rem;
          text-transform: uppercase;
          color: var(--polo-blue-400, #5d7ea3);
          letter-spacing: 0.09em;
          font-weight: 700;
          padding: 0 0.6rem;
          margin-bottom: 0.3rem;
        }

        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--polo-blue-200, #a8c3e0);
          padding: 0.65rem 0.75rem;
          text-align: left;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 500;
          width: 100%;
          position: relative;
          overflow: hidden;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease, border-color 0.2s ease;
        }

        .sidebar-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 143, 247, 0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .sidebar-icono-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          font-size: 0.95rem;
          flex-shrink: 0;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .sidebar-label {
          position: relative;
          z-index: 1;
        }

        .sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          color: var(--polo-blue-50, #f0f6ff);
          transform: translateX(2px);
        }

        .sidebar-btn:hover .sidebar-icono-wrap {
          background: rgba(255, 255, 255, 0.09);
          transform: scale(1.06);
        }

        .sidebar-btn:active {
          transform: translateX(2px) scale(0.98);
        }

        .sidebar-btn.activo {
          background: linear-gradient(135deg, rgba(79, 143, 247, 0.18), rgba(42, 92, 214, 0.1));
          border-color: rgba(79, 143, 247, 0.35);
          color: #ffffff;
          font-weight: 600;
        }

        .sidebar-btn.activo::before {
          opacity: 1;
        }

        .sidebar-btn.activo .sidebar-icono-wrap {
          background: linear-gradient(135deg, #4f8ff7, #2a5cd6);
          box-shadow: 0 2px 8px rgba(79, 143, 247, 0.4);
        }

        .sidebar-btn.activo::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: linear-gradient(180deg, #4f8ff7, #2a5cd6);
          border-radius: 0 4px 4px 0;
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.1rem;
        }
      `}</style>

      <div className="sidebar-header">
        <div className="sidebar-logo">🎓</div>
        <h2 className="sidebar-titulo">StudyHub</h2>
      </div>

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
                <span className="sidebar-icono-wrap">{item.icono}</span>
                <span className="sidebar-label">{item.label}</span>
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
          <span className="sidebar-icono-wrap">👤</span>
          <span className="sidebar-label">Perfil</span>
        </button>
        <button
          onClick={() => setVistaActual('ajustes')}
          className={`sidebar-btn ${vistaActual === 'ajustes' ? 'activo' : ''}`}
        >
          <span className="sidebar-icono-wrap">⚙️</span>
          <span className="sidebar-label">Ajustes</span>
        </button>
      </div>
    </aside>
  );
}