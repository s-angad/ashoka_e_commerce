import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminProvider } from '../../context/AdminContext';
import { Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="min-h-screen bg-stone-100/70 flex flex-col lg:flex-row antialiased">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
          <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};
