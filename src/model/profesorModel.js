import db from '../DB/db.js';

export const crearProfesor = (id, profesor, callback) => {
    const query = 'INSERT INTO profesores (id, materia, disponibilidad, descripcion, foto) VALUES (?, ?, ?, ?, ?)';
    const values = [id, profesor.materia, profesor.disponibilidad, profesor.descripcion, profesor.foto];
    db.query(query, values, callback);
};

export const obtenerProfesores = (callback) => {
    db.query('SELECT * FROM usuarios u JOIN profesores p ON u.id = p.id', callback);
};