import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Service from './steps/Service';
import Schedule from './steps/Schedule';
import Confirm from './steps/Confirm';
import { LinearProgress } from '@mui/material';
import Footer from './Footer';

function ProgressBar() {
  const location = useLocation();
  const steps = ['/service', '/schedule', '/confirm'];

  const currentStepIndex = steps.indexOf(location.pathname);

  const progress = (currentStepIndex + 1) / steps.length * 70;

  return <LinearProgress color='success' variant="determinate" value={progress + 10} sx={{height:'15px'}} />;
}

function App() {
  return (
    <Router>
      <div className='min-h-screen mb-24'> {/** revisar mas tarde */}
        <div className='mxxs:max-w-xs mx-auto mt-3'>
          <p className='text-left text-lg font-bold'>Seleccionar servicio</p>
          <ProgressBar />
        </div>
        <Routes>
          <Route path="/" element={<Service />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
