import { useState, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaPlus, FaMinus } from 'react-icons/fa';
import PR from '../../assets/Paneer Roti.jpg';
import CB from '../../assets/Chicken Biriyani.jpg';
// Demo cart data
const initialCart = [
  {
    id: 1,
    name: 'Paneer Roti',
    img: PR,
    canteen: 'Shane Punjab',
    price: 80,
    qty: 2,
  },
  {
    id: 2,
    name: 'Chicken Biriyani',
    img: CB,
    canteen: 'Infy Main Canteen',
    price: 120,
    qty: 1,
  },
];

function Carts() {
  const footerRef = useRef(null);
  const [cart, setCart] = useState(initialCart);

  const handleQty = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#261a18] flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-[#ffff] mb-8 tracking-tight">My Cart</h1>

        <div className="w-full max-w-2xl flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="text-center text-[#a94438] font-bold py-12">Your cart is empty.</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200 relative">
                {/* X Button */}
                <button
                  className="mr-2 text-[#a94438] hover:bg-[#fceeea] rounded-full p-1 transition self-center"
                  onClick={() => handleRemove(item.id)}
                  aria-label="Remove item"
                  style={{ minWidth: 28 }}
                >
                  ×
                </button>
                {/* Image */}
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-full border-2 border-[#a94438]" />

                {/* Info */}
                <div className="flex-1 ml-4 mr-4">
                  <h3 className="font-semibold text-[#2d1e1b]">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.canteen}</p>
                </div>

                {/* Price & Quantity */}
                <div className="flex flex-col items-end justify-between h-full">
                  <span className="text-[#e27633] font-semibold text-base">₹{item.price.toFixed(2)}</span>
                  <div className="flex items-center mt-2 rounded-full border px-2 py-1 border-[#e27633]/30">
                    <button
                      className="text-[#a94438] px-2 text-sm disabled:opacity-30"
                      onClick={() => handleQty(item.id, -1)}
                      disabled={item.qty === 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-2 text-sm font-medium">{item.qty}</span>
                    <button
                      className="text-[#a94438] px-2 text-sm"
                      onClick={() => handleQty(item.id, 1)}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {cart.length > 0 && (
          <div className="w-full max-w-2xl mt-8 bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center text-[#4a3b3b] font-semibold text-lg mb-4">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-3 mt-2 rounded-full bg-[#a94438] text-white font-bold shadow hover:bg-[#4a3b3b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a94438]/50 disabled:opacity-50"
              disabled={cart.length === 0}
              onClick={() => alert('Order placed!')}
            >
              Buy Now
            </button>
          </div>
        )}
      </main>
      <Footer footerRef={footerRef} footerVisible={true} />
    </div>
  );
}

export default Carts;
