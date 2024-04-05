import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Service from './steps/Service';
import Schedule from './steps/Schedule';
import Confirm from './steps/Confirm';
import { LinearProgress } from '@mui/material';
import Footer from './Footer';
import { useState } from 'react';
import Appointments from './steps/Appointments';

function ProgressBar() {
  const location = useLocation();
  const steps = ['/service', '/schedule', '/confirm'];
  const currentStepIndex = steps.indexOf(location.pathname);
  const progress = (currentStepIndex + 1) / steps.length * 70;

  if (location.pathname !== '/appointments') {
    return <LinearProgress color='success' variant="determinate" value={progress + 10} sx={{height:'15px'}} />;
  } else {
    return null;
  }
}

function App() {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
  };

  const renderTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Seleccionar servicio';
      case '/schedule':
        return 'Seleccionar horario';
      case '/confirm':
        return 'Confirmar selección';
      default:
        return '';
    }
  };

  return (
    <Router>
      <div className='mb-24'>
        <div className='mxxs:max-w-xs mx-auto mt-3'>
          <p className='text-left text-lg font-bold'>{renderTitle()}</p>
          <ProgressBar />
        </div>
        <Routes>
          <Route path="/" element={<Service onSelectService={handleServiceSelect} />} />
          <Route path="/schedule" element={<Schedule selectedService={selectedService} onSelectSlot={handleSlotSelect} />} />
          <Route path="/confirm" element={<Confirm selectedService={selectedService} selectedSlot={selectedSlot} />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
