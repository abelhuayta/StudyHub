import { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Asegúrate de que la ruta sea correcta

export default function DashboardHome({ setVistaActual, setCursoSeleccionado }) {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Este efecto se ejecuta automáticamente al abrir el dashboard
  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('id', { ascending: true }); // Ordena por ID o por 'created_at'

      if (error) {
        console.error('Error al cargar cursos:', error);
      } else {
        setCursos(data);
      }
      setCargando(false);
    };

    fetchCursos();
  }, []);

  const handleAbrirCurso = (nombreCurso) => {
    setCursoSeleccionado(nombreCurso);
    setVistaActual('curso');
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      
      {/* Banner Superior */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.8rem', 
        borderRadius: '12px', 
        border: '1px solid var(--polo-blue-200)', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ color: 'var(--polo-blue-950)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Bienvenido a StudyHub</h2>
          <p style={{ color: 'var(--polo-blue-700)', fontSize: '0.95rem', margin: 0 }}>
            Panel general del semestre. Selecciona un curso para ver sus materiales y tareas.
          </p>
        </div>
        
        <button 
          onClick={() => setVistaActual('nuevo-curso')}
          style={{ 
            padding: '0.7rem 1.4rem', 
            backgroundColor: '#2a5cd6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: '600', 
            transition: 'background-color 0.2s', 
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 4px rgba(42, 92, 214, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2a5cd6'}
        >
          ➕ Agregar Curso
        </button>
      </div>

      <style>{`
        .cursos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.2rem;
        }
        
        .curso-card {
          background-color: white;
          border: 1px solid var(--polo-blue-200);
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .curso-card:hover {
          border-color: var(--polo-blue-400);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
          transform: translateY(-2px);
        }

        .curso-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .curso-titulo {
          font-size: 1.1rem;
          color: var(--polo-blue-950);
          font-weight: 600;
          margin: 0;
          line-height: 1.3;
        }

        .curso-info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--polo-blue-700);
        }
      `}</style>

      {/* Renderizado Condicional: Muestra texto de carga, grid de cursos o mensaje vacío */}
      {cargando ? (
        <p style={{ color: 'var(--polo-blue-700)' }}>Cargando cursos...</p>
      ) : cursos.length > 0 ? (
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div 
              key={curso.id} 
              className="curso-card"
              onClick={() => handleAbrirCurso(curso.nombre)}
            >
              <div className="curso-header">
                <h3 className="curso-titulo">{curso.nombre}</h3>
              </div>
              
              <div className="curso-info">
                <span className="info-item">
                  👤 {curso.docente || 'Sin docente asignado'}
                </span>
                <span className="info-item">
                  📅 {curso.dias || 'Sin horario definido'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: '1px dashed var(--polo-blue-300)' }}>
          <p style={{ color: 'var(--polo-blue-600)' }}>No tienes ningún curso registrado aún.</p>
        </div>
      )}
    </div>
  );
}