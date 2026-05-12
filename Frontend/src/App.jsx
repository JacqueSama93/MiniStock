import { useEffect, useState } from 'react';
import { productoService } from './services/productoService';
import { ProductoForm } from './components/ProductoForm';
import { ProductoTabla } from './components/ProductoTabla';

function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', categoria: '', stock: 0, precio: 0 });
  const [editId, setEditId] = useState(null);

  useEffect(() => { cargarProductos(); }, []);

  const cargarProductos = async () => {
    const data = await productoService.getAll();
    setProductos(data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await productoService.update(editId, form);
      setEditId(null);
    } else {
      await productoService.create(form);
    }
    setForm({ nombre: '', categoria: '', stock: 0, precio: 0 });
    cargarProductos();
  };

  const prepararEdicion = async (id) => {
    const p = await productoService.getById(id);
    setEditId(p.id);
    setForm({ nombre: p.nombre, categoria: p.categoria, stock: p.stock, precio: p.precio });
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar?")) {
      await productoService.delete(id);
      cargarProductos();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>📦 MiniStock System</h1>
      
      {/* Formulario de productos */}
      <ProductoForm 
        form={form} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        isEditing={!!editId}
        onCancel={() => { setEditId(null); setForm({nombre:'', categoria:'', stock:0, precio:0}); }}
      />

      <ProductoTabla 
        productos={productos} 
        onEdit={prepararEdicion} 
        onDelete={eliminar} 
      />
    </div>
  );
}

export default App;