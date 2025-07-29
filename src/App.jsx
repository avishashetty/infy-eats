import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpLogin from './pages/login/EmpLogin.jsx';  // Use correct import name

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <Routes>
          <Route path="/login/employee" element={<EmpLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
