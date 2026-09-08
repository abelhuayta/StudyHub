import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function TaskPanel() {
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [tareas, setTareas] = useState([]);
  
  // Estados del formulario
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [tipoTarea, setTipoTarea] = useState('Código');
  const [fechaLimite, setFechaLimite] = useState('');

  // Cargar cursos y tareas al iniciar
  useEffect(() => {
    const fetchData = async () => {
      // Obtener Cursos
      const { data: dataCursos } = await supabase.from('cursos').select('nombre').order('id', { ascending: true });
      if (dataCursos) {
        setCursosDisponibles(dataCursos);
        if (dataCursos.length > 0) setCursoSeleccionado(dataCursos[0].nombre);
      }

      // Obtener Tareas
      const { data: dataTareas } = await supabase.from('tareas').select('*').order('fecha_limite', { ascending: true });
      if (dataTareas) setTareas(dataTareas);
    };

    fetchData();
  }, []);

  const handleAñadirTarea = async (e) => {
    e.preventDefault();
    if (!nuevaTarea || !cursoSeleccionado) return;
    
    const nueva = {
      descripcion: nuevaTarea,
      curso: cursoSeleccionado,
      tipo: tipoTarea,
      fecha_limite: fechaLimite || null
    };

    // Insertar en Supabase
    const { data, error } = await supabase.from('tareas').insert([nueva]).select();

    if (!error && data) {
      setTareas([...tareas, data[0]]); // Actualizar la UI al instante
      setNuevaTarea('');
      setFechaLimite('');
    } else {
      console.error("Error al guardar tarea:", error);
    }
  };

  const toggleCompletada = async (id, estadoActual) => {
    const { error } = await supabase.from('tareas').update({ completada: !estadoActual }).eq('id', id);
    if (!error) {
      setTareas(tareas.map(t => t.id === id ? { ...t, completada: !estadoActual } : t));
    }
  };

  return (
    <aside className="task-panel" style={{ backgroundColor: 'white', borderLeft: '1px solid var(--polo-blue-200)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: 'var(--polo-blue-950)', margin: 0 }}>Tareas Pendientes</h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--polo-blue-600)', fontWeight: '600' }}>
          {tareas.filter(t => t.completada).length} / {tareas.length}
        </span>
      </div>

      <div style={{ display: 'flex', backgroundColor: 'var(--polo-blue-50)', padding: '0.2rem', borderRadius: '8px', gap: '0.2rem' }}>
        <button style={{ flex: 1, padding: '0.4rem', backgroundColor: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', color: 'var(--polo-blue-900)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Todas</button>
        <button style={{ flex: 1, padding: '0.4rem', backgroundColor: 'transparent', border: 'none', color: 'var(--polo-blue-600)', fontWeight: '500' }}>Pendientes</button>
      </div>

      <form onSubmit={handleAñadirTarea} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '1rem', border: '1px solid var(--polo-blue-200)', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
        <input 
          type="text" 
          placeholder="Ingresar Actividad Pendiente" 
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--polo-blue-200)', outline: 'none' }}
        />
        
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <select 
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            style={{ flex: 2, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--polo-blue-200)', outline: 'none', backgroundColor: 'white' }}
          >
            {cursosDisponibles.map((curso, index) => (
              <option key={index} value={curso.nombre}>{curso.nombre}</option>
            ))}
          </select>

          <select 
            value={tipoTarea}
            onChange={(e) => setTipoTarea(e.target.value)}
            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--polo-blue-200)', outline: 'none', backgroundColor: 'white' }}
          >
            <option value="Código">Código</option>
            <option value="Lectura">Lectura</option>
            <option value="Examen">Examen</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input 
            type="datetime-local" 
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--polo-blue-200)', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#475569', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Añadir
          </button>
        </div>
      </form>

      {/* Lista de Tareas Renderizadas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
        {tareas.map((tarea) => (
          <div key={tarea.id} style={{ 
            border: `1px solid ${tarea.completada ? 'var(--polo-blue-300)' : '#fde047'}`, 
            borderRadius: '8px', padding: '1rem', 
            backgroundColor: tarea.completada ? 'var(--polo-blue-50)' : 'white',
            opacity: tarea.completada ? 0.7 : 1
          }}>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <input 
                type="checkbox" 
                checked={tarea.completada}
                onChange={() => toggleCompletada(tarea.id, tarea.completada)}
                style={{ marginTop: '0.3rem', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--polo-blue-600)', marginBottom: '0.3rem' }}>
                  <span><strong>{tarea.curso}</strong> • {tarea.tipo}</span>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', color: 'var(--polo-blue-950)', fontSize: '0.95rem', textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                  {tarea.descripcion}
                </p>
                {tarea.fecha_limite && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>
                    📅 {new Date(tarea.fecha_limite).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}