function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center">
      
      <h2 className="text-2xl font-bold">
        QR<span className="text-blue-500">Pro</span>
      </h2>

      <div>
        <button className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

    </nav>
  );
}

export default Navbar;