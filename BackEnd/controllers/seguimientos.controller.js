//aca se encuentra el controlador de seguimientos para el crud de seguimientos
//se podra ver, modificar, crear y eliminar seguimientos de una persona en determinado, validando q esta persona en el moemtno 
//de la creacion del seguimeinto poseea una membresia acorde.
//tmb a la hora de visualizarlo, (simplemente ponerlo como comentario a esa validadcion luego con los tokens vceremos.)

import { pool } from "../bd.js";
import { TZDate } from "@date-fns/tz";
import { format} from 'date-fns';

export const obtenerSeguimientosXdni_codEjercicio = async (req, res, next) => {
    try{
        const {dniCliente, codEjercicio} = req.params;
        const [result]= await pool.query("SELECT * from seguimientos_gym where dniCliente = ? and codEjercicio = ?", [dniCliente, codEjercicio]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No hay seguimientos para ese cliente" });
        } else {
            res.json(result);
        }
        
    }catch(error){
       next(error);
    }
}

export const crearSeguimiento = async (req, res, next) => {
    try {
        const {dniCliente, codEjercicio,  repeticiones, peso } = req.body;
        
        const fechaActual = new Date();
        const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
        const fecha = format(fechaZonaHoraria, 'yyyy-MM-dd');
        
        const [result] = await pool.query(`
            INSERT INTO seguimientos_gym (dniCliente, codEjercicio, fechaSeguimiento, repeticiones, peso) 
            VALUES (?, ?, ?, ?,?)`, [dniCliente, codEjercicio, fecha, repeticiones, peso]);
        res.json({ message: "Seguimiento creado" });
    } catch (error) {
        next    (error);
    }
}

export const actualizarSeguimiento = async (req, res, next) => {
    try {
        const {idSeguimiento} = req.params;
        const { repeticiones, peso } = req.body;   //presentar esta actualizacion nen forma de modal
        const [result] = await pool.query(`
            UPDATE seguimientos_gym SET repeticiones = ?, peso = ? WHERE idSeguimiento = ?`, [repeticiones, peso, idSeguimiento]);
        res.json({ message: "Seguimiento actualizado" });
    } catch (error) {
        next(error);
    }
}

export const eliminarSeguimiento = async (req, res, next) => {
    try {
        const {idSeguimiento} = req.params;
        const [result] = await pool.query("DELETE FROM seguimientos_gym WHERE idSeguimiento = ?", [idSeguimiento]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No existe el seguimiento" });
        }else{
            res.json({ message: "Seguimiento eliminado" });
        }
        
    } catch (error) {
        next(error);
    }
}

export const obtenerSeguimiento = async (req, res, next) => {
    try {
        const {idSeguimiento} = req.params;
        const [result] = await pool.query("SELECT * FROM seguimientos_gym WHERE idSeguimiento = ?", [idSeguimiento]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No existe el seguimiento" });
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        next(error);
    }
}