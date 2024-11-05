// routes/valoracionRoutes.js
import express from 'express';
import { crearValoracion, obtenerPromedioProfesor } from '../controllers/valoracionController.js';

const router = express.Router();

// Ruta para crear una nueva valoración
router.post('/valoraciones', crearValoracion);

// Ruta para obtener el promedio de valoraciones de un profesor por su ID
router.get('/valoraciones/promedio/:profesor_id', obtenerPromedioProfesor);

export default router;
