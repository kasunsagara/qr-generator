import Navbar from "../components/navbar";
import QRForm from "../components/qrForm";
import QRPreview from "../components/qrPreview";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      <Navbar />

      <main className="flex flex-col items-center justify-center px-6 py-20">
        
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          QR Generator Pro
        </h1>

        <p className="mt-6 text-lg text-slate-400 text-center max-w-2xl">
          Generate beautiful and customizable QR codes instantly with a modern
          full-stack application.
        </p>

        <QRForm />

        <QRPreview />

      </main>

    </div>
  );
}

export default Home;