import { useState } from 'react';

const CURSOS_DISPONIBLES = [
  'Sistemas Operativos',
  'Base de Datos II',
  'Ingeniería de Software'
];

const TIPOS_ENTREGABLE = {
  codigo: { label: 'Código', icono: '💻' },
  lectura: { label: 'Lectura', icono: '📖' },
  examen: { label: 'Examen', icono: '📝' },
  otro: { label: 'Otro', icono: '📌' }
};

export default function TaskPanel() {
  const [tareas, setTareas] = useState([
    { 
      id: 1, 
      texto: 'Subir diagramas Entidad-Relación de SAVIA', 
      completada: false, 
      fechaLimite: '2026-09-06T23:59',
      curso: 'Base de Datos II',
      tipo: 'codigo'
    },
    { 
      id: 2, 
      texto: 'Revisar apuntes de hilos y procesos', 
      completada: false, 
      fechaLimite: '2026-09-08T14:00',
      curso: 'Sistemas Operativos',
      tipo: 'lectura'
    },
    { 
      id: 3, 
      texto: 'Configurar tablas relacionales en Supabase', 
      completada: true, 
      fechaLimite: '2026-09-01T00:00',
      curso: 'Base de Datos II',
      tipo: 'codigo'
    }
  ]);
  
  const [nuevaTexto, setNuevaTexto] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevoCurso, setNuevoCurso] = useState(CURSOS_DISPONIBLES[0]);
  const [nuevoTipo, setNuevoTipo] = useState('codigo');
  const [filtroTab, setFiltroTab] = useState('todas'); // 'todas', 'pendientes', 'completadas'

  // Semáforo y cálculo de tiempo restante
  const obtenerDatosUrgencia = (fechaLimite) => {
    if (!fechaLimite) return { texto: '', colorBg: 'transparent', colorText: 'inherit' };
    
    const ahora = new Date();
    const limite = new Date(fechaLimite);
    const diferencia = limite - ahora;

    if (diferencia < 0) return { texto: 'Vencida', colorBg: '#fee2e2', colorText: '#ef4444' };

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let textoRestante = dias > 0 ? `${dias}d ${horas}h restantes` : `${horas}h restantes`;

    // Semáforo por colores según cercanía
    if (dias < 1) {
      // Menos de 24 horas: Rojo (Alerta crítica)
      return { texto: textoRestante, colorBg: '#fee2e2', colorText: '#ef4444' };
    } else if (dias <= 2) {
      // 1 a 2 días: Amarillo/Naranja (Precaución)
      return { texto: textoRestante, colorBg: '#fef3c7', colorText: '#d97706' };
    } else {
      // Más de 2 días: Azul normal (Seguro)
      return { texto: textoRestante, colorBg: 'var(--polo-blue-100)', colorText: 'var(--polo-blue-800)' };
    }
  };

  const formatearFecha = (fechaLimite) => {
    if (!fechaLimite) return '';
    const fecha = new Date(fechaLimite);
    return fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const toggleTarea = (id) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTexto.trim() || !nuevaFecha) {
      alert("Por favor ingresa la descripción y la fecha límite.");
      return;
    }
    
    const nueva = {
      id: Date.now(),
      texto: nuevaTexto,
      completada: false,
      fechaLimite: nuevaFecha,
      curso: nuevoCurso,
      tipo: nuevoTipo
    };
    
    setTareas([...tareas, nueva]);
    setNuevaTexto('');
    setNuevaFecha('');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  // Filtrado de tareas según las pestañas
  const tareasFiltradas = tareas.filter(t => {
    if (filtroTab === 'pendientes') return !t.completada;
    if (filtroTab === 'completadas') return t.completada;
    return true; // 'todas'
  });

  const tareasCompletadasCount = tareas.filter(t => t.completada).length;
  const porcentaje = tareas.length === 0 ? 0 : Math.round((tareasCompletadasCount / tareas.length) * 100);

  return (
    <div className="task-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3>Tareas Pendientes</h3>
        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--polo-blue-700)' }}>
          {tareasCompletadasCount} / {tareas.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div style={{ width: '100%', backgroundColor: 'var(--polo-blue-100)', borderRadius: '4px', height: '8px', marginBottom: '1rem' }}>
        <div style={{ height: '100%', backgroundColor: 'var(--polo-blue-600)', borderRadius: '4px', width: `${porcentaje}%`, transition: 'width 0.3s ease' }}></div>
      </div>

      {/* Pestañas de Filtro */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', backgroundColor: 'var(--polo-blue-100)', padding: '0.25rem', borderRadius: '6px' }}>
        {['todas', 'pendientes', 'completadas'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFiltroTab(tab)}
            style={{
              flex: 1,
              padding: '0.3rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: filtroTab === tab ? 'white' : 'transparent',
              color: filtroTab === tab ? 'var(--polo-blue-900)' : 'var(--polo-blue-700)',
              boxShadow: filtroTab === tab ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Formulario completo de creación */}
    {/* Formulario completo de creación */}
      <form onSubmit={agregarTarea} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', backgroundColor: 'var(--polo-blue-50)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--polo-blue-200)' }}>
        <input 
          type="text" 
          value={nuevaTexto}
          onChange={(e) => setNuevaTexto(e.target.value)}
          placeholder="Ingresar Actividad Pendiente"
          style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--polo-blue-300)', fontSize: '0.85rem' }}
        />
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select 
            value={nuevoCurso} 
            onChange={(e) => setNuevoCurso(e.target.value)}
            style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--polo-blue-300)', fontSize: '0.8rem' }}
          >
            {CURSOS_DISPONIBLES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            value={nuevoTipo} 
            onChange={(e) => setNuevoTipo(e.target.value)}
            style={{ width: '110px', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--polo-blue-300)', fontSize: '0.8rem' }}
          >
            {Object.entries(TIPOS_ENTREGABLE).map(([key, val]) => (
              <option key={key} value={key}>{val.icono} {val.label}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="datetime-local" 
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            style={{ flexGrow: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--polo-blue-300)', fontSize: '0.8rem' }}
          />
          <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: 'var(--polo-blue-800)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
            Añadir
          </button>
        </div>
      </form>

      {/* Lista filtrada de tareas */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflowY: 'auto', flexGrow: 1 }}>
        {tareasFiltradas.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--polo-blue-400)', marginTop: '2rem', fontSize: '0.85rem' }}>No hay tareas en esta vista.</p>
        ) : (
          tareasFiltradas.map(tarea => {
            const urgencia = obtenerDatosUrgencia(tarea.fechaLimite);
            const tipoInfo = TIPOS_ENTREGABLE[tarea.tipo] || TIPOS_ENTREGABLE.otro;

            return (
              <li key={tarea.id} style={{ 
                display: 'flex', 
                flexDirection: 'column',
                padding: '0.65rem',
                marginBottom: '0.5rem',
                backgroundColor: tarea.completada ? 'var(--blaquito)' : 'white',
                border: `1px solid ${tarea.completada ? 'var(--verdecito)' : 'var(--amarillito)'}`,
                borderRadius: '6px',
                gap: '0.4rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', flexGrow: 1 }}>
                    <input 
                      type="checkbox" 
                      checked={tarea.completada}
                      onChange={() => toggleTarea(tarea.id)}
                      style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--verdecito)', marginTop: '0.1rem' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.7rem', backgroundColor: 'var(#008000)', color: 'var(#008000)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>
                          {tarea.curso}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(#008000' }}>
                          {tipoInfo.icono} {tipoInfo.label}
                        </span>
                      </div>
                      <span style={{ 
                        textDecoration: tarea.completada ? 'line-through' : 'none', 
                        color: tarea.completada ? 'var(#008000)' : 'var(#008000)',
                        fontWeight: '500',
                        fontSize: '0.85rem'
                      }}>
                        {tarea.texto}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(#008000)' }}>
                        Fecha límite: {formatearFecha(tarea.fechaLimite)}
                      </span>
                    </div>
                  </label>
                  
                  <button 
                    onClick={() => eliminarTarea(tarea.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                    title="Eliminar tarea"
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '1.6rem', marginTop: '0.2rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    backgroundColor: tarea.completada ? 'transparent' : urgencia.colorBg, 
                    color: tarea.completada ? 'transparent' : urgencia.colorText,
                    padding: tarea.completada ? '0' : '0.15rem 0.4rem', 
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    {!tarea.completada && urgencia.texto}
                  </span>

                  <button 
                    onClick={() => alert(`Navegando al material de ${tarea.curso}`)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', backgroundColor: 'var(--polo-blue-500)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Ir a la tarea
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}