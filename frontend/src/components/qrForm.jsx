import { useState } from "react";
import API from "../services/api";

function QRForm({ setQrImage }) {

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);


  const generateQR = async () => {

    if (!data.trim()) {
      alert("Please enter text or URL");
      return;
    }


    try {

      setLoading(true);

      const response = await API.post(
        "/generate",
        {
          data: data
        },
        {
          responseType: "blob"
        }
      );


      const imageURL = URL.createObjectURL(response.data);

      setQrImage(imageURL);


    } catch (error) {

      console.log(error);
      alert("QR generation failed");

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="w-full max-w-xl mt-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

      <h2 className="text-2xl font-semibold mb-6">
        Create Your QR Code
      </h2>


      <input
        type="text"
        value={data}
        onChange={(e)=>setData(e.target.value)}
        placeholder="Enter text or URL..."
        className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
      />


      <button
        onClick={generateQR}
        className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:scale-[1.02] transition"
      >

        {loading ? "Generating..." : "Generate QR"}

      </button>

    </div>
  );
}

export default QRForm;