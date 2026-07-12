function QRForm() {
  return (
    <div className="w-full max-w-xl mt-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

      <h2 className="text-2xl font-semibold mb-6">
        Create Your QR Code
      </h2>

      <input
        type="text"
        placeholder="Enter text or URL..."
        className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6">
        <p className="text-sm text-slate-400 mb-3">
          QR Type
        </p>

        <div className="flex gap-3 flex-wrap">
          <button className="px-5 py-2 rounded-full bg-blue-600">
            URL
          </button>

          <button className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700">
            WiFi
          </button>

          <button className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700">
            Contact
          </button>
        </div>
      </div>


      <button
        className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:scale-[1.02] transition"
      >
        Generate QR
      </button>

    </div>
  );
}

export default QRForm;