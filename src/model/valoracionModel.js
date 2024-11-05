import db from '../config/database.js';

export const agregarValoracion = (valoracion, callback) => {
    const query = `INSERT INTO valoraciones (profesor_id, alumno_id, puntuacion, comentario)
                   VALUES (?, ?, ?, ?) 
                   ON DUPLICATE KEY UPDATE puntuacion = VALUES(puntuacion), comentario = VALUES(comentario)`;
    const values = [valoracion.profesor_id, valoracion.alumno_id, valoracion.puntuacion, valoracion.comentario];
    db.query(query, values, callback);
};

export const obtenerPromedioValoracion = (profesor_id, callback) => {
    const query = `SELECT AVG(puntuacion) AS promedio FROM valoraciones WHERE profesor_id = ?`;
    db.query(query, [profesor_id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0].promedio);
    });
};
