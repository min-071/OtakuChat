import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// TODO: Replace with actual anime-inspired logo/svg
const Logo: React.FC = () => (
  <div className="font-bold text-xl text-indigo-600">OtakuChat</div>
);

const Navbar: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed. Please try again.');
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
