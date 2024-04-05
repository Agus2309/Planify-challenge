import { Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const Confirm: React.FC = () => {
    const selectedService = JSON.parse(localStorage.getItem('selectedService') || '{}');
    const selectedSlot = JSON.parse(localStorage.getItem('selectedSlot') || '{}');

    const handleConfirmation = async () => {
        console.log('Selected Service:', selectedService);
        console.log('Selected Slot:', selectedSlot);

        try {
            const response = await fetch('http://localhost:3000/turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedService,
                    selectedSlot
                })
            });

            if (!response.ok) {
                throw new Error('Error al confirmar el turno');
            }

            // redirigir a pagina de exito
        } catch (error) {
            console.error('Error al confirmar el turno:', error);
        }
    };

    return(
        <>
            <section className="mt-6">
                <Card className="max-w-xs mx-auto border border-gray-400" sx={{borderRadius: '0px'}}>
                    <CardContent>
                        <p className="text-lg"><strong>Servicio:</strong> {selectedService ? selectedService.name : 'No se ha seleccionado un servicio'}</p>
                        <p className="text-lg"><strong>Fecha: </strong> {selectedSlot ? selectedSlot.date : 'No se ha seleccionado un horario'}, {selectedSlot ? selectedSlot.timeSlot : ''}</p>
                    </CardContent>
                </Card>
                <div className='mt-10 w-full fixed bottom-20'>
                    <Card className='border border-gray-400' sx={{borderRadius: '0px'}}>
                        <CardContent className='flex justify-between ml-5 mr-5'>
                            <Link to={'../schedule'}>
                                <Button variant='contained' className='bg-gray-700' sx={{backgroundColor: 'rgb(55 65 81)', borderRadius: '0%'}}>Anterior</Button>
                            </Link>
                            <Button 
                                variant='contained' 
                                className='bg-gray-700' 
                                sx={{backgroundColor: 'rgb(55 65 81)', borderRadius: '0%'}}
                                onClick={handleConfirmation}
                            >
                                Confirmar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
}

export default Confirm;
