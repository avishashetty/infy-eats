import { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import logo from '../../assets/homePage.jpg'; // Assuming you have a logo image
import CR from '../../assets/Chicken Roti.jpg';
import CB from '../../assets/Chicken Biriyani.jpg';
import NM from '../../assets/North Mini.jpg';
import PR from '../../assets/Paneer Roti.jpg';
import Rest1 from '../../assets/rest1.jpg';
import Rest2 from '../../assets/rest2.jpg';
import Rest3 from '../../assets/rest3.jpg';
import IS from '../../assets/Idli Sambar.jpeg';
import PH from '../../assets/Poha.jpeg';
import MD from '../../assets/Masala Dosa.jpeg';
import '../../index.css'; // Import your CSS for styles
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function EmpHome() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(() => {
  return !!localStorage.getItem("employee");
});

  // Animation state
  const heroRef = useRef(null);
  const canteenRef = useRef(null);
  const itemsRef = useRef(null);
  const myOrderRef = useRef(null);
  const footerRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [canteenVisible, setCanteenVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const [myOrderVisible, setMyOrderVisible] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [heroBtnVisible, setHeroBtnVisible] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const checkAndSet = (ref, setter) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
          setter(true);
        } else {
          setter(false);
        }
      };
      checkAndSet(heroRef, setHeroVisible);
      checkAndSet(canteenRef, setCanteenVisible);
      checkAndSet(itemsRef, setItemsVisible);
      checkAndSet(myOrderRef, setMyOrderVisible);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stagger hero text/button entrance
  useEffect(() => {
    if (heroVisible) {
      setTimeout(() => setHeroTextVisible(true), 200);
      setTimeout(() => setHeroBtnVisible(true), 600);
    } else {
      setHeroTextVisible(false);
      setHeroBtnVisible(false);
    }
  }, [heroVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setHeroVisible(true);
      }
      if (canteenRef.current) {
        const rect = canteenRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setCanteenVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Demo data
  const canteens = [
    { id: 1, name: 'Terminal', desc: 'North Wing - Daily Meals', img: Rest1 },
    { id: 2, name: 'Shane Punjab', desc: 'Pure Veg Options', img: Rest2 },
    { id: 3, name: 'Shell-1', desc: 'Fast food & beverages', img: Rest3 },
    { id: 4, name: 'Shell-2', desc: 'Indian & Continental', img: Rest1 },
  ];
  // Carousel menu items by meal type
  const menuSections = [
    {
      label: 'Breakfast',
      items: [
        { id: 1, name: 'Idli Sambar', canteen: 'Terminal', img: IS },
        { id: 2, name: 'Masala Dosa', canteen: 'Shell-1', img: MD },
        { id: 3, name: 'Poha', canteen: 'Shell-1', img: PH },
      ],
    },
    {
      label: 'Lunch',
      items: [
        { id: 4, name: 'Chicken Biriyani', canteen: 'Shane Punjab', img: CB },
        { id: 5, name: 'Paneer Roti', canteen: 'Shell-2', img: PR },
        { id: 6, name: 'North Mini', canteen: 'Terminal', img: NM },
      ],
    },
    {
      label: 'Dinner',
      items: [
        { id: 7, name: 'Chicken Roti', canteen: 'Shane Punjab', img: CR },
        { id: 8, name: 'North Mini', canteen: 'Shell-1', img: NM },
        { id: 9, name: 'Paneer Roti', canteen: 'Shell-2', img: PR },
      ],
    },
  ];
  const [menuIdx, setMenuIdx] = useState(0); // 0: breakfast, 1: lunch, 2: dinner
  const myTopOrder = {
    name: 'Paneer Roti',
    desc: 'Soft wrap filled with spicy paneer, onions, and tangy sauce. Your all-time favorite!',
    img: PR,
    canteen: 'Shane Punjab',
  };

  return (
    <div className="min-h-screen bg-[#261a18]" id="home">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative flex items-center justify-center min-h-[340px] md:min-h-[420px] lg:min-h-[500px] px-6 py-10 overflow-hidden transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Hero background image with animated scale-in */}
        <img
          src={logo}
          alt="Hero Background"
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-1000 ${heroVisible ? 'scale-100' : 'scale-110'} mask-radial-fade`}
        />

        {/* Overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#261a18]/50 to-[#261a18] z-10 transition-all duration-1000" />
        {/* Hero content with staggered fade/slide */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-3xl mx-auto text-center text-white">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 drop-shadow transition-all duration-1000 ${heroTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Order. Eat. Enjoy.</h1>
          <p className={`text-lg md:text-xl mb-6 max-w-xl mx-auto transition-all duration-1000 delay-200 ${heroTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Skip the queue! Order your meal online and pick it up fresh at your favorite canteen. Fast, easy, and convenient for every employee.</p>
          <span className={`inline-block bg-white text-[#a94438] font-bold px-4 py-2 rounded shadow transition-all duration-1000 delay-500 ${heroBtnVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>Infy Eats - Office Canteen System</span>
        </div>
      </section>

      {/* Canteen List Section */}
      <section
        id="canteens"
        ref={canteenRef}
        className={`px-6 py-10 max-w-6xl mx-auto transition-all duration-1000 ${canteenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-2xl font-bold mb-8 text-[#ffff] text-center">Available Canteens</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {canteens.slice(0, 3).map((canteen, idx) => (
            <div
              key={canteen.id}
              className={`bg-white rounded-xl shadow p-6 hover:shadow-xl transition cursor-pointer border border-[#a94438]/10 transform transition-all duration-700 ${canteenVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} delay-[${(idx + 1) * 150}]`}
              style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
            >
              {/* Placeholder for canteen image */}
              <div className="h-32 w-full bg-neutral-200 rounded-lg mb-4 flex items-center justify-center text-[#a94438] font-bold text-lg transition-transform duration-300 hover:scale-105">
                <img src={canteen.img} alt={canteen.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <h3 className="text-lg font-bold mb-1">{canteen.name}</h3>
              <p className="text-gray-600 mb-3">{canteen.desc}</p>
              <button
                className="text-sm bg-[#a94438] text-white px-4 py-2 rounded hover:bg-[#4a3b3b] transition-transform duration-300 hover:scale-105"
                onClick={() => isLoggedIn ? navigate('/employee/menu') : navigate('/login/employee')}
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 rounded bg-[#a94438] text-white font-bold shadow hover:bg-[#4a3b3b] transition"
            onClick={() => isLoggedIn ? navigate('/employee/canteen') : navigate('/login/employee')}
          >
            See More
          </button>
        </div>
      </section>

      {/* Popular Menu Carousel Section */}
      <section
        ref={itemsRef}
        className={`px-6 py-10 max-w-6xl mx-auto transition-all duration-1000 ${itemsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-2xl font-bold mb-8 text-[#ffff] text-center">Popular Menu</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            className="bg-white/20 hover:bg-white/40 text-[#a94438] p-3 rounded-full shadow border border-white/30 transition-all duration-200 disabled:opacity-40"
            onClick={() => setMenuIdx((prev) => (prev === 0 ? menuSections.length - 1 : prev - 1))}
            aria-label="Previous meal"
            disabled={menuSections.length <= 1}
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </button>
          <span className="text-lg font-bold text-white px-4 py-2 rounded-full bg-[#a94438]/80 shadow">{menuSections[menuIdx].label}</span>
          <button
            className="bg-white/20 hover:bg-white/40 text-[#a94438] p-3 rounded-full shadow border border-white/30 transition-all duration-200 disabled:opacity-40"
            onClick={() => setMenuIdx((prev) => (prev === menuSections.length - 1 ? 0 : prev + 1))}
            aria-label="Next meal"
            disabled={menuSections.length <= 1}
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {menuSections[menuIdx].items.map((item, idx) => (
            <div
              key={item.id}
              className={`relative group rounded-2xl overflow-hidden shadow-lg bg-white transform transition-all duration-700 ${itemsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
              style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
            >
              <img src={item.img} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow">{item.name}</h3>
                <span className="bg-[#a94438] text-white px-3 py-1 rounded-full text-xs font-semibold">{item.canteen}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* My Top Order Section */}
      <section
        ref={myOrderRef}
        className={`px-6 py-10 max-w-3xl mx-auto transition-all duration-1000 ${myOrderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-2xl font-bold mb-8 text-[#ffff] text-center">My Top Order</h2>
        <div className="relative group bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6 hover:shadow-2xl transition-all duration-500">
          <img src={myTopOrder.img} alt={myTopOrder.name} className="w-40 h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-[#4CAF50]">{myTopOrder.name}</h3>
            <p className="text-gray-700 mb-2">{myTopOrder.desc}</p>
            <span className="inline-block bg-[#a94438] text-white px-3 py-1 rounded-full text-xs font-semibold">{myTopOrder.canteen}</span>
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <a href="#cart" className="flex items-center justify-center bg-[#a94438] text-white px-3 py-1 rounded-full text-xs font-semibold transition">
              <FaShoppingCart className="mr-2" />
              Order Again!

            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer footerRef={footerRef} footerVisible={true} />
    </div>
  );
}

export default EmpHome;
