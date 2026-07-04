import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';



const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`dashboard-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <main className="content-area p-4">
          <Outlet/>
        </main>
      </div>
      {/* Overlay for mobile */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      
    </div>
  );
};

export default DashboardLayout;
