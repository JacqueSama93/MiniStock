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
  const id = Number(req.params.id);

  const producto = productos.find(u => u.id === id);

  if(!producto) {
    return res.status(404).json({
      mensaje:'Producto no encontrado'
    })
  }
  res.json({
    mensaje:'Producto encontrado',
    data: producto
  });
});

app.post('/api/productos', (req, res) => {
  console.log('Crear nuevo producto');
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
