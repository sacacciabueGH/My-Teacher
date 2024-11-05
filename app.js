import express from 'express';
import alumnoRoutes from './src/routes/alumnoRoute.js';
import profesorRoutes from './src/routes/profesorRoute.js';
import cors from 'cors';

const app = express();
const PORT = 8080;


const server = app.listen(PORT,()=>{
    console.log('Escuchando en '+PORT);
})

app.use(cors());
app.use(express.json());
app.use('/alumnos', alumnoRoutes);
app.use('/profesores', profesorRoutes);

