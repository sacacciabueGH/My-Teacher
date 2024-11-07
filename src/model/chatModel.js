import db from '../DB/db.js';

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

export const obtenerMensajes = (req, res) => {
    const { alumno_id, profesor_id } = req.params;

    const query = `
        SELECT * FROM chat 
        WHERE alumno_id = ? AND profesor_id = ?
        ORDER BY iniciado_en ASC
    `;

    db.query(query, [alumno_id, profesor_id], (error, resultados) => {
        if (error) {
            console.error("Error al obtener mensajes:", error);
            return res.status(500).json({ error: 'Error al obtener mensajes' });
        }
        res.status(200).json(resultados);
    });
};

export const obtenerChatsProfesor = (req, res) => {
    const { profesor_id } = req.params;
    const query = `
        SELECT alumno_id, mensaje, iniciado_en
        FROM chat
        WHERE profesor_id = ?
        GROUP BY alumno_id
        ORDER BY iniciado_en DESC
    `;

    db.query(query, [profesor_id], (error, resultados) => {
        if (error) {
            console.error("Error al obtener los chats:", error);
            return res.status(500).json({ error: 'Error al obtener los chats' });
        }
        res.status(200).json(resultados);
    });
};