import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";

const Schedule: React.FC = () => {
    const [slots, setSlots] = useState<any[]>([]);

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
            console.log(data);
            setSlots(data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };    
    
    return(
        <>
            <section className="mt-5">
                <Card className='max-w-xs mx-auto border border-gray-400' sx={{borderRadius: '0px'}}>
                    <CardContent>
                        <p className="font-bold">Próximos turnos disponibles</p>                 
                        {slots.map((slot: any, index: number) => (
                            <div key={index}>
                                <p className="font-semibold mt-4">{slot.date}</p>
                                <div className="flex flex-wrap justify-between">
                                    {slot.availableTimeslots.map((timeSlot: string, timeSlotIndex: number) => (
                                        <div key={timeSlotIndex} className="border p-2 bg-gray-300 m-1">
                                            <p className="text-lg">{timeSlot}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
        </>
    );
}

export default Schedule;
