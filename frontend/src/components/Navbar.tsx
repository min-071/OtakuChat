import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// TODO: Replace with actual anime-inspired logo/svg
const Logo: React.FC = () => (
  <div className="font-bold text-xl text-indigo-600">OtakuChat</div>
);

const Navbar: React.FC = () => {
  const { user, logout, backendVerified, backendUser, backendError } = useAuthContext();
  const navigate = useNavigate();

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Otaku';
  const avatarLetter = displayName.charAt(0).toUpperCase();

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
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {avatarLetter}
                </div>
              )}
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-medium text-gray-800">{displayName}</span>
                <span className="text-xs text-gray-600">{user.email}</span>
                <span
                  className={`text-xs ${backendVerified ? 'text-emerald-600' : 'text-amber-600'}`}
                  title={backendError?.message || 'Backend token verification status'}
                >
                  {backendVerified
                    ? `API verified (${backendUser?.uid?.slice(0, 6) ?? 'ok'}...)`
                    : 'API not verified'}
                </span>
              </div>
            </div>
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
