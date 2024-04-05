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
            <h2>Turnos:</h2>
                {appointments.map(appointment => (
                    <Card key={appointment.id}>
                        <CardContent>
                            <p>Fecha: {appointment.selectedSlot.date}</p>
                            <p>Hora: {appointment.selectedSlot.timeSlot}</p>
                            <p>Servicio: {appointment.selectedService.name}</p>
                        </CardContent> 
                    </Card>
                ))}
        </div>
    );
};

export default Appointments;
