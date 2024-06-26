import { pool } from "../bd.js";

//CRUD provisorio para ussuarios, deberian tener mas atributos, ejemplo fecha nacimiento, contraseña, etc

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay usuarios cargados" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserByDni = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios WHERE dni = ?", [
      req.params.dni,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { nombre, apellido, dni, tipoUsuario, contraseña, fechaNac, sexo, telefono, mail } = req.body;
  try {
    
    //no guardamos la respuesta ya que solamente subimos los datos del nuevo usuario
    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, dni, tipoUsuario, contraseña, fechaNac, sexo, telefono, mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, dni, tipoUsuario, contraseña, fechaNac, sexo, telefono, mail]
    );
    res.json({
      nombre,
      apellido,
      dni,
      tipoUsuario,
      contraseña,
      fechaNac,
      sexo,
      telefono,
      mail,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if(tipoUsuario==="cliente"){
    try{
      await pool.query("INSERT INTO cliente (dni) VALUES (?)", [dni]);

    }
    catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE usuarios SET / WHERE dni = ?", [
      req.body,
      req.params.dni,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { tipoUsuario } = req.body;
    const [result] = await pool.query("DELETE FROM usuarios WHERE dni = ? and tipoUsuario = ? ", [
      req.params.dni, tipoUsuario
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};