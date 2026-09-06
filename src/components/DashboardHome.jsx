export default function DashboardHome() {
  const cursos = [
    { 
      id: 1, 
      nombre: 'Sistemas Operativos', 
      docente: 'Dr. Roberto Gómez', 
      dias: 'Lunes y Miércoles (08:00 - 10:00)', 
      avance: '60%', 
      pendiente: '2 tareas' 
    },
    { 
      id: 2, 
      nombre: 'Base de Datos II', 
      docente: 'Dra. Ana Torres', 
      dias: 'Martes y Jueves (10:00 - 12:00)', 
      avance: '85%', 
      pendiente: '1 tarea' 
    },
    { 
      id: 3, 
      nombre: 'Ingeniería de Software', 
      docente: 'Ing. Carlos Mendoza', 
      dias: 'Viernes (14:00 - 17:00)', 
      avance: '40%', 
      pendiente: '3 tareas' 
    }
  ];

  return (
    <div className="dashboard-home" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      {/* Banner de Bienvenida */}
      <div style={{ backgroundColor: 'white', padding: '1.8rem', borderRadius: '8px', border: '1px solid var(--polo-blue-200)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: 'var(--polo-blue-950)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Bienvenido a StudyHub</h2>
        <p style={{ color: 'var(--polo-blue-700)', fontSize: '0.95rem' }}>
          Panel general del semestre. Selecciona un curso para ver los materiales y profundizar en tus asignaturas.
        </p>
      </div>

      {/* Cuadrícula de Cursos Ampliada */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        {cursos.map(curso => (
          <div 
            key={curso.id} 
            className="course-card"
            style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              border: '1px solid var(--polo-blue-200)', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              minHeight: '180px'
            }}
          >
            <div>
              <h4 style={{ color: 'var(--polo-blue-950)', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{curso.nombre}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--polo-blue-800)', marginBottom: '0.2rem' }}>
                👨‍🏫 <strong>Docente:</strong> {curso.docente}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--polo-blue-800)' }}>
                📅 <strong>Horario:</strong> {curso.dias}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--polo-blue-100)', paddingTop: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--polo-blue-700)', fontWeight: 'bold' }}>
                Progreso: {curso.avance}
              </span>
              <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--polo-blue-100)', color: 'var(--polo-blue-900)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontWeight: 'bold' }}>
                {curso.pendiente}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}