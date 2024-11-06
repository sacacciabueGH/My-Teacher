import express from 'express';
import { registrarAlumno,traerAlumnos,loguearAlumno } from '../controllers/alumnoController.js';

const router = express.Router();
//POSTS
router.post('/registrarAlumno', registrarAlumno);

//GETS
router.get('/',traerAlumnos);
router.post('/logueoAlumno',loguearAlumno);

export default router;
