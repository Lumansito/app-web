//aca es donde queda el registro de los cupos por cada clase que se da,
//tmb hay q hacer el aparta de exportar cupos para determianda hora 
//para la carga de las barras de progresion  a la hora de la reserva
// y colocar el metodo para que se confirme la asistencia a los turnos.
import e from "express";
import { pool } from "../bd.js";

export const createCupoOtorgado = async (req, res) => {
    try {
        const {dniCliente, dniInstructor, horaInicio} = req.body;
         //verifica si hay cupos disponibles PARA TURNO QEU SE QUEIRE RESERVAR
        const [cantidad] = await pool.query(`
            SELECT count(*) as cantidad from cupo_otorgado
            where fecha = CURDATE() and horaInicio = ?`, [horaInicio]);
        const diaSemana = new Date().getDay();
        const [cantidadMax] = await pool.query(`
            SELECT cupo from esquema_cupos
            where horaInicio = ?`, [horaInicio, diaSemana]);        
        if (cantidad[0].cantidad >= cantidadMax[0].cupo) {
            return res.status(400).json({ message: "No hay cupos disponibles" });
        }
        //verifica si el cliente ya cumpleto su cuota diaria de reservas
        const [cupoReservado] = await pool.query(`
            SELECT count(*) as cantidad from cupo_otorgado
            where fecha = CURDATE() and dniCliente = ? and estado = "asistido"`, [dniCliente]);
        const [cuposMaxCliente] = await pool.query(`
            SELECT cuposDia from membresia mem
            inner join usuarios cli
            on cli.codMembresia = mem.codMembresia
            where dniCliente = ?`, [dniCliente]);
        if (cupoReservado[0].cantidad >= cuposMaxCliente[0].cuposDia) {
            return res.status(400).json({ message: "Ya cumplio su cuota diaria de reservas" });
        }
        //veriicar si cleinte posee una reseva activa para el dia de la clase
        const [reservaActiva] = await pool.query(`
            SELECT count(*) as cantidad from cupo_otorgado
            where fecha = CURDATE() and dniCliente = ? and estado = "reservado"`, [dniCliente]);
        if (reservaActiva[0].cantidad > 0) {
            return res.status(400).json({ message: "Ya tiene una reserva activa para el dia de hoy" });
        }

        
        //Realiza la reserva
        const fechaClase = new Date().toISOString().split('T')[0];
        const estado = "reservado";
        const horaReserva = new Date().toTimeString().split(' ')[0];
        const [result] = await pool.query(`
            INSERT INTO cupo_otorgado (fecha, horaInicio, dniCliente, dniInstructor, estado, horaReserva) 
            VALUES (?, ?, ?,?,?,?)`, [fechaClase, horaInicio, dniCliente, dniInstructor, estado, horaReserva]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo otorgar el cupo" });
        }else{
            res.json({ message: "Cupo otorgado" })
        };
    } catch (error) {
        console.log(error);
    }
}


export const getCantidadCuposHoy = async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT horaInicio, count(*) as reservas from cupo_otorgado 
            where fecha = CURDATE() and estado != "cancelado"
            group by horaInicio`);
        if (result.length === 0) {
            return res.status(404).json({ message: "No hay cupos otorgados" });
        } else {
            res.json(result);
        }
    } catch (error) {
        console.log(error);
    }
}


export const confirmarAsistencia = async (req, res) => {
    try {
        const {dniCliente} = req.body;
        const horaAsistencia = new Date().toTimeString().split(' ')[0];  //SE OBVIA LA DIFERENCIA ENTRE la hora de asistencia y la hora de reserva
        const [result] = await pool.query(`
            UPDATE cupo_otorgado
            SET estado = "asistido" and horaAsistencia = ?
            WHERE fecha = CURDATE() and dniCliente = ?`, [ horaAsistencia, dniCliente]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo confirmar la asistencia" });
        }else{
            res.json({ message: "Asistencia confirmada" })
        };
    } catch (error) {
        console.log(error);
    }
}

export const cancelarReserva = async (req, res) => {
    try {
        const {dniCliente} = req.body;
        const [result] = await pool.query(`
            UPDATE  cupo_otorgado
            SET estado = "cancelado" and horaCancelacion = ?
            WHERE fecha = CURDATE() and dniCliente = ?`, [new Date().toTimeString().split(' ')[0], dniCliente]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo cancelar la reserva" });
        }else{
            res.json({ message: "Reserva cancelada" })
        }
    }catch (error) {
        console.log(error);
    }  
}