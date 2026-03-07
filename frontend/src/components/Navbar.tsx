import React from 'react';

// TODO: Replace with actual anime-inspired logo/svg
const Logo: React.FC = () => (
  <div className="font-bold text-xl text-indigo-600">OtakuChat</div>
);

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
      <Logo />
      <div className="space-x-4">
        {/* TODO: Replace with auth links or user avatar */}
        <button className="text-sm text-gray-600 hover:text-indigo-600">Login</button>
        <button className="text-sm text-gray-600 hover:text-indigo-600">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
