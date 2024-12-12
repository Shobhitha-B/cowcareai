import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CowIcon, CameraIcon, HistoryIcon, LogOutIcon } from './icons';
import { NavLink } from './navigation/NavLink';

export function Layout() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2">
                <CowIcon />
                <span className="font-bold text-xl">CowCareAI</span>
              </Link>
              <div className="ml-10 flex items-center space-x-4">
                <NavLink to="/capture" icon={<CameraIcon />}>
                  Capture
                </NavLink>
                <NavLink to="/history" icon={<HistoryIcon />}>
                  History
                </NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <LogOutIcon />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}