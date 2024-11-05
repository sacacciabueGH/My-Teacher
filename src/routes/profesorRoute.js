import express from 'express';
import { registrarProfesor, traerProfesores,buscarProfesorPorId, buscarProfesorPorMateria, buscarProfesorPorHora, loguearProfesor } from '../controllers/profesorController.js';

const router = express.Router();
//POSTS
router.post('/registrar', registrarProfesor);

//GETS
router.get('/',traerProfesores)
router.get('/:id', buscarProfesorPorId);
router.get('/materia/:materia',buscarProfesorPorMateria);
router.get('/disponibilidad/:disponibilidad',buscarProfesorPorHora);
router.post('/logueoProfesor',loguearProfesor)

export default router;
