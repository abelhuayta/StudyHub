export default function Sidebar({ setVistaActual }) {
  return (
    <aside className="sidebar">
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--polo-blue-50)' }}>
        StudyHub
      </h2>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
        <button 
          onClick={() => setVistaActual('home')}
          style={estiloBtnNav}
        >
          🏠 Inicio
        </button>

        <div style={{ margin: '1rem 0 0.5rem 0', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--polo-blue-400)', letterSpacing: '0.05em' }}>
          Académico
        </div>

        <button 
          onClick={() => setVistaActual('cursos')}
          style={estiloBtnNav}
        >
          📚 Mis Cursos
        </button>

        <button 
          onClick={() => setVistaActual('notas')}
          style={estiloBtnNav}
        >
          📊 Notas y Promedios
        </button>

        <button 
          onClick={() => setVistaActual('calendario')}
          style={estiloBtnNav}
        >
          📅 Calendario
        </button>
      </nav>

      <div style={{ borderTop: '1px solid var(--polo-blue-800)', paddingTop: '1rem' }}>
        <button 
          onClick={() => setVistaActual('ajustes')}
          style={estiloBtnNav}
        >
          ⚙️ Ajustes
        </button>
      </div>
    </aside>
  );
}

// Estilo reutilizable para los botones de la barra lateral
const estiloBtnNav = {
  background: 'transparent',
  border: 'none',
  color: 'var(--polo-blue-100)',
  padding: '0.6rem 0.8rem',
  textAlign: 'left',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '500',
  width: '100%',
  transition: 'background-color 0.2s ease, transform 0.1s ease'
};