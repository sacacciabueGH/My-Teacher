import db from '../DB/db.js';

export const crearUsuario = (usuario, callback) => {
    const query = 'INSERT INTO usuarios (email, password, nombre, apellido, ciudad, direccion, telefono, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [usuario.email, usuario.password, usuario.nombre, usuario.apellido, usuario.ciudad, usuario.direccion, usuario.telefono, usuario.tipo];
    db.query(query, values, callback);
};

export const obtenerUsuarioPorId = (id, callback) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};