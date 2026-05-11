const pool = require('../config/db');

const Producto = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT id, nombre, categoria, stock, precio, creado_en FROM productos');
        return rows.map(row => new ProductoDTO(row));
    },

    findById: async (id) => {
        const [rows] = await pool.query('SELECT id, nombre, categoria, stock, precio, creado_en FROM productos WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        return new ProductoDTO(rows[0]);
    },

    create: async (datos) => {
        const { nombre, sku, cantidad, precio } = datos;
        const query = 'INSERT INTO productos (nombre, sku, cantidad, precio) VALUES (?, ?, ?, ?)';
        return await pool.query(query, [nombre, sku, cantidad, precio]);
    },

    update: async (id, datos) => {
        const { nombre, sku, cantidad, precio } = datos;
        const query = 'UPDATE productos SET nombre=?, sku=?, cantidad=?, precio=? WHERE id=?';
        return await pool.query(query, [nombre, sku, cantidad, precio, id]);
    },

    delete: async (id) => {
        return await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    }
};

class ProductoDTO {
    constructor(obj) {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.sku = obj.sku;
        this.stock = obj.cantidad; 
        this.precio = obj.precio;
        this.formatoPrecio = `$${obj.precio.toFixed(2)}`;
    }
}

module.exports = { Producto, ProductoDTO };
