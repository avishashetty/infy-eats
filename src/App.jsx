import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpLogin from './pages/login/EmpLogin.jsx';  
import HomePage from './pages/employee/HomePage.jsx'; 
import Canteen from './pages/employee/Canteen.jsx'; 
import Settings from './pages/employee/Settings.jsx'; 
import Carts from './pages/employee/Carts.jsx';
import Menu from './pages/employee/Menu.jsx'; 
import Counter from './pages/employee/Counter.jsx'; 
import Orders from './pages/employee/Orders.jsx'; 


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
