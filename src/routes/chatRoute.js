import express from 'express';
import { obtenerMensajes,obtenerChatsProfesor } from '../model/chatModel.js';

const router = express.Router();

router.get('/:alumno_id/:profesor_id', obtenerMensajes);
router.get('/profesor/:profesor_id/chats', obtenerChatsProfesor);

export default router;