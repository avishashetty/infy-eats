import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Demo order data with status
const ordersByDate = [
  {
    date: '2025-08-05',
    orders: [
      {
        id: 'ORD12345',
        status: 'Delivered',
        items: [
          { name: 'Chicken Biriyani', qty: 1 },
          { name: 'Gulab Jamun', qty: 2 },
        ],
      },
      {
        id: 'ORD12346',
        status: 'Preparing',
        items: [
          { name: 'Paneer Roti', qty: 1 },
        ],
      },
    ],
  },
  {
    date: '2025-08-04',
    orders: [
      {
        id: 'ORD12340',
        status: 'Cancelled',
        items: [
          { name: 'North Mini', qty: 2 },
          { name: 'Rasmalai', qty: 1 },
        ],
      },
    ],
  },
];

// Status color mapping
const statusColors = {
  Delivered: 'bg-green-100 text-green-800',
  Preparing: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
};

function Orders() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2d1e1b] via-[#3e2320] to-[#a94438]">
      <Header />
      <main className="flex-1 px-4 py-10 max-w-2xl mx-auto w-full overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-white mb-10 tracking-tight text-center">
          Order History
        </h1>
        <div className="flex flex-col gap-10">
          {ordersByDate.map((section) => (
            <div key={section.date}>
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block bg-[#a94438] text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  {new Date(section.date).toLocaleDateString()}
                </span>
                <span className="text-white/70 text-xs">
                  {section.orders.length} order{section.orders.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex flex-col gap-6">
                {section.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-[#a94438] hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#a94438] text-base">
                        Order #{order.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#fceeea] text-[#4a3b3b]">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </span>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm ${
                            statusColors[order.status] || 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <ul className="pl-4 list-disc text-[#4a3b3b] text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-xs text-gray-500">x{item.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Orders;
