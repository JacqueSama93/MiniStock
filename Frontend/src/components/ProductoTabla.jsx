export const ProductoTabla = ({ productos, onEdit, onDelete }) => {
  return (
    <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#eee' }}>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.categoria}</td>
            <td>{p.stock}</td>
            <td>{p.formatoPrecio}</td>
            <td>
              <button onClick={() => onEdit(p.id)}>✏️</button>
              <button onClick={() => onDelete(p.id)} style={{ color: 'red' }}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};