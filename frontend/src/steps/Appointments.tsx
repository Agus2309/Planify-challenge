import { Card, CardContent } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Appointments: React.FC = () => {
    const [appointments, setAppointments] = useState<any[]>([]); // Array para almacenar los turnos

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/turnos');
                
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                } else {
                    console.error('Error al obtener los turnos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los turnos:', error);
            }
        };
        fetchData();
    }, []); 

    return (
        <div>
            <p className='text-center text-3xl font-bold'>Mis Turnos:</p>
                {appointments.map(appointment => (
                    <Card className="max-w-xs mx-auto border border-gray-400 mt-4" sx={{borderRadius: '0px'}} key={appointment.id}>
                        <CardContent>
                            <p className='text-lg'><strong>Fecha:</strong> {appointment.selectedSlot.date}</p>
                            <p className='text-lg'><strong>Hora:</strong> {appointment.selectedSlot.timeSlot}</p>
                            <p className='text-lg'><strong>Servicio:</strong> {appointment.selectedService.name}</p>
                        </CardContent> 
                    </Card>
                ))}
        </div>
    );
};

export default Appointments;