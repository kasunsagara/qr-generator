function QRPreview() {
  return (
    <div className="w-full max-w-xl mt-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-center">

      <h2 className="text-2xl font-semibold mb-6">
        QR Preview
      </h2>

      <div className="w-64 h-64 mx-auto flex items-center justify-center rounded-2xl bg-white">

        <p className="text-slate-500">
          Your QR Code
          <br />
          Will Appear Here
        </p>

      </div>


      <button
        className="mt-8 px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
      >
        Download QR
      </button>

    </div>
  );
}

export default QRPreview;