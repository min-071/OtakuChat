import React from 'react';

// TODO: Replace with actual anime-inspired logo/svg
const Logo: React.FC = () => (
  <div className="font-bold text-xl text-indigo-600">OtakuChat</div>
);

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('logout error', err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
      <Logo />
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
