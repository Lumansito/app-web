//aca es donde queda el registro de los cupos por cada clase que se da,
//tmb hay q hacer el aparta de exportar cupos para determianda hora
//para la carga de las barras de progresion  a la hora de la reserva
// y colocar el metodo para que se confirme la Asistencia a los turnos.

import { pool } from "../bd.js";

import { TZDate } from "@date-fns/tz";
import { format, getDay } from 'date-fns';

const zonaHoraria = 'America/Argentina/Buenos_Aires';

export const crearCupoOtorgado = async (req, res, next) => {
  try {
    const { dniCliente, dniInstructor, horaInicio } = req.body;
    //verifica si hay cupos disponibles PARA TURNO QEU SE QUEIRE RESERVAR
    const [cantidad] = await pool.query(
      `
      SELECT count(*) as cantidad from cupo_otorgado
      where fecha = CURDATE() and horaInicio = ?
      `,
      [horaInicio]
    );
    const hoy = new Date();
    const diaSemana = getDay(hoy);

    const [cantidadMax] = await pool.query(
      `
            SELECT cupo from esquemacupos
            where horario = ?`,
      [horaInicio, diaSemana]
    );
    if (cantidad[0].cantidad >= cantidadMax[0].cupo) {
      return res.status(400).json({ message: "No hay cupos disponibles" });
    }
    //verifica si el cliente ya cumpleto su cuota diaria de reservas
    const [cupoReservado] = await pool.query(
      `
            SELECT count(*) as cantidad from cupo_otorgado
            where fecha = CURDATE() and dniCliente = ? and estado = "asistido"`,
      [dniCliente]
    );
    

    const [cuposMaxCliente] = await pool.query(
      `
      SELECT cuposDia 
      FROM membresias AS membresias
      INNER JOIN usuarios AS clientes ON clientes.codMembresia = membresias.codMembresia
      INNER JOIN pagos AS pagos ON pagos.dniCliente = clientes.dni
      WHERE clientes.dni = ? 
        AND pagos.fecha >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH);

    `,
      [dniCliente]
    );
    if(cuposMaxCliente.length === 0){
      return res.status(400).json({ message: "El cliente no posee membresia Paga" });
    }

    if (cupoReservado[0].cantidad >= cuposMaxCliente[0].cuposDia) {
      return res
        .status(400)
        .json({ message: "Ya cumplio su cuota diaria de reservas" });
    }
    //veriicar si cleinte posee una reseva activa para el dia de la clase
    const [reservaActiva] = await pool.query(
      `
            SELECT count(*) as cantidad from cupo_otorgado
            where fecha = CURDATE() and dniCliente = ? and estado = "reservado"`,
      [dniCliente]
    );
    if (reservaActiva[0].cantidad > 0) {
      return res
        .status(400)
        .json({ message: "Ya tiene una reserva activa para el dia de hoy" });
    }

    
    const fechaActual = new Date();
    const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
    const fechaFormateada = format(fechaZonaHoraria, 'yyyy-MM-dd');
      
    const estado = "reservado";
    
    const [result] = await pool.query(
      `
            INSERT INTO cupo_otorgado (fecha, horaInicio, dniCliente, dniInstructor, estado) 
            VALUES (?, ?, ?,?,?)`,
      [fechaFormateada, horaInicio, dniCliente, dniInstructor, estado]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo otorgar el cupo" });
    } else {
      res.json({ message: "Cupo otorgado" });
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerCantCuposHoy = async (req, res, next) => {
  try {
    const [result] = await pool.query(`
            SELECT horaInicio, count(*) as reservas from cupo_otorgado 
            where fecha = CURDATE() and estado != 'cancelado'
            group by horaInicio`);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay cupos otorgados" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerCuposOcupadosXidEsquema = async (req, res, next) => {
  try {
    const [result] = await pool.query(`
            SELECT COUNT(*) AS reservas 
            FROM cupo_otorgado c
            WHERE c.fecha = CURDATE() 
              AND (c.estado = 'reservado' OR c.estado = 'asistido')
              AND c.horaInicio IN (SELECT e.horario FROM esquemacupos e 
                WHERE e.idEsquema = ${req.params.idEsquema});

            
            `);

    if (result.length === 0) {
      return res.status(404).json({ message: "No hay cupos ocupados" });
    } else {
      res.json(result[0].reservas);
    }
  } catch (error) {
    next(error);
  }
};

export const confirmarAsistencia = async (req, res, next) => {
  try {
    const { dniCliente } = req.params;

    const fechaActual = new Date();
    const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
    const horaAsistencia = format(fechaZonaHoraria, 'HH:mm:ss');

    
    const [response] = await pool.query(
      `
            SELECT * from cupo_otorgado
            where fecha = CURDATE() and dniCliente = ? and estado = "reservado"`,
      [dniCliente]
    );

    if (response.length === 0) {
      return res
        .status(400)
        .json({ message: "No se puede confirmar la Asistencia, no se encontro el cliente" });
    }
    const [hours, minutes, seconds] = response[0].horaInicio; // formato 'HH:mm:ss'
    const horaInicio = new Date(horaAsistencia); // Copiamos la fecha actual
    horaInicio.setHours(hours, minutes, seconds);

    const treintaMinutosAntes = new Date(horaInicio.getTime() - 60 * 60000);
    const treintaMinutosDespues = new Date(horaInicio.getTime() + 60 * 60000);
    
    if (
      horaAsistencia < treintaMinutosAntes || horaAsistencia > treintaMinutosDespues
    ) {
      return res
        .status(400)
        .json({
          message: "No se puede confirmar la Asistencia. Fuera de horario.",
        });
    }

    const [result] = await pool.query(
      `
            UPDATE cupo_otorgado
            SET estado = "asistido" , horaIngreso = ?
            WHERE fecha = CURDATE() and dniCliente = ? and estado = "reservado"`,
      [horaAsistencia, dniCliente]
    );
    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "No se pudo confirmar la Asistencia" });
    } else {
      res.status(200).json({ message: "Asistencia confirmada" });
    }
  } catch (error) {
    next(error);
  }
};

export const cancelarReserva = async (req, res, next) => {
  try {
    const { dniCliente } = req.params;
    
    const fechaActual = new Date();
    const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
    const horaCancelacion = format(fechaZonaHoraria, 'HH:mm:ss');

    const [result] = await pool.query(
      `
            UPDATE  cupo_otorgado
            SET estado = "cancelado" , horaCancelacion = ?
            WHERE fecha = CURDATE() and dniCliente = ? and estado = "reservado"`,
      [horaCancelacion, dniCliente]
    );
    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "No se pudo cancelar la reserva" });
    } else {
      res.status(200).json({ message: "Reserva cancelada" });
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerReservasCliente = async (req, res, next) => {
  try {
    const { dniCliente } = req.params;
    const [result] = await pool.query(
      `
            SELECT * from cupo_otorgado
            where fecha = CURDATE() and dniCliente = ? and estado = "reservado"`,
      [dniCliente]
    );
    if (result.length === 0) {
      return res.status(200).json({ message: "No hay reservas" });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};
