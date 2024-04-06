import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '../App';



const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/turnos`)

        if (response.ok) {
          const data = await response.json()
          setAppointments(data)
        } else {
          console.error('Error al obtener los turnos:', response.statusText)
        }
      } catch (error) {
        console.error('Error al obtener los turnos:', error)
      }
    }
    fetchData()
  }, [])

  const handleDeleteAppointment = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/turnos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const updatedAppointments = appointments.filter(
          appointment => appointment.id !== id
        )
        setAppointments(updatedAppointments)
      } else {
        console.error('Error al eliminar el turno:', response.statusText)
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error)
    }
    setOpenModal(false)
  }

  const handleOpenModal = (id: string) => {
    setOpenModal(true)
    setAppointmentIdToDelete(id)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className='min-h-screen mb-20 flex items-center justify-center'>
      <div>
        <p className='mt-5 text-center text-3xl font-bold'>Mis Turnos:</p>
        {appointments.map(appointment => (
          <Card
            key={appointment.id}
            className='max-w-xs mx-auto border border-gray-400 mt-4'
            sx={{
              borderRadius: '0px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1
              }}
            >
              <p className='text-lg'>
                <strong>Fecha:</strong> {appointment.selectedSlot.date}
              </p>
              <p className='text-lg'>
                <strong>Hora:</strong> {appointment.selectedSlot.timeSlot}
              </p>
              <p className='text-lg'>
                <strong>Servicio:</strong> {appointment.selectedService.name}
              </p>
              <div className='w-full justify-center items-center mx-auto mt-2'>
                <Button
                  className='h-12'
                  variant='contained'
                  sx={{
                    width: '100%',
                    color: 'black',
                    backgroundColor: 'rgb(156 163 175)'
                  }}
                  onClick={() => handleOpenModal(appointment.id)}
                >
                  <DeleteIcon sx={{ fontSize: '30px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle className='text-center' sx={{ fontSize: '28px' }}>Confirmar cancelación</DialogTitle>
            <DialogContent>
                <DialogContentText>
                ¿Estás seguro de que quieres cancelar este turno?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <div className='flex justify-center space-x-5 w-full'>
                <Button onClick={handleCloseModal} sx={{ width: '40%', fontSize: '18px' }}>Cancelar</Button>
                <Button
                    onClick={() => handleDeleteAppointment(appointmentIdToDelete)}
                    autoFocus
                    sx={{ width: '40%', fontSize: '18px' }}
                >
                    Confirmar
                </Button>
                </div>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default Appointments
