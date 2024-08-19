//se encuentra el controlador de pagos para el crud de pagos(ver si es necesario un crud)
//se selecciona la membresia a pagar, para poder actualizar la q tiene el cliente activa.
import { pool } from "../bd.js";

export const getPagos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM pagos");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay pagos cargados" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPagosByDNI = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const createPago = async (req, res) => {
  try {

    /*
  {
    "descripcion": "Pago de membresía",
    "monto": 1000,
    "metodo": "tarjeta",
    "dniCliente": "12345678",
    "codMembresia": "1"  
  }
    
    
    */


    const { descripcion, monto, metodo, dniCliente, codMembresia } = req.body;
    const fecha = new Date().toISOString().split("T")[0];
    // Inicia una transacción
    await pool.query("START TRANSACTION");

    // Verificar si el cliente existe
    const [clienteResult] = await pool.query(
      "SELECT estado FROM Clientes WHERE dniCliente = ?",
      [dniCliente]
    );

    if (clienteResult.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    // Insertar el nuevo pago
    const [result] = await pool.query(
      "INSERT INTO Pagos (dniCliente, fecha, descripcion, monto, metodo) VALUES (?, ?, ?, ?, ?)",
      [dniCliente, fecha, descripcion, monto, metodo]
    );

    // Calcular la nueva fecha de vencimiento (fecha del pago + 30 días)
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 30);

    const nuevoEstado =  "activo" ;

    await pool.query(
      "UPDATE clientes SET estado = ?, codMembresia = ? WHERE dniCliente = ?",
      [nuevoEstado, codMembresia, dniCliente]
    );

    // Confirmar la transacción
    await pool.query("COMMIT");

    res.json({
      fecha,
      descripcion,
      monto,
      metodo,
      dniCliente,
      codMembresia,
      fecha,
      message: "Pago registrado y membresía actualizada correctamente.",
    });
  } catch (error) {
    // Si ocurre un error, revertir la transacción
    await pool.query("ROLLBACK");
    return res.status(500).json({ message: error.message });
  }
};
// Actualizar un pago existente y recalcular el estado del cliente
export const updatePago = async (req, res) => {
  try {
    const {descripcion, monto, metodo, dniCliente, codMembresia } =   req.body;
    const fecha = new Date().toISOString().split("T")[0];
    // Inicia una transacción
    await pool.query("START TRANSACTION");

    // Verificar si el pago existe
    const [pagoExistente] = await pool.query(
      "SELECT * FROM Pagos WHERE dniCliente = ?",
      [dniCliente]
    );

    if (pagoExistente.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    // Actualizar el pago existente
    await pool.query(
      "UPDATE Pagos SET fecha = ?, descripcion = ?, monto = ?, metodo = ?, codMembresia = ? WHERE dniCliente = ?",
      [fecha, descripcion, monto, metodo, codMembresia, dniCliente]
    );

    // Recalcular la nueva fecha de vencimiento (fecha del pago + 30 días)
    const nuevaFechaVencimiento = new Date(fecha);
    nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 30);

    // Actualizar el estado del cliente basado en la nueva fecha de vencimiento
    const nuevoEstado =
      nuevaFechaVencimiento > new Date() ? "activo" : "inactivo";

    await pool.query(
      "UPDATE Clientes SET estado = ?, membresia_activa = ? WHERE dniCliente = ?",
      [nuevoEstado, codMembresia, dniCliente]
    );

    // Confirmar la transacción
    await pool.query("COMMIT");

    res.json({
      message: "Pago y estado del cliente actualizados correctamente.",
      nuevaFechaVencimiento,
      nuevoEstado,
    });
  } catch (error) {
    // Si ocurre un error, revertir la transacción
    await pool.query("ROLLBACK");
    return res.status(500).json({ message: error.message });
  }
};
