const NavBar = ({ onLogout }) => {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm rounded">
      <h1 className="text-xl font-semibold text-gray-800">📝 Notes App</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
