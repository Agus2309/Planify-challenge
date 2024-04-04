import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Service from './steps/Service';
import Schedule from './steps/Schedule';
import Confirm from './steps/Confirm';
import { LinearProgress } from '@mui/material';
import Footer from './Footer';

function ProgressBar() {
  const location = useLocation();
  const steps = ['/service', '/schedule', '/confirm']; // Define your step paths

  // Calculate current step index
  const currentStepIndex = steps.indexOf(location.pathname);

  // Calculate progress percentage
  const progress = (currentStepIndex + 1) / steps.length * 100;

  return <LinearProgress color='success' variant="determinate" value={progress} sx={{height:'12px'}} />;
}

function App() {
  return (
    <Router>
      <div className='mxxs:max-w-xs mx-auto mt-3'>
        <p className='text-left text-lg font-bold'>Seleccionar servicio</p>
        <ProgressBar />
      </div>
      <Routes>
        <Route path="/" element={<Service />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
