import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

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

export default router;