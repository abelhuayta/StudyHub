import './App.css'
import Sidebar from './components/Sidebar';
import WeekTimeline from './components/WeekTimeline';
import MaterialViewer from './components/MaterialViewer';
import TaskPanel from './components/TaskPanel';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="main-content">
        <WeekTimeline />
        
        <div className="content-grid">
          <MaterialViewer />
          <TaskPanel />
        </div>
      </main>
    </div>
  );
}

export default App