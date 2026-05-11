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
        const { nombre, categoria, stock, precio } = datos;
        const query = 'INSERT INTO productos (nombre, categoria, stock, precio) VALUES (?, ?, ?, ?)';
        return await pool.query(query, [nombre, categoria, stock, precio]);
    },

    update: async (id, datos) => {
        const { nombre, categoria, stock, precio } = datos;
        const query = 'UPDATE productos SET nombre=?, categoria=?, stock=?, precio=? WHERE id=?';
        return await pool.query(query, [nombre, categoria, stock, precio, id]);
    },

    delete: async (id) => {
        return await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    }
};

class ProductoDTO {
    constructor(obj) {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.categoria = obj.categoria;
        this.stock = obj.stock; 
        this.precio = obj.precio;
        this.formatoPrecio = `$${obj.precio.toFixed(2)}`;
    }
}

module.exports = { Producto, ProductoDTO };
