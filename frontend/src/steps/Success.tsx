import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Success: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col items-center space-y-6'>
        <p className='text-2xl font-bold text-center'>
          ¡Su turno ha sido confirmado!
        </p>
        <img className='h-32' src='success.svg' />
      </div>
      <div className='flex flex-col justify-center items-center mt-10 space-y-5'>
        <Link to={'/appointments'}>
          <Button variant='contained' size='large' sx={{ fontSize: '20px', backgroundColor: 'rgb(55 65 81)', borderRadius: '5px'}}>
            Ver mis turnos
          </Button>
        </Link>
        <Link to={'/'}>
          <Button variant='contained' size='large' sx={{ fontSize: '20px', backgroundColor: 'rgb(55 65 81)', borderRadius: '5px'}}>
            Volver
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Success
