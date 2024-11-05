import express from 'express';
import { registrarAlumno,traerAlumnos } from '../controllers/alumnoController.js';

const router = express.Router();
//POSTS
router.post('/registrarAlumno', registrarAlumno);

//GETS
router.get('/',traerAlumnos);

export default router;
