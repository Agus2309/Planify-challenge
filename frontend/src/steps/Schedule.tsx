import React, { useEffect, useState } from 'react'
import { Card, CardContent, Button, LinearProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { API_URL } from '../App'

interface SlotSelection {
  index: number | null
  timeSlot: string
}

const Schedule: React.FC = () => {
  const [slots, setSlots] = useState<any[]>([])
  const [selectedSlot, setSelectedSlot] = useState<SlotSelection>({
    index: null,
    timeSlot: ''
  })

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      const response = await fetch(`${API_URL}/slots`)
      if (!response.ok) {
        throw new Error('Error fetching slots: Network response was not ok')
      }
      const data = await response.json()
      console.log('Slots Data:', data)
      setSlots(
        data.map((slot: any) => ({
          ...slot,
          date: formatDate(slot.date)
        }))
      )
    } catch (error) {
      console.error('Error fetching slots:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    } as Intl.DateTimeFormatOptions
    return date.toLocaleDateString('es-ES', options)
  }

  const handleCardClick = (index: number, timeSlotIndex: number) => {
    const selectedTimeSlot = slots[index]?.availableTimeslots[timeSlotIndex]

    setSelectedSlot({ index, timeSlot: selectedTimeSlot })
    console.log('Selected Slot:', { index, timeSlot: selectedTimeSlot })
  }

  const handleConfirmClick = () => {
    if (selectedSlot.index !== null) {
      const { index, timeSlot } = selectedSlot
      const selectedSlotWithTime = {
        ...slots[index],
        timeSlot: timeSlot
      }
      localStorage.setItem('selectedSlot', JSON.stringify(selectedSlotWithTime))
    }
  }

  return (
    <>
      <div className='min-h-screen mb-20'>
        <div className='mxxs:max-w-xs mx-auto mt-3'>
          <p className='text-left text-lg font-bold'>Seleccionar Horario</p>
          <LinearProgress
            color='success'
            variant='determinate'
            value={66}
            sx={{ height: '15px' }}
          />
        </div>
        <section className='mt-5'>
          <Card
            className='max-w-xs mx-auto border border-gray-400'
            sx={{ borderRadius: '0px' }}
          >
            <CardContent>
              <p className='font-bold'>Próximos turnos disponibles</p>
              {slots.map((slot: any, index: number) => (
                <div
                  key={index}
                  className={`card-container ${
                    selectedSlot.index === index ? 'clicked' : ''
                  }`}
                >
                  <p className='font-semibold mt-4'>{slot.date}</p>
                  <div className='flex flex-wrap justify-around'>
                    {slot.availableTimeslots.map(
                      (timeSlot: string, timeSlotIndex: number) => (
                        <div
                          key={timeSlotIndex}
                          className='w-1/3 flex justify-center border p-2 bg-gray-300 m-1 rounded transition-transform duration-300 hover:shadow-2xl hover:scale-105'
                          onClick={() => handleCardClick(index, timeSlotIndex)}
                        >
                          <p className='text-lg'>{timeSlot}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className='mt-10 w-full bottom-0'>
            <Card
              className='border border-gray-400'
              sx={{ borderRadius: '0px' }}
            >
              <CardContent className='flex justify-between ml-5 mr-5'>
                <Link to={'../'}>
                  <Button
                    variant='contained'
                    className='bg-gray-700'
                    sx={{
                      backgroundColor: 'rgb(55 65 81)',
                      borderRadius: '0%'
                    }}
                  >
                    Anterior
                  </Button>
                </Link>
                {selectedSlot.index !== null ? (
                  <Link to={'/confirm'}>
                    <Button
                      variant='contained'
                      className='bg-gray-700'
                      sx={{
                        backgroundColor: 'rgb(55 65 81)',
                        borderRadius: '0%'
                      }}
                      onClick={handleConfirmClick}
                    >
                      Siguiente
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant='contained'
                    className='bg-gray-700'
                    disabled
                    sx={{
                      backgroundColor: 'rgb(55 65 81)',
                      borderRadius: '0%',
                      pointerEvents: 'none' 
                    }}
                  >
                    Siguiente
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}

export default Schedule
