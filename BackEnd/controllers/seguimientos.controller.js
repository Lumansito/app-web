//aca se encuentra el controlador de seguimientos para el crud de seguimientos
//se podra ver, modificar, crear y eliminar seguimientos de una persona en determinado, validando q esta persona en el moemtno 
//de la creacion del seguimeinto poseea una membresia acorde.
//tmb a la hora de visualizarlo, (simplemente ponerlo como comentario a esa validadcion luego con los tokens vceremos.)

import { pool } from "../bd.js";


export const obtenerSeguimientosXdni_codEjercicio = async (req, res) => {
    try{
        const {dniCliente, codEjercicio} = req.params;
        const [result]= await pool.query("SELECT * from seguimientos_gym where dniCliente = ? and codEjercicio = ?", [dniCliente, codEjercicio]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No hay seguimientos para ese cliente" });
        } else {
            res.json(result);
        }
        
    }catch(error){
        console.log(error);
    }
}

export const crearSeguimiento = async (req, res) => {
    try {
        const {dniCliente, codEjercicio,  repeticiones, peso } = req.body;
        const fecha = new Date();
        const [result] = await pool.query(`
            INSERT INTO seguimientos_gym (dniCliente, codEjercicio, fechaSeguimiento, repeticiones, peso) 
            VALUES (?, ?, ?, ?,?)`, [dniCliente, codEjercicio, fecha, repeticiones, peso]);
        res.json({ message: "Seguimiento creado" });
    } catch (error) {
        console.log(error);
    }
}

export const actualizarSeguimiento = async (req, res) => {
    try {
        const {idSeguimiento} = req.params;
        const { repeticiones, peso } = req.body;   //presentar esta actualizacion nen forma de modal
        const [result] = await pool.query(`
            UPDATE seguimientos_gym SET repeticiones = ?, peso = ? WHERE idSeguimiento = ?`, [repeticiones, peso, idSeguimiento]);
        res.json({ message: "Seguimiento actualizado" });
    } catch (error) {
        console.log(error);
    }
}

export const eliminarSeguimiento = async (req, res) => {
    try {
        const {idSeguimiento} = req.params;
        const [result] = await pool.query("DELETE FROM seguimientos_gym WHERE idSeguimiento = ?", [idSeguimiento]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el seguimiento" });
        }else{
            res.json({ message: "Seguimiento eliminado" });
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const obtenerSeguimiento = async (req, res) => {
    try {
        const {idSeguimiento} = req.params;
        const [result] = await pool.query("SELECT * FROM seguimientos_gym WHERE idSeguimiento = ?", [idSeguimiento]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el seguimiento" });
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        console.log(error);
    }
}