function QRPreview({ qrImage }) {

  return (
    <div className="w-full max-w-xl mt-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-center">


      <h2 className="text-2xl font-semibold mb-6">
        QR Preview
      </h2>


      <div className="w-64 h-64 mx-auto flex items-center justify-center rounded-2xl bg-white">

        {
          qrImage ? (

            <img
              src={qrImage}
              alt="Generated QR"
              className="w-full h-full p-4"
            />

          ) : (

            <p className="text-slate-500">
              Your QR Code
              <br/>
              Will Appear Here
            </p>

          )
        }


      </div>


      {
        qrImage && (

          <a
            href={qrImage}
            download="qr-code.png"
            className="inline-block mt-8 px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
          >
            Download QR
          </a>

        )
      }


    </div>
  );
}

export default QRPreview;