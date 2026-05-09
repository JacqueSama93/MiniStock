class ProductoModel {
  constructor(row) {
    this.id = row.id;
    this.nombre = row.nombre;
    this.categoria = row.categoria;
    this.stock = row.stock;
    this.precio = row.precio;
    this.creado = row.creado_en;
  }
}

module.exports = ProductoModel;
