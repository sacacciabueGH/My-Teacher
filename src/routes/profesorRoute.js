import express from 'express';
import { registrarProfesor, traerProfesores } from '../controllers/profesorController.js';

const router = express.Router();
router.post('/registrar', registrarProfesor);

router.get('/',traerProfesores)

export default router;
