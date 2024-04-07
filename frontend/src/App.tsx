import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './steps/Service';
import Schedule from './steps/Schedule';
import Confirm from './steps/Confirm';
import Footer from './Footer';
import { useState } from 'react';
import Appointments from './steps/Appointments';
import Success from './steps/Success';

export const API_URL = 'https://planify-challenge.onrender.com';

function App() {
  const [, setSelectedService] = useState<any | null>(null);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Service onSelectService={handleServiceSelect} />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
