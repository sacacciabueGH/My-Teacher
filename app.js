import express from 'express';
import alumnoRoutes from './src/routes/alumnoRoute.js';
import profesorRoutes from './src/routes/profesorRoute.js';
import chatRoute from './src/routes/chatRoute.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { guardarMensaje } from './src/model/chatModel.js';


const app = express();
const PORT = 8080;


const server = app.listen(PORT,()=>{
    console.log('Escuchando en '+PORT);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/alumnos', alumnoRoutes);
app.use('/profesores', profesorRoutes);
app.use('/mensajes',chatRoute);

const corsOptions = {
    origin: 'http://127.0.0.1:5500',  // o 'http://localhost:5500' si es necesario
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

const io = new Server(server, {
    cors: corsOptions  // Configuración de CORS para Socket.IO
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Escucha cuando un cliente envía un mensaje
    socket.on('sendMessage', async (data) => {
        const { alumno_id, profesor_id, mensaje } = data;
        
        // Guarda el mensaje en la base de datos
        try {
            await guardarMensaje(alumno_id, profesor_id, mensaje);
            // Envía el mensaje a todos los clientes conectados
            io.emit('message', data);
        } catch (error) {
            console.error("Error al guardar mensaje en la base de datos:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});