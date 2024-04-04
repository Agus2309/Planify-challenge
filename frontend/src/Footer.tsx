import React, { useState } from 'react';
import CoffeeIcon from '@mui/icons-material/Coffee';

const Footer: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex items-center justify-center space-x-5 fixed w-full h-16 bg-transparent rounded-t-sm bottom-0">
      <a className={`flex flex-col items-center justify-center ${selectedOption === 'reserve' ? 'selected' : ''}`} onClick={() => handleOptionClick('reserve')}>
        <CoffeeIcon sx={{ fontSize: 30 }} className={selectedOption === 'reserve' ? 'text-violet-800' : 'text-gray-700'} />
        <p className={selectedOption === 'reserve' ? 'text-violet-800 font-bold' : 'text-gray-700 font-bold'}>Reservar</p>
        {selectedOption === 'reserve' && <div className="line" />}
      </a>
      <a className={`flex flex-col items-center justify-center ${selectedOption === 'myTurns' ? 'selected' : ''}`} onClick={() => handleOptionClick('myTurns')}>
        <CoffeeIcon sx={{ fontSize: 30 }} className={selectedOption === 'myTurns' ? 'text-violet-800' : 'text-gray-700'} />
        <p className={selectedOption === 'myTurns' ? 'text-violet-800 font-bold' : 'text-gray-700 font-bold'}>Mis turnos</p>
        {selectedOption === 'myTurns' && <div className="line" />}
      </a>
    </div>
  );
}

export default Footer;
