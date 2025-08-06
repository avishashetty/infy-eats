import { useState, useRef, useEffect } from 'react';
import logo from '../assets/homePage.jpg';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Demo user data
const demoUser = {
  name: 'Avisha Shetty',
  photo: '', // Empty string means no photo, fallback to icon
};

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  if (timeLeft < 0) return 'Closed';
  const h = Math.floor(timeLeft / 1000 / 60 / 60);
  const m = Math.floor((timeLeft / 1000 / 60) % 60);
  const s = Math.floor((timeLeft / 1000) % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function Header() {
  const navigate = useNavigate();
  // Demo: login state (replace with real auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);


  // Meal slots: [label, startHour, startMinute, endHour, endMinute]
  const slots = [
    { label: 'Breakfast', start: [7, 0], end: [11, 30], window: '7:00–11:30 AM' },
    { label: 'Lunch', start: [12, 0], end: [15, 0], window: '12:00–3:00 PM' },
    { label: 'Dinner', start: [19, 0], end: [22, 0], window: '7:00–10:00 PM' },
  ];

  // Find current or next slot, and whether it's active
  const now = new Date();
  let currentSlot = null;
  let slotStart = null;
  let slotEnd = null;
  let isActive = false;
  for (const slot of slots) {
    const start = new Date();
    start.setHours(slot.start[0], slot.start[1], 0, 0);
    const end = new Date();
    end.setHours(slot.end[0], slot.end[1], 0, 0);
    if (now >= start && now < end) {
      currentSlot = slot;
      slotStart = start;
      slotEnd = end;
      isActive = true;
      break;
    }
  }
  // If no slot active, show next slot (upcoming)
  if (!currentSlot) {
    for (const slot of slots) {
      const start = new Date();
      start.setHours(slot.start[0], slot.start[1], 0, 0);
      if (now < start) {
        currentSlot = slot;
        slotStart = start;
        slotEnd = null;
        isActive = false;
        break;
      }
    }
    // If still null, show first slot of next day
    if (!currentSlot) {
      const slot = slots[0];
      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setHours(slot.start[0], slot.start[1], 0, 0);
      currentSlot = slot;
      slotStart = start;
      slotEnd = null;
      isActive = false;
    }
  }
  const slotCountdown = useCountdown(isActive ? slotEnd : slotStart);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  // Demo: handle login/logout
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-2 bg-gradient-to-r from-[#5d1d15]/60 to-[#8b3125]/60 backdrop-blur-md shadow text-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover border-2 border-white" />
        <span className="text-xl font-extrabold tracking-tight">Infy Eats</span>
      </div>
      {/* Order Cut-off Timer: Only show current or next slot */}
      { isLoggedIn &&
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center px-2 animate-fadeIn">
          <span className="text-xs font-bold text-[#FFD700]">{currentSlot.label}</span>
          <span className="text-xs text-white/80">{currentSlot.window}</span>
          <span className="text-xs bg-[#fff2] rounded px-2 py-0.5 font-mono tracking-wider mt-0.5">
            {slotCountdown === 'Closed'
              ? 'Closed'
              : isActive
                ? `Ends in ${slotCountdown}`
                : `Starts in ${slotCountdown}`}
          </span>
        </div>
      </div>
      }
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 items-center text-lg font-semibold">
        <a href="/employee/home" className="hover:text-[#4CAF50] transition">Home</a>
        <a href="/employee/canteen" className="hover:text-[#4CAF50] transition">Canteens</a>
        {isLoggedIn && (
          <div className="relative group flex items-center">
            <a href="/employee/carts" className="flex items-center justify-center text-xl hover:text-[#4CAF50] transition">
              <FaShoppingCart />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-[#222] text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Cart</span>
          </div>
        )}
        {/* Auth logic: show Login or Profile */}
        {!isLoggedIn ? (
          <button
            className="ml-3 px-3 py-1 rounded bg-white text-[#a94438] font-bold hover:bg-[#4a3b3b] hover:text-white transition"
            onClick={handleLogin}
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center justify-center text-2xl hover:text-[#4CAF50] transition focus:outline-none"
              onClick={() => setProfileOpen((v) => !v)}
              aria-label="Profile"
            >
              <FaUserCircle />
            </button>
            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-[#261a18] rounded-xl shadow-lg py-4 z-30 animate-fadeIn flex flex-col items-center">
                {demoUser.photo ? (
                  <img src={demoUser.photo} alt="Profile" className="h-16 w-16 rounded-full object-cover border-2 border-[#a94438] mb-2" />
                ) : (
                  <span className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-200 border-2 border-[#a94438] mb-2 text-4xl text-[#a94438]">
                    <FaUserCircle />
                  </span>
                )}
                <div className="font-bold text-lg mb-2">{demoUser.name}</div>
                <button
                  className="w-full px-6 py-2 hover:bg-[#f5e7e5] text-left transition text-left"
                  onClick={() => { setProfileOpen(false); navigate('/employee/orders'); }}
                >
                  Orders
                </button>
                <a href="/employee/settings" className="w-full px-6 py-2 hover:bg-[#f5e7e5] text-left transition">Settings</a>
                <button
                  className="w-full px-6 py-2 text-left hover:bg-[#f5e7e5] transition text-[#a94438] font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex items-center justify-center text-2xl p-2 rounded focus:outline-none hover:bg-[#fff2] transition ml-2"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          {/* Drawer */}
          <div className="relative ml-auto w-64 max-w-full h-full bg-[#261a18] shadow-2xl flex flex-col p-6 animate-fadeIn text-white">
            <button
              className="absolute top-4 right-4 text-2xl p-2 rounded hover:bg-[#fff2] focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <nav className="flex flex-col bg-gradient-to-r from-[#5d1d15]/60 to-[#8b3125]/60 backdrop-blur-md shadow gap-6 mt-12 text-lg font-semibold items-center justify-center">
              <a href="/employee/home" className="hover:text-[#4CAF50] transition" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="/employee/canteen" className="hover:text-[#4CAF50] transition" onClick={() => setMobileMenuOpen(false)}>Canteens</a>
              {isLoggedIn && (
                <div className="relative group flex items-center">
                  <a href="/employee/carts" className="flex items-center justify-center text-xl hover:text-[#4CAF50] transition" onClick={() => setMobileMenuOpen(false)}>
                    <FaShoppingCart />
                    <span className="ml-2 text-base">Cart</span>
                  </a>
                </div>
              )}
              {/* Auth logic: show Login or Profile */}
              {!isLoggedIn ? (
                <button
                  className="px-3 py-1 w-fit rounded bg-white text-[#a94438] font-bold hover:bg-[#4a3b3b] hover:text-white transition"
                  onClick={() => { setMobileMenuOpen(false); handleLogin(); }}
                >
                  Login
                </button>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    className="flex items-center justify-center text-2xl hover:text-[#4CAF50] transition focus:outline-none"
                    onClick={() => setProfileOpen((v) => !v)}
                    aria-label="Profile"
                  >
                    <FaUserCircle />
                  </button>
                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-[#261a18] rounded-xl shadow-lg py-4 z-30 animate-fadeIn flex flex-col items-center">
                      {demoUser.photo ? (
                        <img src={demoUser.photo} alt="Profile" className="h-16 w-16 rounded-full object-cover border-2 border-[#a94438] mb-2" />
                      ) : (
                        <span className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-200 border-2 border-[#a94438] mb-2 text-4xl text-[#a94438]">
                          <FaUserCircle />
                        </span>
                      )}
                      <div className="font-bold text-lg mb-2">{demoUser.name}</div>
                      <button
                        className="w-full px-6 py-2 hover:bg-[#f5e7e5] text-left transition text-left"
                        onClick={() => { setProfileOpen(false); setMobileMenuOpen(false); navigate('/employee/orders'); }}
                      >
                        Orders
                      </button>
                      <a href="/employee/settings" className="w-full px-6 py-2 hover:bg-[#f5e7e5] text-left transition">Settings</a>
                      <button
                        className="w-full px-6 py-2 text-left hover:bg-[#f5e7e5] transition text-[#a94438] font-bold"
                        onClick={() => { setProfileOpen(false); setMobileMenuOpen(false); handleLogout(); }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
