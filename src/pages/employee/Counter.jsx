import { useState, useRef } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const counters = [
  {
    id: 1,
    name: 'North Counter',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'South Counter',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Express Counter',
    img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
];

function Counter() {
  const footerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? counters.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === counters.length - 1 ? 0 : prev + 1));
  };

  const counter = counters[current];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2d1e1b] via-[#3e2320] to-[#a94438]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 w-full relative">
        {/* Back Arrow */}
        <button
          className="absolute left-2 top-2 z-20 bg-white/20 hover:bg-white/40 text-[#a94438] p-3 rounded-full shadow-lg border border-white/30 transition-all duration-200"
          onClick={() => navigate(-1)}
          aria-label="Back to Canteen"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-5xl font-extrabold text-white mb-14 tracking-tight drop-shadow-md">Service Counters</h1>

        <div className="flex items-center justify-center gap-6 w-full max-w-5xl">
          {/* Left Arrow */}
          <button
            className="bg-white/10 hover:bg-white/20 text-[#a94438] p-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-110 border border-white/30"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FaChevronLeft size={28} />
          </button>

          {/* Main Counter Card */}
          <div
            className="relative bg-white/20 backdrop-blur-2xl rounded-3xl px-10 py-12 text-center border border-white/30 shadow-[0_8px_40px_rgba(169,68,56,0.4)] transition-all duration-500 hover:shadow-[0_12px_50px_rgba(169,68,56,0.6)] max-w-sm w-full animate-fade-in-up cursor-pointer"
            onClick={() => navigate('/employee/menu')}
            title="View Menu"
          >
            <div className="flex flex-col items-center">
              <img
                src={counter.img}
                alt={counter.name}
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mb-6"
              />
              <h2 className="text-3xl font-bold text-white drop-shadow-md">{counter.name}</h2>
              <p className="text-white/80 mt-2">Tap to view menu</p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="bg-white/10 hover:bg-white/20 text-[#a94438] p-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-110 border border-white/30"
            onClick={handleNext}
            aria-label="Next"
          >
            <FaChevronRight size={28} />
          </button>
        </div>
      </main>
      <Footer footerRef={footerRef} footerVisible={true} />
    </div>
  );
}

export default Counter;
