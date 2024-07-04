import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes/index.route';
import protectedRoutes from './routes/protectedRoutes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware para manejar CORS
app.use((__req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Especifica el origen permitido
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Encabezados permitidos
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permite el envío de cookies
  next();
});

// Rutas
app.use(router);
app.use(protectedRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
