
import { useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import CR from '../../assets/Chicken Roti.jpg';
import CB from '../../assets/Chicken Biriyani.jpg';
import NM from '../../assets/North Mini.jpg';
import PR from '../../assets/Paneer Roti.jpg';
import GJ from '../../assets/Gulab Jamun.jpg';
import RM from '../../assets/Rasmalai.jpeg';
import { useNavigate } from 'react-router-dom';

// Flattened menu items (no categories)
const menuItems = [
  { id: 1, name: 'Chicken Roti', price: 120, img: CR },
  { id: 2, name: 'North Mini', price: 140, img: NM },
  { id: 3, name: 'Paneer Roti', price: 80, img: PR },
  { id: 4, name: 'Chicken Biriyani', price: 120, img: CB },
  { id: 5, name: 'Gulab Jamun', price: 50, img: GJ },
  { id: 6, name: 'Rasmalai', price: 60, img: RM },
];

function Menu() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#261a18] flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 flex flex-col items-center w-full relative">
        {/* Back Arrow */}
        <button
          className="absolute left-2 top-2 z-20 bg-white/20 hover:bg-white/40 text-[#a94438] p-3 rounded-full shadow-lg border border-white/30 transition-all duration-200"
          onClick={() => navigate(-1)}
          aria-label="Back to Counter"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight animate-fade-in">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-24 w-full max-w-6xl px-4 mt-20">
  {menuItems.map(item => (
    <div
      key={item.id}
      className="relative bg-white rounded-xl shadow-lg pt-24 pb-6 px-4 max-w-[250px] mx-auto flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={() => navigate('/employee/carts')}
      title="Go to Cart"
    >
      {/* Overlapping Large Circular Image */}
      <div className="absolute -top-16">
        <img
          src={item.img}
          alt={item.name}
          className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Card Content */}
      <h3 className="text-lg font-bold text-[#4a3b3b] mb-2 mt-2">{item.name}</h3>

      <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <span role="img" aria-label="clock">⏱️</span>
          <span>7 min</span>
        </div>
        <div className="flex items-center gap-1">
          <span role="img" aria-label="servings">🍽️</span>
          <span>4 servings</span>
        </div>
      </div>

      <span className="text-[#a94438] font-semibold text-base mb-4">₹{item.price}</span>

      <button
        onClick={e => { e.stopPropagation(); alert(`Added ${item.name} to cart!`); }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#a94438] text-white font-bold text-sm shadow hover:bg-[#4a3b3b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a94438]/50"
      >
        <FaPlus className="text-xs" />
        <span>Add</span>
      </button>
    </div>
  ))}
</div>

      </main>
      <Footer footerRef={footerRef} footerVisible={true} />
    </div>
  );
}

export default Menu;
