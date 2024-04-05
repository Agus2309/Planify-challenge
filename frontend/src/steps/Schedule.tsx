import React, { useEffect, useState } from 'react';
import { Card, CardContent, Button } from "@mui/material";
import { Link } from 'react-router-dom';

const Schedule: React.FC = () => {
    const [slots, setSlots] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await fetch('http://localhost:3000/slots');
            if (!response.ok) {
                throw new Error('Error fetching slots: Network response was not ok');
            }
            const data = await response.json();
            setSlots(data.map((slot: any) => ({
                ...slot,
                date: formatDate(slot.date)
            })));
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };    

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
        return date.toLocaleDateString('es-ES', options);
    };    

    const handleCardClick = (index: number) => {
        setSelectedSlot(index === selectedSlot ? null : index);
    };
    
    const handleConfirmClick = () => {
        if (selectedSlot !== null) {
            const selectedSlotWithTime = { ...slots[selectedSlot], timeSlot: slots[selectedSlot].availableTimeslots[selectedSlot] };
            localStorage.setItem('selectedSlot', JSON.stringify(selectedSlotWithTime));
        }
    };
    
    return(
        <>
            <section className="mt-5">
                <Card className='max-w-xs mx-auto border border-gray-400' sx={{borderRadius: '0px'}}>
                    <CardContent>
                        <p className="font-bold">Próximos turnos disponibles</p>                 
                        {slots.map((slot: any, index: number) => (
                            <div 
                                key={index} 
                                className={`card-container ${selectedSlot === index ? 'clicked' : ''}`} 
                                onClick={() => handleCardClick(index)}
                            >
                                <p className="font-semibold mt-4">{slot.date}</p>
                                <div className="flex flex-wrap justify-around">
                                    {slot.availableTimeslots.map((timeSlot: string, timeSlotIndex: number) => (
                                        <div 
                                            key={timeSlotIndex} 
                                            className="w-1/3 flex justify-center border p-2 bg-gray-300 m-1 rounded transition-transform duration-300 hover:shadow-2xl hover:scale-105"
                                        >
                                            <p className="text-lg">{timeSlot}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className='mt-10 w-full bottom-0'>
                    <Card className='border border-gray-400' sx={{borderRadius: '0px'}}>
                        <CardContent className='flex justify-between ml-5 mr-5'>
                            <Link to={'../'}>
                                <Button variant='contained' className='bg-gray-700' sx={{backgroundColor: 'rgb(55 65 81)', borderRadius: '0%'}}>Anterior</Button>
                            </Link>
                            <Link to={'/confirm'}>
                                <Button 
                                    variant='contained' 
                                    className='bg-gray-700' 
                                    sx={{backgroundColor: 'rgb(55 65 81)', borderRadius: '0%'}}
                                    disabled={selectedSlot === null}
                                    onClick={handleConfirmClick}
                                >
                                    Siguiente
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
}

export default Schedule;
