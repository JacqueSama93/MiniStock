import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/productos";

  useEffect(() => {
    axios.get(API_URL).then(res => setProductos(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Inventario MiniStock</h1>
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Stock</th></tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td><td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;