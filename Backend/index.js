const express = require('express');
const mysql = require('mysql12/promise');
const ProductoModel = require('./models/producto.model');

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306
});

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente 🚀');
});

app.get('/api/productos', async (req, res) => {
  try {
    const [rows] = await pool.query(
     'Select id, nombre, categoria, stock, precio, creado_en FROM productos'
    );
    const productos = rows.map(row => new ProductoModel(row));

    res.json({
      mensaje: 'Productos obtenidos correctamente',
      status: 'OK',
      data: productos,
      total: productos.lenght
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error en la consulta de productos',
      error: error.message
    });
  }
});

app.get('/api/productos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [rows] = await pool.query(
      `
      SELECT 
        id,
        nombre,
        categoria,
        stock,
        precio,
        creado_en
      FROM productos
      WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }
    const producto = new ProductoModel(rows[0]);

    res.json({
      mensaje:'Producto encontrado',
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al consultar producto',
      error: error.message
    });
  }
});

app.post('/api/usuarios', async (req, res) => {

  try {
    const { nombre, categoria, stock, precio } = req.body;
    if (!nombre || !categoria || !stock || !precio) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO productos 
        (nombre, categoriSa, stock, precio, creado_en)
      VALUES 
        (?, ?, ?, ?, NOW())
      `,
      [nombre, categoria, stock, precio]
    );

    const [rows] = await pool.query(
      `
      SELECT 
        id,
        nombre,
        categoria,
        stock,
        precio,
        creado_en
      FROM productos
      WHERE id = ?
      `,
      [result.insertId]
    );
    const productoCreado = new ProductoModel(rows[0]);
    res.status(201).json({
      mensaje: 'Producto creado correctamente',
      data: productoCreado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear producto',
      error: error.message
    });
  }
});

app.put('/api/productos/:id', (req, res) => {
  console.log('Actualizar producto');
});

app.delete('/api/productos/:id', (req, res) =>{
  console.log('Eliminar producto');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
