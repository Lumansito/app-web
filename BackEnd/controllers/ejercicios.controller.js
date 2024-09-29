import {pool } from "../bd.js";

export const getEjercicios = async (req, res) => {
try {
        const [result] = await pool.query("SELECT * FROM ejercicios");
        if (result.length === 0) {
        return res.status(404).json({ message: "No hay ejercicios cargados" });
        } else {
        res.json(result);
        }
    } catch (error) {
        console.log(error);
    }
    };

export const getEjercicioBycodEjercicios = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM ejercicios WHERE codEjercicio = ?", [
        req.params.codEjercicio,
        ]);
        if (result.length === 0) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
        } else {
        res.json(result[0]);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    };

export const createEjercicio = async (req, res) => {
    try {
        const { nombre } = req.body;
        //no guardamos la respuesta ya que solamente subimos los datos del nuevo ejercicio
        await pool.query(
        "INSERT INTO ejercicios (nombre, estado) VALUES (?, 'activo')",[nombre]);
        res.json({nombre});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    }

export const updateEjercicio = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE ejercicios SET nombre = ? WHERE codEjercicio = ?", [
        req.body.nombre,
        req.params.codEjercicio,
        ]);
        if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
        }
        res.json({ message: "Ejercicio actualizado" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    }


export const deleteEjercicio = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE ejercicios set estado='eliminado' WHERE codEjercicio = ?", [
        req.params.codEjercicio,
        ]);
        if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
        }
        res.json({ message: "Ejercicio eliminado" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    }

    