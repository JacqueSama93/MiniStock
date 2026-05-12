const { Producto } = require('../models/producto.model');

const productoController = {
    obtenerTodos: async (req, res) => {
        try {
            const productos = await Producto.getAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const producto = await Producto.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }
            res.json(producto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    },

    crear: async (req, res) => {
        try {
            await Producto.create(req.body);
            res.status(201).json({ mensaje: "Producto creado con éxito" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear" });
        }
    },

    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const existe = await Producto.findById(id);
            if (!existe) return res.status(404).json({ mensaje: "No encontrado" });

            await Producto.update(id, req.body);
            res.json({ mensaje: "Producto actualizado" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar" });
        }
    },

    eliminar: async (req, res) => {
        try {
            const [result] = await Producto.delete(req.params.id);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "No existe" });
            res.json({ mensaje: "Producto eliminado" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar" });
        }
    }
};

module.exports = productoController;
