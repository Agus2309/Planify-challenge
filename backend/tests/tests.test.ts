import request from 'supertest'
import app from '../src/app'

describe('GET /services', () => {
  it('Devuelve un JSON con los servicios', async () => {
    const response = await request(app).get('/services')
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
  })
})

describe('GET /slots', () => {
  it('Devuelve un JSON con los horarios', async () => {
    const response = await request(app).get('/slots')
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
  })
})

describe('GET /turnos', () => {
  it('Devuelve un JSON con los turnos', async () => {
    const response = await request(app).get('/turnos')
    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined()
  })
})

describe('POST /turnos', () => {
  it('Crea un nuevo turno', async () => {
    const newTurno = {
      selectedService: {
        id: 2,
        name: 'Service1',
        desciption: 'service1',
        category: 'example'
      },
      selectedSlot: {
        date: '2024-04-07',
        timeSlot: '10:00'
      }
    }

    const response = await request(app).post('/turnos').send(newTurno)

    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty(
      'message',
      'Turno guardado correctamente'
    )
    expect(response.body).toHaveProperty('turnoId')
  })
})

describe('DELETE /turnos/:id', () => {
  it('elimina el turno', async () => {
    const turnoIdToDelete = 'someId'

    const response = await request(app).delete(`/turnos/${turnoIdToDelete}`)
    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty(
      'message',
      'El turno ha sido eliminado correctamente'
    )
  })
})
