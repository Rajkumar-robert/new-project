
"use client";
import { BarChart, Clock, ShieldCheck } from "lucide-react";
import Navbar from "./components/Navbar";

export default function Home() {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const user = getUserFromLocalStorage();
  //     if (!user) {
  //       window.location.href = "/login";
  //     }
  //   }
  // }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center">
        <div className="w-full max-w-3xl text-center mt-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">Online Assessment Platform</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Take, create, and manage assessments with ease. Empower your learning or recruitment process with our intuitive online platform.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</a>
            <a href="/login" className="px-6 py-3 border border-blue-600 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition">Login</a>
          </div>
        </div>

      {/* Features Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <Clock className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="font-bold text-lg mb-2 text-black">Timed Assessments</h3>
          <p className="text-gray-600 text-sm">Set time limits and auto-submit for fair and efficient testing.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <ShieldCheck className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="font-bold text-lg mb-2 text-black">Secure & Reliable</h3>
          <p className="text-gray-600 text-sm">Your data and results are protected with industry-standard security.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <BarChart className="w-10 h-10 text-blue-500 mb-3" />
          <h3 className="font-bold text-lg mb-2 text-black">Easy Results & Analytics</h3>
          <p className="text-gray-600 text-sm">Instant feedback, detailed analytics, and downloadable reports.</p>
        </div>
      </div>
    </main>
  );
}
