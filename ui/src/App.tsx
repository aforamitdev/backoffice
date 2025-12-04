import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TasksPage from './pages/tasks/TasksPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='tasks' element={<TasksPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
