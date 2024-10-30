import db from '../DB/db.js';

export const crearAlumno = (id, curso, callback) => {
    const query = 'INSERT INTO alumnos (id, curso) VALUES (?, ?)';
    db.query(query, [id, curso], callback);
};

export const obtenerAlumnos = (callback) => {
    db.query('SELECT * FROM usuarios u JOIN alumnos a ON u.id = a.id', callback);
};