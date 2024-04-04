import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

export default app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
