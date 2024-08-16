import React from 'react';
import TopBar from './modules/core/components/TopBar';
import Sidebar from './modules/core/components/SideBar';
import Dashboard from './modules/dashboard/components/Dashboard';
import useToggle from './modules/core/hooks/useToggle';

const App = () => {
  const [sidebarOpen, toggleSidebar] = useToggle();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen} />
      <div style={{ flexGrow: 1 }}>
        <TopBar toggleSidebar={toggleSidebar} />
        <div style={{ padding: '20px' }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default App;
