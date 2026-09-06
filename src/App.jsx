import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import WeekTimeline from './components/WeekTimeline'
import MaterialViewer from './components/MaterialViewer'
import TaskPanel from './components/TaskPanel'
import DashboardHome from './components/DashboardHome'

function App() {
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(null)

  return (
    <div className="app-layout">
      <Sidebar />
      
      
      
      <main className="main-content">
        <div className="content-grid">
          {/* Si no hay semana seleccionada, muestra el DashboardHome; si hay una, muestra el MaterialViewer */}
          {semanaSeleccionada === null ? (
            <DashboardHome />
          ) : (
            <MaterialViewer semana={semanaSeleccionada} />
          )}
          
          <TaskPanel />
        </div>
      </main>
    </div>
  )
}

export default App