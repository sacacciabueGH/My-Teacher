// controllers/valoracionController.js
import { agregarValoracion, obtenerPromedioValoracion } from '../models/valoracionModel.js';

export const crearValoracion = (req, res) => {
    const valoracion = req.body;
    agregarValoracion(valoracion, (err) => {
        if (err) {
            console.error("Error al agregar la valoración:", err);
            return res.status(500).json({ error: 'Error al agregar la valoración' });
        }
        res.status(200).json({ message: 'Valoración agregada con éxito' });
    });
};

export const obtenerPromedioProfesor = (req, res) => {
    const { profesor_id } = req.params;
    obtenerPromedioValoracion(profesor_id, (err, promedio) => {
        if (err) {
            console.error("Error al obtener el promedio de valoraciones:", err);
            return res.status(500).json({ error: 'Error al obtener el promedio de valoraciones' });
        }
        res.status(200).json({ promedio });
    });
};
