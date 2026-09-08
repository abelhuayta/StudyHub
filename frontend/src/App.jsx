import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar' // o barra_lateral
import WeekTimeline from './components/WeekTimeline'
import MaterialViewer from './components/MaterialViewer'
import TaskPanel from './components/TaskPanel'
import DashboardHome from './components/DashboardHome'
import NotasView from './components/NotasView'
import AjustesView from './components/AjustesView'
import PerfilView from './components/PerfilView'
import NuevoCursoView from './components/NuevoCursoView' // <-- 1. Importamos la nueva vista

function App() {
  const [vistaActual, setVistaActual] = useState('home') 
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(null)
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null) 

  const renderizarContenidoCentral = () => {
    switch (vistaActual) {
      case 'notas': return <NotasView />;
      case 'ajustes': return <AjustesView />;
      case 'perfil': return <PerfilView />;
      case 'nuevo-curso': return <NuevoCursoView setVistaActual={setVistaActual} />; // <-- 2. Agregamos la ruta
      case 'curso': 
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--polo-blue-950)' }}>
              {cursoSeleccionado || 'Curso sin seleccionar'}
            </h2>
            <MaterialViewer semana={semanaSeleccionada} />
          </div>
        );
      case 'home':
      default:
        return <DashboardHome setVistaActual={setVistaActual} setCursoSeleccionado={setCursoSeleccionado} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar 
        vistaActual={vistaActual} 
        setVistaActual={setVistaActual} 
        setSemanaSeleccionada={setSemanaSeleccionada} 
      />
      
      {vistaActual === 'curso' && (
        <WeekTimeline 
          semanaSeleccionada={semanaSeleccionada} 
          setSemanaSeleccionada={setSemanaSeleccionada} 
        />
      )}
      
      <main className="main-content">
        <div className="content-grid">
          {renderizarContenidoCentral()}
          <TaskPanel />
        </div>
      </main>
    </div>
  )
}

export default App