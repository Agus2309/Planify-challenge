import { Button, Card, CardContent, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

const Confirm: React.FC = () => {
    const selectedService = JSON.parse(localStorage.getItem('selectedService') || '{}');
    const selectedSlot = JSON.parse(localStorage.getItem('selectedSlot') || '{}')

    const navigate = useNavigate()

    const handleConfirmation = async () => {
        console.log('Selected Service:', selectedService)
        console.log('Selected Slot:', selectedSlot)

        try {
            const response = await fetch(`${API_URL}/turnos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedService,
                selectedSlot
            })
            })

            if (!response.ok) {
            throw new Error('Error al confirmar el turno')
            }
            
            navigate('/success')
            
        } catch (error) {
            console.error('Error al confirmar el turno:', error)
        }
    }

    const handlePreviousClick = () => {
        localStorage.removeItem('selectedSlot');
    }

    return(
        <>
            <div className="mxxs:max-w-xs xxxs:max-w-80 mx-auto mt-3">
                <p className="text-left text-lg font-bold">Confirmar turno</p>
                <LinearProgress
                color="success"
                variant="determinate"
                value={80}
                sx={{ height: "15px" }}
                />
            </div>
            <section className="mt-6">
                <Card className="max-w-xs mx-auto border border-gray-400" sx={{borderRadius: '0px'}}>
                    <CardContent>
                        <p className="text-lg"><strong>Servicio:</strong> {selectedService ? selectedService.name : 'No se ha seleccionado un servicio'}</p>
                        <p className="text-lg">
                            <strong>Fecha:</strong>{" "}
                            {(selectedSlot.date) || "No se ha seleccionado una fecha"},{" "}
                            {(selectedSlot.timeSlot) || "No se ha seleccionado un horario"}
                        </p>
                    </CardContent>
                </Card>
                <div className='mt-10 w-full fixed bottom-20'>
                    <Card className='border border-gray-400' sx={{borderRadius: '0px'}}>
                        <CardContent className='flex justify-between ml-5 mr-5'>
                            <Link to={'../schedule'} onClick = { handlePreviousClick }>
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
