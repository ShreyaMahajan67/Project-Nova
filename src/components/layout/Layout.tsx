import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <Outlet />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Layout;