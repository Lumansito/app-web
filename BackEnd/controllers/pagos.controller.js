//se encuentra el controlador de pagos para el crud de pagos(ver si es necesario un crud)
//se selecciona la membresia a pagar, para poder actualizar la q tiene el cliente activa.
import { pool } from "../bd.js";
import { TZDate } from "@date-fns/tz";
import { format} from 'date-fns';

export const obtenerPagos = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM pagos");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay pagos cargados" });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerPagosXdni = async (req, res, next) => {
  try {
    const { dniCliente } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM pagos WHERE dniCliente = ?",
      [dniCliente]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    next(error);
  }
};

export const crearPago = async (req, res, next) => {
  try {

   
    const { descripcion, monto, metodo, dniCliente, codMembresia } = req.body;

    const fechaActual = new Date();
    const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
    const fechaFormateada = format(fechaZonaHoraria, 'yyyy-MM-dd');


    // Inicia una transacción
    await pool.query("START TRANSACTION");

    // Verificar si el cliente existe
    const [clienteResult] = await pool.query(
      "SELECT estado FROM usuarios WHERE dni = ?",
      [dniCliente]
    );

    if (clienteResult.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    const [result] = await pool.query(
      "INSERT INTO Pagos (dniCliente, fecha, descripcion, monto, metodo) VALUES (?, ?, ?, ?, ?)",
      [dniCliente, fechaFormateada, descripcion, monto, metodo]
    );


    const nuevoEstado =  "activo" ;

    await pool.query(
      "UPDATE usuarios SET estado = ?, codMembresia = ? WHERE dni = ?",
      [nuevoEstado, codMembresia, dniCliente]
    );

    await pool.query("COMMIT");

    res.json({
      descripcion,
      monto,
      metodo,
      dniCliente,
      codMembresia,
      fecha,
      message: "Pago registrado y membresía actualizada correctamente.",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
};

// Actualizar un pago existente y recalcular el estado del cliente
export const actualizarPago = async (req, res, next) => {
  try {
    const {descripcion, monto, metodo, dniCliente, codMembresia } =   req.body;

    const fechaActual = new Date();
    const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
    const fechaFormateada = format(fechaZonaHoraria, 'yyyy-MM-dd');

    await pool.query("START TRANSACTION");

    const [pagoExistente] = await pool.query(
      "SELECT * FROM Pagos WHERE dniCliente = ?",
      [dniCliente]
    );

    if (pagoExistente.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Pago no encontrado." });
    }
    await pool.query(
      "UPDATE Pagos SET fecha = ?, descripcion = ?, monto = ?, metodo = ?, codMembresia = ? WHERE dniCliente = ?",
      [fechaFormateada, descripcion, monto, metodo, codMembresia, dniCliente]
    );

    
    const nuevaFechaVencimiento = new Date(fechaFormateada);
    nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 30);

    
    const nuevoEstado =
      nuevaFechaVencimiento > new Date() ? "activo" : "inactivo";

    await pool.query(
      "UPDATE usuarios SET estado = ?, membresia_activa = ? WHERE dni = ?",
      [nuevoEstado, codMembresia, dniCliente]
    );

    await pool.query("COMMIT");
    res.json({
      message: "Pago y estado del cliente actualizados correctamente.",
      nuevaFechaVencimiento,
      nuevoEstado,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
};
