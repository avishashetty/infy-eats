import { useEffect, useRef , useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Rest1 from '../../assets/rest1.jpg';
import Rest2 from '../../assets/rest2.jpg';
import Rest3 from '../../assets/rest3.jpg';
// Demo canteen data
const canteens = [
  {
    id: 1,
    name: 'Infy Main Canteen',
    image: Rest1,
    description: 'Spacious, multi-cuisine, and always buzzing with energy. The heart of Infy Eats!',
  },
  {
    id: 2,
    name: 'South Block Cafe',
    image: Rest2,
    description: 'Authentic South Indian flavors and quick bites. Perfect for a quick recharge.',
  },
  {
    id: 3,
    name: 'North Star Diner',
    image: Rest3,
    description: 'Classic North Indian thalis and street food favorites. A taste of home.',
  },
  {
    id: 1,
    name: 'Infy Main Canteen',
    image: Rest1,
    description: 'Spacious, multi-cuisine, and always buzzing with energy. The heart of Infy Eats!',
  },
  {
    id: 2,
    name: 'South Block Cafe',
    image: Rest2,
    description: 'Authentic South Indian flavors and quick bites. Perfect for a quick recharge.',
  },
  {
    id: 3,
    name: 'North Star Diner',
    image: Rest3,
    description: 'Classic North Indian thalis and street food favorites. A taste of home.',
  },
];

function Canteen() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  // Animation: fade in cards
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100); // slight delay for effect
  }, []);

  return (
    <div className="min-h-screen bg-[#261a18] flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Canteens</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {canteens.map((canteen, idx) => (
            <div
              key={canteen.id + canteen.name + idx}
              className={`relative bg-[#fceeea] rounded-3xl shadow-xl overflow-hidden flex flex-col items-center transition-all duration-700 ease-out transform ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} hover:scale-105 hover:shadow-2xl group`}
              style={{ minHeight: 380 }}
            >
              <img
                src={canteen.image}
                alt={canteen.name}
                className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="flex-1 flex flex-col justify-between p-6 w-full">
                <div>
                  <h2 className="text-xl font-bold text-[#a94438] mb-2">{canteen.name}</h2>
                  <p className="text-[#4a3b3b] text-sm mb-4 min-h-[48px]">{canteen.description}</p>
                </div>
                <button
                  className="mt-auto px-5 py-2 rounded-full bg-[#a94438] text-white font-bold shadow hover:bg-[#4a3b3b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a94438]/50"
                  onClick={() => navigate('/employee/counter')}
                >
                  View Counters
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer footerRef={footerRef} footerVisible={true} />
    </div>
  );
}

export default Canteen;