import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

router.use(express.json());

function generateId(): string {
  const min = 100000000;
  const max = 999999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

router.get('/services', (req: Request, res: Response) => {
  fs.readFile('services.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    const services = JSON.parse(data);
    res.json(services);
  });
});

router.get('/slots', (req: Request, res: Response) => {
  fs.readFile('slots.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    const slots = JSON.parse(data);
    res.json(slots);
  });
});

router.get('/turnos', (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync('turnos.json', 'utf8');
    console.log('Contenido de turnos.json:', data);
    const turnos = JSON.parse(data);
    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener los turnos:', error);
    res.status(500).send('Error interno del servidor al obtener los turnos');
  }
});

router.post('/turnos', (req: Request, res: Response) => {
  if (!req.body || !req.body.selectedService || !req.body.selectedSlot) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const data = fs.readFileSync('turnos.json', 'utf8');
    const turnos = JSON.parse(data);

    const newTurno = {
      id: generateId(),
      selectedService: req.body.selectedService,
      selectedSlot: {
        date: req.body.selectedSlot.date,
        timeSlot: req.body.selectedSlot.timeSlot
      }
    };

    turnos.push(newTurno);

    fs.writeFileSync('turnos.json', JSON.stringify(turnos, null, 2));

    res.status(201).json({ message: 'Turno guardado correctamente', turnoId: newTurno.id });
  } catch (error) {
    console.error('Error al guardar el turno:', error);
    res.status(500).json({ error: 'Error interno del servidor al guardar el turno' });
  }
});

router.delete('/turnos', (req: Request, res: Response) => {
  fs.writeFile('turnos.txt', '', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor al borrar los turnos');
    }
    res.json({ message: 'Todos los turnos han sido eliminados correctamente' });
  });
});

export default router;
