import db from '../config/db.js';

export const guardarMensaje = (alumno_id, profesor_id, mensaje) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO chat (alumno_id, profesor_id, mensaje) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [alumno_id, profesor_id, mensaje], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};