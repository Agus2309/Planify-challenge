import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './steps/Service';
import Schedule from './steps/Schedule';
import Confirm from './steps/Confirm';
import Footer from './Footer';
import { useState } from 'react';
import Appointments from './steps/Appointments';
import Success from './steps/Success';

export const API_URL = 'http://localhost:3000';

function App() {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Service onSelectService={handleServiceSelect} />} />
          <Route path="/schedule" element={<Schedule selectedService={selectedService} onSelectSlot={handleSlotSelect} />} />
          <Route path="/confirm" element={<Confirm selectedService={selectedService} selectedSlot={selectedSlot} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
