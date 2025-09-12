export default function Navbar({ onLogout }) {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow border-b border-gray-100">
      <span className="text-xl font-bold text-indigo-700 tracking-tight">Online Assessment Platform</span>
      <button
        onClick={onLogout}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
      >
        Logout
      </button>
    </nav>
  );
}
