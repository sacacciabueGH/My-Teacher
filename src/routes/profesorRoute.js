import express from 'express';
import { registrarProfesor, traerProfesores,buscarProfesorPorId, buscarProfesorPorMateria } from '../controllers/profesorController.js';

const router = express.Router();
//POSTS
router.post('/registrar', registrarProfesor);

//GETS
router.get('/',traerProfesores)
router.get('/:id', buscarProfesorPorId);
router.get('/materia/:materia',buscarProfesorPorMateria);

export default router;
