import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpLogin from './pages/login/EmpLogin.jsx';  // Use correct import name
import HomePage from './pages/employee/HomePage.jsx'; // Assuming you have a HomePage component
import Canteen from './pages/employee/Canteen.jsx'; // Assuming you have a Canteen component
import Settings from './pages/employee/Settings.jsx'; // Assuming you have a Settings component
import Carts from './pages/employee/Carts.jsx';
import Menu from './pages/employee/Menu.jsx'; // Assuming you have a Menu component
import Counter from './pages/employee/Counter.jsx'; // Assuming you have a Counter component
import Orders from './pages/employee/Orders.jsx'; // Assuming you have an Orders component

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login/employee" element={<EmpLogin />} />
          <Route path="/employee/home" element={<HomePage />} />
          <Route path="/employee/canteen" element={<Canteen />} />
          <Route path="/employee/settings" element={<Settings />} />
          <Route path="/employee/carts" element={<Carts />} />
          <Route path="/employee/menu" element={<Menu />} />
          <Route path="/employee/counter" element={<Counter />} />
          <Route path="/employee/orders" element={<Orders />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
