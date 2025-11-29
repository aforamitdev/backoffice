import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import TasksPage from './pages/tasks/TasksPage';
import SimpleTasksPage from './pages/simple-tasks/SimpleTasksPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Navigate to='/' replace />} />
        <Route path='tasks' element={<TasksPage />} />
        <Route path='quick-tasks' element={<SimpleTasksPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
