import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './modules/core/components/TopBar';
import Sidebar from './modules/core/components/SideBar';
import Dashboard from './modules/dashboard/components/Dashboard';
import LoginForm from './modules/auth/components/LoginForm';
import AddWorker from './modules/worker/components/AddWorker';
import SeeWorker from './modules/worker/components/SeeWorker';
import useToggle from './modules/core/hooks/useToggle';
import SeePermissions from './modules/permissions/components/seePermissions';

import { isSessionExpired } from './utils/authUtils'; // Importa la utilidad de autenticación

const AppContent = () => {
  const [sidebarOpen, toggleSidebar] = useToggle();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionExpired()) {
      sessionStorage.removeItem('loginData');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen} />
      <div style={{ flexGrow: 1 }}>
        <TopBar toggleSidebar={toggleSidebar} />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm />} /> {/* Ruta para Login */}
            <Route path="/add-worker" element={<AddWorker />} /> {/* Nueva ruta para AddWorker */}
            <Route path="/see-worker" element={<SeeWorker />} /> {/* Nueva ruta para AddWorker */}
            <Route path="/see-permissions" element={<SeePermissions />} /> {/* Nueva ruta para AddWorker */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
