import { useState } from 'react';

const infoSemanas = {
  'Semana 1': { tema: 'Introducción y revisión del sílabo', pendientes: 'Ninguno', color: '#10b981' }, 
  'Semana 2': { tema: 'Modelado de Datos Relacionales', pendientes: 'Subir diagramas ER (SAVIA)', color: '#10b981' }, 
  'Semana 3': { tema: 'Gestión de Procesos y Memoria', pendientes: '2 tareas (1 vence pronto)', color: '#ef4444' }, 
  'Semana 4': { tema: 'Hilos y Concurrencia', pendientes: 'Control de lectura', color: '#f59e0b' }, 
  'Semana 5': { tema: 'Evaluaciones Parciales', pendientes: 'Estudiar para el examen', color: '#6e8abd' } 
};

export default function WeekTimeline({ semanaSeleccionada, setSemanaSeleccionada }) {
  const semanas = Array.from({ length: 17 }, (_, i) => `Semana ${i + 1}`);
  
  // Estado para controlar la tarjeta flotante libre
  const [hoverInfo, setHoverInfo] = useState({ visible: false, x: 0, y: 0, semana: null });

  const handleMouseEnter = (e, semana) => {
    // Calculamos la posición exacta del botón en la pantalla
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverInfo({
      visible: true,
      x: rect.left,
      y: rect.bottom + 8, // 8px de separación por debajo del botón
      semana: semana
    });
  };

  const handleMouseLeave = () => {
    setHoverInfo({ visible: false, x: 0, y: 0, semana: null });
  };

  const infoActiva = hoverInfo.semana ? infoSemanas[hoverInfo.semana] : null;

  return (
    <>
      <div className="timeline-container">
        <style>{`
          .timeline-container {
            grid-area: timeline;
            background-color: #ffffff;
            border-bottom: 1px solid var(--polo-blue-200);
            padding: 0.75rem 1.5rem;
            display: flex;
            gap: 0.6rem;
            overflow-x: auto; /* Mantiene el scroll horizontal */
            scrollbar-width: none;
            -ms-overflow-style: none;
            align-items: center;
          }
          
          .timeline-container::-webkit-scrollbar {
            display: none;
          }

          .semana-btn {
            background: transparent;
            color: var(--polo-blue-700);
            border: 1px solid transparent;
            padding: 0.4rem 1.2rem;
            border-radius: 18px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .semana-btn:hover {
            background-color: var(--polo-blue-50);
            color: var(--polo-blue-900);
          }

          .semana-btn.activa {
            background-color: var(--polo-blue-100);
            color: var(--polo-blue-900);
            border-color: var(--polo-blue-300);
            font-weight: 600;
          }
        `}</style>

        {semanas.map((semana) => (
          <button
            key={semana}
            onClick={() => setSemanaSeleccionada(semana)}
            onMouseEnter={(e) => handleMouseEnter(e, semana)}
            onMouseLeave={handleMouseLeave}
            className={`semana-btn ${semanaSeleccionada === semana ? 'activa' : ''}`}
          >
            {semana}
          </button>
        ))}
      </div>

      {/* TARJETA FLOTANTE FUERA DEL CONTENEDOR (Sobreescribe cualquier corte de CSS) */}
      {hoverInfo.visible && (
        <div 
          className="semana-popover"
          style={{
            position: 'fixed', // Clave: se posiciona respecto a tu ventana, no al contenedor
            top: `${hoverInfo.y}px`,
            left: `${hoverInfo.x}px`,
            zIndex: 9999,
            pointerEvents: 'none' // Evita parpadeos al mover el mouse
          }}
        >
          <style>{`
            .semana-popover {
              background: #ffffff;
              border: 1px solid var(--polo-blue-200);
              border-radius: 12px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
              padding: 1rem;
              width: 220px;
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
              text-align: left;
              animation: popIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @keyframes popIn {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .semana-section {
              display: flex;
              flex-direction: column;
              gap: 0.2rem;
            }

            .semana-label {
              font-size: 0.65rem;
              text-transform: uppercase;
              color: var(--polo-blue-400);
              font-weight: 700;
              letter-spacing: 0.05em;
            }

            .semana-value {
              font-size: 0.8rem;
              color: var(--polo-blue-900);
              line-height: 1.3;
            }
            
            .semana-value.urgente {
              font-weight: 600;
            }
          `}</style>

          {infoActiva ? (
            <>
              <div className="semana-section">
                <span className="semana-label">📖 Tema</span>
                <span className="semana-value">{infoActiva.tema}</span>
              </div>
              <div className="semana-section">
                <span className="semana-label">📝 Pendientes</span>
                <span className="semana-value urgente" style={{ color: infoActiva.color }}>
                  {infoActiva.pendientes}
                </span>
              </div>
            </>
          ) : (
            <div className="semana-section">
              <span className="semana-label">Información</span>
              <span className="semana-value" style={{ color: 'var(--polo-blue-400)' }}>
                Aún no hay datos para esta semana.
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}