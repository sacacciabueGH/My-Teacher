import express from 'express';
import { registrarAlumno,traerAlumnos } from '../controllers/alumnoController.js';

const router = express.Router();
router.post('/registrarAlumno', registrarAlumno);

router.get('/',traerAlumnos);

export default router;
