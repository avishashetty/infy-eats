import bgImg from '../../assets/login.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmpLogin() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:3000/api/login/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally store employee info in localStorage or context
        localStorage.setItem("employee", JSON.stringify(data.user));

        // Redirect to home page
        navigate("/employee/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error");
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen min-w-full flex items-center justify-center z-0">
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      <div className="relative z-10 w-full max-w-md sm:p-10 p-4 rounded-2xl shadow-2xl bg-neutral-900/80 border border-white/20">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow">Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-white">Employee ID</label>
            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="w-full px-5 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a94438] bg-white/80 placeholder-gray-400 text-[#222] transition-all duration-200 shadow-sm focus:shadow-lg"
              placeholder="Enter your Employee ID"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a94438] bg-white/80 placeholder-gray-400 text-[#222] transition-all duration-200 shadow-sm focus:shadow-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-red-400 text-sm font-semibold text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#a94438] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#4a3b3b] hover:text-white transition-all duration-200 border-0 focus:ring-2 focus:ring-[#a94438] focus:outline-none"
          >
            Login
          </button>
          <div className="mt-6 flex items-center justify-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></span>
            <span className="text-[#4CAF50] font-semibold">Fresh & Tasty!</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmpLogin;
