import { useState } from 'react';
import { supabase } from '../supabase'; // Asegúrate de que la ruta coincida con donde guardaste supabase.js

export default function NuevoCursoView({ setVistaActual }) {
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    docente: '',
    dias: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    // Inserción a Supabase
    const { data, error } = await supabase
      .from('cursos')
      .insert([
        { 
          nombre: formData.nombre, 
          docente: formData.docente, 
          dias: formData.dias 
        }
      ]);

    setCargando(false);

    if (error) {
      alert('Error al guardar: ' + error.message);
    } else {
      alert('¡Curso agregado con éxito!');
      setVistaActual('home'); // Te devuelve al dashboard
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--polo-blue-200)', maxWidth: '600px' }}>
      <h2 style={{ color: 'var(--polo-blue-950)', marginBottom: '1.5rem' }}>➕ Agregar Nuevo Curso</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--polo-blue-800)', fontWeight: '600' }}>Nombre del Curso</label>
          <input 
            type="text" 
            name="nombre"
            required
            placeholder="Ej. Arquitectura de Computadoras"
            value={formData.nombre}
            onChange={handleChange}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--polo-blue-300)', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--polo-blue-800)', fontWeight: '600' }}>Docente</label>
          <input 
            type="text" 
            name="docente"
            required
            placeholder="Ej. Ing. Juan Pérez"
            value={formData.docente}
            onChange={handleChange}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--polo-blue-300)', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--polo-blue-800)', fontWeight: '600' }}>Horario (Días y Horas)</label>
          <input 
            type="text" 
            name="dias"
            required
            placeholder="Ej. Lunes y Miércoles (08:00 - 10:00)"
            value={formData.dias}
            onChange={handleChange}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--polo-blue-300)', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="button" 
            onClick={() => setVistaActual('home')}
            style={{ flex: 1, padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--polo-blue-300)', backgroundColor: 'transparent', color: 'var(--polo-blue-800)', cursor: 'pointer', fontWeight: '600' }}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={cargando}
            style={{ flex: 2, padding: '0.8rem', borderRadius: '6px', border: 'none', backgroundColor: '#2a5cd6', color: 'white', cursor: cargando ? 'not-allowed' : 'pointer', fontWeight: '600' }}
          >
            {cargando ? 'Guardando...' : 'Guardar Curso'}
          </button>
        </div>
      </form>
    </div>
  );
}